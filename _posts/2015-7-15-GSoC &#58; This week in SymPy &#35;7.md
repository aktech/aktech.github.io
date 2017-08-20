---
layout: post
title: GSoC &#58; This week in SymPy &#35;7
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-7/
---

Hi there! It's been seven weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code)
and second half has started now. Here is the Progress so far.

### &nbsp; **Progress of Week 7** <img style="float: left" src="/assets/gsoc/pr.png"> 


This week I Opened [#9628](https://github.com/sympy/sympy/pull/9628), which is basically an attempt to make `solveset` more robust, as I mentioned in my [last post](http://iamit.in/blog/GSoC-week-6/).
The idea is to tell the user about the domain of solution returned.


Now, It makes sure that n is positive, in the following example:

```python

In [3]: x = Symbol('x', real=True)

In [4]: n = Symbol('n', real=True)

In [7]: solveset(Abs(x) - n, x)
Out[7]: Intersection([0, oo), {n}) U Intersection((-oo, 0], {-n})

```

Otherwise it will return an `EmptySet()`

```python
In [6]: solveset(Abs(x) - n, x).subs(n, -1)
Out[6]: EmptySet()
```

Earlier:

```python
In [12]: solveset(Abs(x) - n, x)
Out[12]: {-n, n}
```

So, for this to happen, we needed to make changes in the `invert_real`:

```python
if isinstance(f, Abs):
  g_ys = g_ys - FiniteSet(*[g_y for g_y in g_ys if g_y.is_negative])
  return _invert_real(f.args[0],
    Union(g_ys, imageset(Lambda(n, -n), g_ys)), symbol)
    Union(imageset(Lambda(n, n), g_ys).intersect(Interval(0, oo)),
          imageset(Lambda(n, -n), g_ys).intersect(Interval(-oo, 0))),
          symbol)
```
So, we applied set operations on the invert to make it return non-EmptySet only when there is a solution.

### Now For more Complex Cases:

For the following case:

```python
In [14]: invert_real(2**x, 2 - a, x)
Out[14]: (x, {log(-a + 2)/log(2)})
```
For the invert to be real, we must state that `a` belongs to the Interval `(-oo, 2]` otherwise it would be complex, but no set operation on `{log(-a + 2)/log(2)}` can make the interval of `a` to be in `(-oo, 2]`.

Although, it does returns an `EmptySet()` on substituting absurd values:

```python
In [23]: solveset(2**x + a - 2, x).subs(a, 3)
Out[23]: EmptySet()
```

So, we need not make any changes to the `Pow` handling in `invert_real` & It's almost done now, except for a couple of TODO's:

 * Document new changes
 * Add More tests

Though, I will wait for final thumbs up from [@hargup](http://www.github.com/hargup), regarding this.

### **from __future__ import plan**  Week #7:
This week I plan to complete [PR #9628](https://github.com/sympy/sympy/pull/9618) & get it Merged & start working on replacing old `solve` in the code base with `solveset`.


### **$ git log**

Below is the list of other PR's I worked on:

* [PR #9671](https://github.com/sympy/sympy/pull/9671) : Simplify `ComplexPlane({x}*{y})` to `FiniteSet(x + I*y)`
* [PR #9668](https://github.com/sympy/sympy/pull/9668) : Support solving for Dummy symbols in linsolve
* [PR #9666](https://github.com/sympy/sympy/pull/9666) : Equate S.Complexes with `ComplexPlane(S.Reals*S.Reals)`
* [PR #9628](https://github.com/sympy/sympy/pull/9628) : [WIP] Make invert_real more robust
* [PR #9587](https://github.com/sympy/sympy/pull/9587) : Add Linsolve Docs
* [PR #9500](https://github.com/sympy/sympy/pull/9500) :  Documenting `solveset`

That's all for now, looking forward for week #8. :grinning: