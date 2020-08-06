---
title: Batch operations with Ecto Multi
date: "2020-08-05T12:00:00.000Z"
description: "A deep dive into batch writing records using Ecto.Multi to gracefully handle rollbacks."
---

With `Ecto.Multi` it's easy for us to write elegant transactional database code. Getting to grips with how to perform more complex operations can be difficult to grok at first though.

One of the most common patterns you may need to perform with Ecto.Multi is operating over many items in a single transaction. Of course in Ecto we have the `insert_all/3` and `update_all/3` functions that are designed for batch inserts and updates respectively, however, both of these do not operate over changesets and are instead designed for more direct operations with the database (they don't even add timestamps, for instance).

This more direct style of access to the database can be problematic in scenarios where you accept batches of data from the outside world upon which we need to perform validations before we insert it. We could of course insert each record one by one and perform our validations via changesets, but then we don't get the benefits of using a transaction to rollback the entire batch of inserts if something fails.

So let's see how we can do this with Ecto.Multi in a fictitious scenario whereby we need to create batches of invites.

```elixir
def create_invites(invite_attrs, user) do
  invite_attrs
  |> Enum.with_index()
  |> Enum.reduce(Ecto.Multi.new(), fn {attrs, idx}, multi ->
    invite_changeset =
      %Invite{creator_id: user.id}
      |> Invite.changeset(attrs)

    Ecto.Multi.insert(multi, {:invite, idx}, invite_changeset)
  end)
  |> Repo.transaction()
end
```

#### Breaking it all down

Lets walk through this to make sure we understand what's happening line-by-line:

First of all, we're using `Enum.with_index()` to append an index to each item in the invites list. We'll use that to keep track of the invite insert in the multi as a unique key.

Next up we pipe into the list into the reduce, creating a Ecto.Multi struct as the default accumulator via the `Ecto.Multi.new()` call as the second argument in the reduce. Here, we want to accumulate the multi result as we then pipe that into the `Repo.transaction/1`. A reduce is really handy here as we collect the series of insert calls to insert in the transaction.

Inside the reduce function we're calling the `Ecto.Multi.insert/3` function just like we would on a regular insert call in Ecto, the only difference here is that we're passing in the multi and the name of the operation. A nifty trick here is that we're using a tuple as the name of the insert in the multi call (`{:invite, idx}`) – names in a multi operation have to be unique, hence why we're using the `idx` as the second element in the tuple to uniquely identify the invite inserts.

Finally the whole batch of insert operations gets sent to the `Repo.transaction/1` function where it's executed. If there are any errors because of changeset validations the entire batch will be rolled back. Pretty sweet.

Going back to our tuple naming from earlier, in the return map from the insert we're going to see that encoded back to us:

```elixir
{:ok,
  %{
    {:invite, 0} => %Invites.Invite{
      __meta__: #Ecto.Schema.Metadata<:loaded, "invites">,
      creator: #Ecto.Association.NotLoaded<association :creator is not loaded>,
      creator_id: 1,
      email: "blah@example.com",
      id: 1,
      inserted_at: ~N[2020-08-06 03:26:12],
      updated_at: ~N[2020-08-06 03:26:12]
    }
  }
}
```

Similarly, for an unsuccessful insert, we'll see the following as the return with the errors:

```elixir
{:error, {:invite, 0},
  %Ecto.Changeset{
    action: :insert,
    changes: %{},
    errors: [email: {"can't be blank", [validation: :required]}],
    data: #Invites.Invite<>,
    valid?: false
  }, %{}}
```

Here for the error we're seeing the return value `{:error, multi_name, error, map}` where the error is the first error that occurred in the multi call. You can read more about the errors returned in the transaction in the [Ecto docs](https://hexdocs.pm/ecto/Ecto.Repo.html#c:transaction/2).

That's about it for batching for this Ecto.Multi lesson. If you have any questions you can get me on [Twitter](https://twitter.com/cjbell_). Until next time.
