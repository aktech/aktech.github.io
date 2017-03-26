---
layout: post
title: Google Summer Of Code with SymPy
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/Google-Summer-Of-Code-with-SymPy/
---

![GSoC 2015](/assets/gsoc/GSOC2015.png)


Yay! the much awaited results of [Google Summer Of Code](http://www.google-melange.com/gsoc/projects/list/google/gsoc2015) is out now, and I have been selected to work with [SymPy](http://www.sympy.org/) under [Python Software Foundation.](https://www.python.org/psf/)

### For those who don't know about GSoC

> **[Google Summer of Code](http://en.wikipedia.org/wiki/Google_Summer_of_Code)** is a global program that offers students stipends to write code for open source projects.

### A bit about SymPy

<img style="float: right" src="/assets/gsoc/sympy.png">

> SymPy is a Python library for symbolic mathematics. It aims to become a full-featured **[Computer Algebra System](http://en.wikipedia.org/wiki/Computer_algebra_system)** (CAS) while keeping the code as simple as possible in order to be comprehensible and easily extensible.

### About My Project

 My Project is being mentored by some really awesome guys [Ondřej Čertík](https://github.com/certik), [Sean Vig](https://github.com/flacjacket) and [Harsh Gupta](https://github.com/hargup).

 The Project aims at improving the current Equation solvers in SymPy. The Current solve is a huge mess, It needs to be broken into various sub-hints, to make the code more robust, modular, and approachable for developers, moving in lines of the new API, as developed in solveset. Currently the new API is implemented for univariate Equations only, we need to incorporate it for linear systems, multivariate equations & transcendental by rewriting the solvers for these in the new solveset Module.

 [Here is my Proposal](https://github.com/sympy/sympy/wiki/GSoC-2015-Application-AMiT-Kumar--Solvers-:-Extending-Solveset).

 Looking forward for a great summer with SymPy!