---
title: Checking for the existence of keys in a map in Elixir
date: "2020-08-11T12:00:00.000Z"
description: "A look into how we ramp our engineers on Elixir at Made by Many."
---

Today with a client we had an interesting question come up from one of the engineers: Given a map that may have string or atom based keys, how can we pattern match against the existence of the key in a function head?

Lets try out a usual way of doing this to check for the existence of a `:foo` and `"foo"` key:

```elixir
def thing(%{foo: _}), do: :ok
def thing(%{"foo" => _}), do: :ok
def thing(_), do: :error
```

Not bad, but can we do better? Well our first inclination might be to use a `guard`:

```elixir
def thing(%{field => _}) when field in [:foo, "foo"], do: :ok
```

However, this won't work and you'll end up with an error:

```
(CompileError) cannot use variable field as map key inside a pattern. Map keys in patterns can
only be literals (such as atoms, strings, tuples, and the like) or an existing variable matched
with the pin operator (such as ^some_var)
```

Enter the `is_map_key/2` guard, which was introduced in Elixir `1.10.0` via a feature in OTP 21. [You can read the docs here](https://hexdocs.pm/elixir/Kernel.html#is_map_key/2).

```elixir
def thing(map) when is_map_key(map, :foo) or is_map_key(map, "foo"), do: :ok
```

Very nice! It's probably worth mentioning here though that a better solution might be to normalize our keys in the map
to always be strings or something elsewhere so that we _don't_ actually ever have to do this, but still a nice lesson.
