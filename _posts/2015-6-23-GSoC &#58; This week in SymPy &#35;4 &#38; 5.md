---
layout: post
title: GSoC &#58; This week in SymPy &#35;4 &amp; &#35;5
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-4-5/
---

Hi there! It's been five weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code), 
This week, I worked on polishing my previous PR's to improve coverage and
fixing some bugs.

### &nbsp; **Progress of Week 4 & 5** <img style="float: left" src="/assets/gsoc/pr.png"> 


During the last couple of weeks my `ComplexPlane` Class [PR #9438](https://github.com/sympy/sympy/pull/9463)
finally got ***Merged*** thanks to [Harsh](http://github.com/hargup) for thoroughly reviewing it and suggesting constructive changes.

For this I Managed to improve it's coverage to perfect 100%, which is indeed satisfying, as it depicts all the new code being pushed is completely tested.

This week I also improved the Exception handling and coverage in my `linsolve` [PR](https://github.com/sympy/sympy/pull/), It also have a 100% coverage.

### Coverage Report

*  [1] `gauss_jordan_solve` **100 %** 
*  [2] `linsolve` : **100: %**

#### Ref:

* [1] [http://iamit.in/sympy/coverage-report/matrices/](http://iamit.in/sympy/coverage-report/matrices/)
* [2] [http://iamit.in/sympy/coverage-report/solveset/](http://iamit.in/sympy/coverage-report/solveset/)

It's good to be Merged now.

### **Blocking Issue**: Intersection's of FiniteSet with symbolic elements

During Week 5, While working on transcendental equation solver in `solveset.py`, I discovered a blocking issue in `FiniteSets`, which is with the Intersection of `FiniteSet` containing symbolic elements, for example:

 ```python
In [2] a = Symbol('a', real=True)

In [3]: FiniteSet(log(a)).intersect(S.Reals)
Out[3]: EmptySet()
```

Currently, either `FiniteSet` is able to evaluate intersection otherwise it, returns an `EmptySet()`.
(See [9536](https://github.com/sympy/sympy/issues/9536) & [8217](https://github.com/sympy/sympy/issues/8217)).

To fix this, I have opened the PR [#9540](https://github.com/sympy/sympy/pull/9540).
Currently It fixes both the issues ([9536](https://github.com/sympy/sympy/issues/9536) & [8217](https://github.com/sympy/sympy/issues/8217)), but there are some failing tests using the current behaviour of `FiniteSet`.

####For example:

```python
In [16]: x, y, z = symbols('x y z', integer=True)

In [19]: f1 = FiniteSet(x, y)

In [20]: f2 = FiniteSet(x, z)
```

* In Master:

```python
In [23]: f1.intersect(f2)
Out[23]: {x}
```

* It should rather be:

```python
In [5]: f1.intersect(f2)
Out[5]: {x} U Intersection({y}, {x, z})
```

The current behavior of FiniteSet in Master is non-acceptable, since in the above example `x, y, z` are integer symbols, so they can be any integer, but in the *Master* , they are assumed to be distinct, which is wrong.
There are such failing tests in `test_wester.py` [here](https://github.com/sympy/sympy/blob/master/sympy/core/tests/test_wester.py#L74), which is updated here: [aktech@e8e6a0b](https://github.com/aktech/sympy/commit/e8e6a0bb9285c315e9bade2bcd10b954760d4965) to incorporate with the right behaviour.

As of now there are a couple of failing tests, which needs to passed, before we can **Merge** [#9540](https://github.com/sympy/sympy/pull/9540)

####TODO Failing Tests:

* [sympy/stats/tests/test_rv.py](https://travis-ci.org/sympy/sympy/jobs/67831123)
* [sympy/combinatorics/tests/test_partitions.py](https://travis-ci.org/sympy/sympy/jobs/67831130)


### **from __future__ import plan**  Week #6:
This week I plan to [Fix Intersection's of FiniteSet with symbolic elements](https://github.com/sympy/sympy/pull/9540) & start working on `LambertW` solver in `solveset`.


### **$ git log**

<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9540](https://github.com/sympy/sympy/pull/9540) : Intersection's of FiniteSet with symbolic elements

* [PR #9438](https://github.com/sympy/sympy/pull/9438) : Linsolve
* [PR #9463](https://github.com/sympy/sympy/pull/9463) : ComplexPlane
* [PR #9527](https://github.com/sympy/sympy/pull/9527) : Printing of ProductSets
* [PR # 9524](https://github.com/sympy/sympy/pull/9524) : Fix solveset returned solution making denom zero


That's all for now, looking forward for week #6. :grinning: