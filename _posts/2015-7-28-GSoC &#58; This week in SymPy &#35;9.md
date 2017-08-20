---
layout: post
title: GSoC &#58; This week in SymPy &#35;9
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-9/
---

Hi there! It's been nine weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code)
. Here is the Progress for this week.

### &nbsp; **Progress of Week 9** <img style="float: left" src="/assets/gsoc/pr.png"> 

This week I worked on Replacing `solve` with `solveset` or `linsolve` in the codebase:
Here are the modules, I covered, as of now:

* [diffgeom](https://github.com/sympy/sympy/pull/9740)
* [calculus](https://github.com/sympy/sympy/pull/9718)
* [core](https://github.com/sympy/sympy/pull/9724)
* [functions](https://github.com/sympy/sympy/pull/9743)
* [galgebra](https://github.com/sympy/sympy/pull/9744)
* [geometry](https://github.com/sympy/sympy/pull/9708)
* [ntheory](https://github.com/sympy/sympy/pull/9745)
* [simplify](https://github.com/sympy/sympy/pull/9738)
* [series](https://github.com/sympy/sympy/pull/9717)
* [sets](https://github.com/sympy/sympy/pull/9716)
* [stats](https://github.com/sympy/sympy/pull/9710)


[@moorepants](github.com/moorepants) pointed out that I should not change old `solve`tests, since people may break an untested code, this argument is valid, so I have added equivalent tests for `solveset`, where it is competent with `solve`.

There are some untested code in codebase as well, where `solve` is used, for those cases replacing has not been done, as the tests would pass anyway, since those lines are not tested. So I have added a TODO for those instances, to replace with `solveset`, when those lines are tested.

#### Other Work

I also changed the output of `linsolve` when no solution are returned, earlier it throwed `ValueError` & now it returns an `EmptySet()`, which is consistent with rest of the `solveset`. See [PR #9726](https://github.com/sympy/sympy/pull/9726)

### **from __future__ import plan**  Week #10:
This week I plan to Merge my pending PR's on replacing old `solve` in the code base with `solveset`, and work on Documentation & `lambertw` solver.

### **$ git log**

* [PR #9726](https://github.com/sympy/sympy/pull/9726) : Return EmptySet() if there are no solution to linear system
* [PR #9724](https://github.com/sympy/sympy/pull/9724) : Replace solve with solveset in core
* [PR #9717](https://github.com/sympy/sympy/pull/9717) : Replace solve with solveset in sympy.calculus
* [PR #9716](https://github.com/sympy/sympy/pull/9716) : Use solveset instead of solve in sympy.sets
* [PR #9717](https://github.com/sympy/sympy/pull/9717) : Replace solve with solveset in `sympy.series`
* [PR #9710](https://github.com/sympy/sympy/pull/9710) : Replace solve with solveset in `sympy.stats`
* [PR #9708](https://github.com/sympy/sympy/pull/9708) : Use solveset instead of solve in `sympy.geometry`
* [PR #9587](https://github.com/sympy/sympy/pull/9587) : Add Linsolve Docs
* [PR #9500](https://github.com/sympy/sympy/pull/9500) :  Documenting `solveset`

That's all for now, looking forward for week #10. :grinning: