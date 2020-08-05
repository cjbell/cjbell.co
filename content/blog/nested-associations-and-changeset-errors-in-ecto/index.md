---
title: Nested Associations & Changeset Errors in Ecto
date: "2016-02-15T12:00:00.000Z"
description: "How to deal with nested changeset set data and associations using Ecto, the database library for Elixir."
---

<em>This article originally appeared on [medium.com](https://medium.com/@cjbell_/nested-associations-changeset-errors-in-ecto-f0ce6a4fec70)</em>

Recently we’ve been experimenting with building more and more Elixir applications at [Made by Many](https://madebymany.com), including building JSON APIs in Phoenix.

Often we’ll need to deal with saving and validating nested models in our applications and return any resulting nested errors back. This is a common pattern when you have associated models, like say an Address that belongs to a User and there are validations on both the User and Address.

Fortunately Ecto makes dealing with saving nested association a breeze, and as a bonus for all those Rails developers out there we no longer have to deal with accepts_nested_attributes_for!

Given a model of a User that `has_one` Address, to require the address be present in our changeset we add the `cast_assoc/3` function like follows:

```elixir
defmodule UserAddress.User do
  use UserAddress.Web, :model

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    has_one :address, UserAddress.Address

    timestamps
  end

  @required_fields ~w(first_name last_name email)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> cast_assoc(:address, required: true)
  end
end
```

And our Address model looks like the following (note the required fields used for validation):

```elixir
defmodule UserAddress.Address do
  use UserAddress.Web, :model

  schema "addresses" do
    field :address1, :string
    field :address2, :string
    field :city, :string
    field :country, :string
    belongs_to :user, UserAddress.User

    timestamps
  end

  @required_fields ~w(address1 city country)
  @optional_fields ~w(address2)

  @doc """
  Creates a changeset based on the `model` and `params`.
  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
```

Now we can create and update an Address for a User by adding an address key to our params when saving, like in the following test:

```elixir
defmodule UserAddress.UserTest do
  use UserAddress.ModelCase

  alias UserAddress.User

  @valid_attrs %{
    email: "some content",
    first_name: "some content",
    last_name: "some content"
  }

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    params = Map.put(@valid_attrs, :address, %{
      address1: "123 Main St",
      city: "New York",
      country: "USA"
    })

    changeset = User.changeset(%User{}, params)
    assert changeset.valid?
  end
end
```

But what if we omit some of the required fields on the Address model? Well in that case our changeset should be invalid. Lets add another test for that:

```elixir
defmodule UserAddress.UserTest do
  use UserAddress.ModelCase

  # Omitted for brevity

  test "changeset with invalid address" do
    params = Map.put(@valid_attrs, :address, %{
      address1: "123 Main St",
      city: "New York"
    })

    changeset = User.changeset(%User{}, params)
    refute changeset.valid?
  end
end
```

OK but now what about if want to get those errors from the address out and display them? With Ecto.Changeset we can usually use the errors key in the struct to display a list of errors but in the case of a nested association, this won’t work. But why?

When we’re dealing with nested associations Ecto actually nests changesets within each other, storing them against the association name. Calling the errors key on the struct is only going to give us the errors on the primary changeset, or in our case the User and not traverse the nested changeset for the Address.

We can see this if we inspect the changeset in our test (I omitted some of the output for clarity):

```elixir
%Ecto.Changeset{
  action: nil,
  changes: %{
    address: %Ecto.Changeset{
      action: :insert,
      changes: %{address1: "123 Main St", city: "New York"},
      constraints:[],
      errors: [country: "can’t be blank"],
      filters: %{},
      model: %UserAddress.Address{}
    }
  }
}
```

Fortunately the designers of Ecto introduced a handy method [traverse_errors/2](http://hexdocs.pm/ecto/Ecto.Changeset.html#traverse_errors/2) in Ecto 1.1 that looks like it’ll do exactly what we need.

> Traverses changeset errors and applies function to error messages.
>
> This function is particularly useful when associations and embeds are cast in the changeset as it will traverse all associations and embeds and place all errors in a series of nested maps.

Lets use this function to return associated error messages back from our changeset. In this example we’re going to be using it in a Phoenix.View so we can send the errors back to our consumers of a JSON API but it can easily be used somewhere else in your codebase.

```elixir
defmodule UserAddress.ErrorView do
  use UserAddress.Web, :view

  def render("422.json", %{changeset: changeset}) do
    Ecto.Changeset.traverse_errors(changeset, fn
      {msg, opts} -> String.replace(msg, "%{count}", to_string(opts[:count]))
      msg -> msg
    end)
  end
end
```

We’re taking the example verbatim from the Ecto.Changeset documentation here for this function, which handles replacing counts for us. (We could quite easily be running this through some I18n translation code or any other transform you may need).

As the docs tell us, given a changeset and a transform function `traverse_errors/2` will return a map with a key of the error and a list of strings with the error messages. It’ll also traverse associated changesets and add these as keys in the map.

Ok so now lets add a test to verify the expected output:

```elixir
defmodule UserAddress.ErrorViewTest do
  use UserAddress.ConnCase, async: true
  alias UserAddress.User
  alias UserAddress.ErrorView

  test "returns changeset errors" do
    params = %{
      first_name: "Chris",
      address: %{
        address1: "123 Main St"
      }
    }

    changeset = User.changeset(%User{}, params)
    result = ErrorView.render("422.json", changeset: changeset)

    assert result == %{
      email: ["can't be blank"],
      last_name: ["can't be blank"],
      address: %{
        city: ["can't be blank"],
        country: ["can't be blank"]
      }
    }
  end
end
```

_Note: In the test above we used the User changeset to make things a bit simpler, but really we should be testing with a generic changeset so there is less implied knowledge in the test._

And we’re done! We can now save an associated model and display any associated errors back to the user.
