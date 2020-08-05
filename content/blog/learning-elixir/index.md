---
title: Learning Elixir at Made by Many
date: "2016-09-19T12:00:00.000Z"
description: "A look into how we ramp our engineers on Elixir at Made by Many."
---

_Originally published on [Medium.com](https://medium.com/the-many/learning-elixir-at-made-by-many-557737dafe55)_

After giving [a talk at ElixirConf this year](https://speakerdeck.com/cjbell88/selling-food-with-elixir-elixirconf-2016) in Orlando on building our first large Elixir project for [Cava Grill](https://cavagrill.com), a question that I’ve frequently been asked is “how did you and your team learn Elixir and OTP”.

Learning Elixir, like learning any new language, is not something that happens overnight but takes time, dedication and patience. From our experience at Made by Many, we’ve been able to train our engineers who are proficient in Ruby and Javascript with some ease into Elixir, but broadly speaking we’ve found that there are three distinct curves of learning in that process:

1. Language semantics and thinking in a functional programming style.
2. Phoenix and Ecto (if web is your thing)
3. OTP and thinking in Processes.

### Language Semantics & Thinking in Functional Programming

[Programming Elixir, Dave Thomas (Pragmatic Programmers)](https://pragprog.com/book/elixir/programming-elixir)<br />
Don’t just read this book, do the exercises. They are insanely well thought out and take you through many aspects of the language. Honestly, I never finished this entire thing but got through to the OTP chapter before breaking off and doing my own experiments in that area.

[Exercism.io Exercises](http://exercism.io/languages/elixir)<br />
This is a must do in my mind. A nice mix of problems, some of which will take you a while to get through and finish. I really enjoyed the run-length encoding exercise.

[Cameron Price’s talk on Micropatterns from EMPEX NYC, 2016](https://www.youtube.com/watch?v=9uvp4h7gXHg)<br />
A fantastic talk on patterns to reach for when you start learning Elixir and writing programs in anger. Lots of good tips and entertaining talk from my good friend, Cameron.

### Phoenix & Ecto

[Programming Phoenix: Chris McCord, Jose Valim and Bruce Tate (Pragmatic Programmers)](https://pragprog.com/book/phoenix/programming-phoenix)<br />
The reference bible. We’ve used it sporadically to figure out the right way to build our Phoenix applications but as a whole it’s a good thorough look at Phoenix and Ecto.

[Writing a Blog Engine in Phoenix, Brandon Richie](https://medium.com/@diamondgfx/introduction-fe138ac6079d)<br />
Another good, detailed look at building a Phoenix application from scratch.

[A Deep Dive into Ecto, Lew Parker](http://www.glydergun.com/diving-into-ecto/)<br />
Dense and detailed. Some of it might be slightly behind now we’re on Ecto 2.

[Working with Ecto Associations and Embeds, Jose Valim](http://blog.plataformatec.com.br/2015/08/working-with-ecto-associations-and-embeds/)
I reached for this so often when I was getting familiar with nested associations and how they work with Changesets in Ecto.

### OTP and Thinking in Processes

Oh boy, this is a biggie. OTP on it’s own isn’t a huge library to learn, but the thought process of how to model software using processes is seemingly quite a leap. It’s definitely a big paradigm shift that you need to grok (albeit maybe not immediately) to get the most from Elixir and, ultimately, the BEAM.

[Mix and OTP Guide, Elixir Lang](http://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html)<br />
This is just a really nice set of exercises to go through that teach you some of the building blocks. Do the full thing, you might not come out with a concrete understanding of it all but that’s OK.

[The Zen Of Erlang, Fred T-H](http://ferd.ca/the-zen-of-erlang.html)<br />
Yes, its long but no other post gives such a good overview to Erlang (and ultimately to how to model your system in Elixir therefore too). I can’t tell you the number of times I reference this post and it’s diagrams. Read it and then bookmark it to read it again.

[Intro to OTP, Jesse J Anderson](https://www.youtube.com/watch?v=CJT8wPnmjTM&feature=youtu.be)<br />
I ran across this recently and it’s a really nice look at how OTP works. Building a GenServer from scratch is a great way to understand how they work.

[The Most Basic Erlang Service -> Worker Pattern](http://zxq9.com/archives/1311)<br />
Another concrete Erlang example post of a common Supervisor to worker pattern here. Nothing ground breaking but a nice reference for how to start architecting your software in the Erlang way.

[Designing for Scalability with Erlang/OTP, Francesco Cesarini, Steve Vinoski (O’Reilly Media)](http://shop.oreilly.com/product/0636920024149.do)<br />
Packed full of good design patterns and tips. I’ve only just started really digging through it but have been recommended it time and time again.

### Building a Game Using OTP

One of our engineers, [Elijah Kim](https://medium.com/@elikim), decided that as a good learning exercise he’d build a game and model the game state in processes (you can find it [here on Github](https://github.com/elijahkim/reactor)). Honestly I cannot think of a better way to get to grips with thinking in Processes and Eli had great success using this a a vehicle for learning.

The type of game doesn’t really matter; there are a few other good examples online to get you started if you can’t think of something yourself:

1. [Building Battleship in Phoenix](http://codeloveandboards.com/blog/2016/04/29/building-phoenix-battleship-pt-1/)
2. [Playing Poker with Elixir](http://blog.tokafish.com/playing-poker-with-elixir-part-1/)
3. [Tic-Tac-Toe in Elixir](https://github.com/Gazler/oxo)

What’s great about using this to learn OTP is it has the nice side effect of being able to be easily extended to add features like persistence via Ecto, real-time communication via web sockets (Phoenix Channels) and even (if you want to take it this far) distribution and sharding.
