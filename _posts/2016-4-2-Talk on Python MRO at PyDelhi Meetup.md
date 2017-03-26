---
layout: post
title: Talk on Python MRO at PyDelhi Meetup
tags:
  - Core Python
  - PyDelhi
permalink: /blog/talk-python-mro-pydelhi-meetup/
---


<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Demystifying <a href="https://twitter.com/hashtag/Python?src=hash">#Python</a> MRO at <a href="https://twitter.com/PyDelhi">@PyDelhi</a> meetup tomorrow. See you there at Ramanujan College, Delhi.</p>&mdash; AMiT Kumar (@iaktech) <a href="https://twitter.com/iaktech/status/715933679676162049">April 1, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Hi there! Today I gave a talk on Python MRO at [PyDelhi](http://pydelhi.org) [Meetup](http://www.meetup.com/pydelhi/events/226049223/) at [Ramanujan College](http://www.ramanujancollege.ac.in/index.php), Delhi. MRO stands for method resolution order *which defines the "class search path" used by Python to search for the right method to use in classes having multi-inheritance*. Below is an example

```python
class A:
    def whoami(self):
        print("I am A")

class B(A):
    def whoami(self):
        print("I am B")

class C(A):
    def whoami(self):
        print("I am C")

class D(B, C):
    pass
```

```python
d = D()
d.whoami()
```
To get the output of above example Python has a predefined algorithm called as method resolution order, which defines the order in which python would search for the method `whoami` in the classes from which D inherits. To understand more about the working of mro see the [slides](http://slides.com/aktech/python-mro/) of talk.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">. <a href="https://twitter.com/iaktech">@iaktech</a> demystifying python&#39;s MRO <a href="https://twitter.com/PyDelhi">@PyDelhi</a> meetup in Ramanujan college. <a href="https://t.co/VJNuiyPQFv">pic.twitter.com/VJNuiyPQFv</a></p>&mdash; Anuvrat Parashar (@bhanuvrat) <a href="https://twitter.com/bhanuvrat/status/716190054750625792">April 2, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

#### Motivation for the talk
The motivation behind this talk is my failure to answer some simple mro based question in an interview with a bangalore based startup a month ago. I realized that its one of the basic language features which every Python programmer should be aware of & teaching something is probably the best way to learn something, so is delivering a talk! It's well said by Albert Einstein:

> If you can't explain it simply, you don't understand it well enough.

It is always a wonderful experience delivering a talk at PyDelhi Meetup or at any conference, I plan to do more of it in future. I always say this & would say it again, if you like Python or interested in learning then you must attend PyDelhi Meetups. See you on the next meetup ;)

Feel free to reach out to me for any feedbacks or query regarding anything at me [at] iamit [dot] in.
