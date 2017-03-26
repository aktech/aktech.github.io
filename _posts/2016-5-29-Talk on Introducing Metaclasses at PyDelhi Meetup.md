---
layout: post
title: Talk on Introducing Metaclasses at PyDelhi Meetup
tags:
  - Core Python
  - PyDelhi
permalink: /blog/talk-python-metaclasses-pydelhi-meetup/
---


Hey! I gave a talk on Python Metaclasses yesterday at [PyDelhi](http://pydelhi.org) [Meetup](http://www.meetup.com/pydelhi/events/226342855/) at Lyxel labs, Gurgaon .

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Interested in learning Metaclasses? Come to <a href="https://twitter.com/hashtag/PyDelhi?src=hash">#PyDelhi</a> meetup tomorrow to watch <a href="https://twitter.com/iaktech">@iaktech</a> introducing metaclasses at <a href="https://twitter.com/hashtag/LyxelLabs?src=hash">#LyxelLabs</a>, Gurgaon.</p>&mdash; PyDelhi (@PyDelhi) <a href="https://twitter.com/PyDelhi/status/736067744039198721">May 27, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In order to develop an intuition to understand metaclasses in python, Let's see it in this way: "***Everything is an object in Python***", So is a class! and every object is created by a class, of course:

```python
>>> class Foo(): pass
>>> foo_object = Foo()
```

The class which creates the `foo_object` is:

```python
>>> type(foo)
__main__.Foo
```
That's what we expected, `Foo`!

Now, as I said earlier, every class is also an object, So is `Foo`, now lets see which class creates the class `Foo` itself:

```python
>>> type(Foo)
type
```

The `type`! Yes, the `type` class creates the `Foo` class and that's what called as a Metaclass. Metaclasses are the secret sauce which creates classes! `type` is the default metaclass in Python. To dive more into Metaclasses, have a look at the presentation slides of
my talk.

<iframe src="//slides.com/aktech/introducing-metaclasses-in-python/embed" width="700" height="600" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

</br>

**Tip** : Interested in tasting bit more of Python? Come to PyDelhi [Meetups](http://www.meetup.com/pydelhi/)!
or if you would like to taste lot of python, then you should come to [PyCon India 2016](https://in.pycon.org/2016/), its a premier conference in India on using and developing the Python programming language & is conducted annually by the Python developer community. It attracts the best Python programmers from across the country and abroad.

If you missed my talk or attended and liked it, then you should definitely have a look at my [proposal](https://in.pycon.org/cfp/2016/proposals/introducing-metaclasses~dw0Je/) for this talk at PyCon India 2016 or you can submit your own proposal [here](https://in.pycon.org/cfp/2016/proposals/), the call for proposals is open ;)

Here is a picture of an another talk by Peeyush Aggarwal [(@dhuadaar)](https://twitter.com/dhuadaar) on NLP.

<img align="center" src="/assets/dhuadaar.jpg" width="500">

 See you in the next meetup :)
