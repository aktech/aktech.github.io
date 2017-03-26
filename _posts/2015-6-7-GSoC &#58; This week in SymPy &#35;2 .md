---
layout: post
title: GSoC &#58; This week in SymPy &#35;2
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-2
---

Hi there! It's been two weeks into GSoC, & I have managed to flip some bits.

This week, I started working on `ComplexPlane` Class, & also worked on improving `linsolve`.

### **Progress of Week 2** 
<img src="/assets/gsoc/pr.png"> 

The major portion of this week went into improving `linsolve` function, which I wrote last week, 
PR : **[#9438](https://github.com/sympy/sympy/pull/9438)**.

[Jason](http://www.github.com/moorepants) suggested to let the Matrix code be the core source for all linear solve operations (i.e. remove all algorithmic solve code from everywhere else in sympy). Then for any linear solve stuff that can't be handled by the Matrix code base, implement that here in `linsolve`.

It was indeed a good idea, since solving linear system is more of Matrix stuff than that of solvers in CAS, So we introduced a new solver in `matrices.py` named as:

* `gauss_jordan_solve()` : It solves `Ax = b` using Gauss Jordan elimination.

There may be zero, one, or infinite solutions.  If one solution
exists, it will be returned. If infinite solutions exist, it will
be returned parametrically in terms of Dummy parameters. If no solutions exist, It will throw
ValueError.

Now `linsolve` is a light wrapper around `gauss_jordan_solve()` method, it basically converts all the input types into the standard A & b form & calls A.gauss_jordan_solve() and replaces the dummy parameters with the symbols input by the user.

### Plan for Week 3:
This week I plan to complete ComplexPlane class & get the following PR's Merged:

* [PR #9438](https://github.com/sympy/sympy/pull/9438)
* [PR #9463](https://github.com/sympy/sympy/pull/9463)

That's all for now, looking forward for week #3.