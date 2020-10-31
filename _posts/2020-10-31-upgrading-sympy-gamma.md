---
layout: post
title: Porting SymPy Gamma to Google App Engine Python 3
tags:
  - SymPy
  - Open Source
permalink: /blog/sympy-gamma-gae-python3/
---

This summer I had plenty of time during COVID-19 lockdown and I was looking at
[SymPy Gamma](https://sympygamma.com/).

<center><img src="/assets/sympy-gamma-port/sympy_gamma_demo.gif" width="700"></center> 

## Sympy Gamma
 
SymPy Gamma is a web application that executes mathematical expressions
via natural language input from the user, after parsing them as SymPy
expressions it displays the result with additional related computations.
It is inspired from the idea of [WolframAlpha](http://www.wolframalpha.com/) which is based on the
commercial Computer Algebra System named ["Mathematica"](https://en.wikipedia.org/wiki/Mathematica).

<center><img src="/assets/wolfram-alpha-logo.svg" width="300"></center>

I have always been impressed by it ever since I first found about it.
While playing with it during this summer, I realised that it runs on Google
App Engine's Python 2.7 runtime. It is powered by SymPy, an open source
computer algebra system.

<center><img align="center" src="/assets/Sympy_logo.svg" width="150"></center>

## The Problem

Despite being widely used around the world (about ~14K users everyday,
as seen from Google Analytics), there hasn’t been a lot of development
in the past 5 years. Due to this the current infrastructure
was stuck on [Google App Engine](https://en.wikipedia.org/wiki/Google_App_Engine)’s Python 2 runtime which obviously does
not support Python 3.

This also prevented it to use the latest version of SymPy. The SymPy
version (~0.7.6) it was using was last updated 6 years ago. This made
SymPy Gamma urgent need to upgradation. At the time of writing this blog,
SymPy Gamma is running on Google App Engine's latest runtime and latest
version of SymPy.

## Solution and Process 

It was a fun project and was interesting to see how Google cloud offering has evolved
from Google App Engine to Google Cloud Platform. The old App engine did
seem like a minimal cloud offering launched by Google in an attempt to
ship something early and quickly. It reminded me of my first cloud project
in college ([dturmscrap](https://github.com/aktech/dturmscrap)), which I
deployed to Google App Engine, back in 2015.

I used Github projects to track the whole project, all the work done for this
can be seen [here](https://github.com/sympy/sympy_gamma/projects/1).

## $ Git Log

Here is a summary of what was achieved:

* [PR 135](https://github.com/sympy/sympy_gamma/pull/135): Migrating Django to a slightly higher version,
this was the first blood just to make sure everything was working. I upgraded it to the latest version of
Django that was supported on Python 2 runtime. This also exposed the broken CI, which was fixed in this.

* [PR 137](https://github.com/sympy/sympy_gamma/pull/137): This upgraded the CI infrastructure to use Google Cloud SDK
for deployment, the previous method was discontinued.

* [PR 140](https://github.com/sympy/sympy_gamma/pull/140): Upgrading the Database backend to use Cloud NDB instead
of the legacy App Engine NDB. 

* [PR 148](https://github.com/sympy/sympy_gamma/pull/148): Since we change the database backend, we needed something for
testing locally, this was done by using Google Cloud Datastore emulator locally.

* [PR 149](https://github.com/sympy/sympy_gamma/pull/149): The installation and setup of the project was quite a challenge.
Installing and keeping track of the versions of a number of application was non-trivial. This Pull request dockerized
the project and made the development setup trivial and it all boiled down to just one command. 

* [PR 152](https://github.com/sympy/sympy_gamma/pull/152): The login feature was previously implemented using the user API
of the Google App Engine's Python2 runtime, which was not available in Python 3 runtime. We removed the login feature as it
was not used by many and was too much effort to setup OAuth for login.

* [PR 153](https://github.com/sympy/sympy_gamma/pull/153): Now was the time to slowly move towards Python 3 by making the
code compatible with both 2 and 3. It was achieved via [python-modernize](https://python-modernize.readthedocs.io/en/latest/).

* [PR 154](https://github.com/sympy/sympy_gamma/pull/154): We then made the migration to Python 3.7 runtime and removed submodules
and introduced a `requirements.txt` for installing dependencies. 

* [PR 159](https://github.com/sympy/sympy_gamma/pull/154): The above change made it possible to upgrade SymPy to latest version,
which was 1.6 at that time. 

* [PR 165](https://github.com/sympy/sympy_gamma/pull/154): The last piece of the puzzle was upgrading Django itself, so we upgraded
it to the latest version, which was Django 3.0.8.

#### Next Steps

- At the time of writing this Google has released the Python 3.8 runtime, it would nice to further upgrade it now.
- The test coverage can be increased.
- The code can be refactored to be more readable and approachable for new contributors.


Thanks to Google for properly [documenting the process](https://cloud.google.com/appengine/docs/standard/python/migrate-to-python3),
which made the transition much easier.

Thanks to [NumFocus](https://numfocus.org/), without them this project would not have been possible. Also thanks to
[Ondrej Certik](https://github.com/certik) and [Aaron Meurer](http://github.com/asmeurer) for their advice and support
throughout the project.
