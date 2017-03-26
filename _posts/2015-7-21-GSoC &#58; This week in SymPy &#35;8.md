---
layout: post
title: GSoC &#58; This week in SymPy &#35;8
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-8/
---

Hi there! It's been eight weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code)
. Here is the Progress for this week.

### &nbsp; **Progress of Week 8** <img style="float: left" src="/assets/gsoc/pr.png"> 
</br>
This week, my PR for making `invert_real` more robust was Merged, along with these:

* [PR #9628](https://github.com/sympy/sympy/pull/9628) : Make `invert_real` more robust

* [PR #9668](https://github.com/sympy/sympy/pull/9668) : Support solving for Dummy symbols in `linsolve`

* [PR #9666](https://github.com/sympy/sympy/pull/9666) : Equate `S.Complexes` with `ComplexPlane(S.Reals*S.Reals)`

**Note**: We renamed `S.Complex` to `S.Complexes`, which is analogous with `S.Reals` as suggested by [@jksuom](https://github.com/jksuom).

I also opened [PR #9671](https://github.com/sympy/sympy/pull/9671) for Simplifying ComplexPlane output when ProductSet of FiniteSets are given as input: `ComplexPlane(FiniteSet(x)*FiniteSet(y))`, It was earlier simplified to:

```python
ComplexPlane(Lambda((x, y), x + I*y), {x} x {y})
```
It isn't very useful to represent a point or discrete set of points in `ComplexPlane` with an expression like above. So in the above PR it is now simplified as `FiniteSet` of discrete points in `ComplexPlane`:

```python
In [3]: ComplexPlane(FiniteSet(a, b, c)*FiniteSet(x, y, z))
Out[3]: {a + I*x, a + I*y, a + I*z, b + I*x, b + I*y, b + I*z, c + I*x, c + I*y, c + I*z}
```
It's awaiting Merge, as of now.

Now, I have started replacing `solve` with `solveset` and `linsolve`.


### **from __future__ import plan**  Week #9:
This week I plan to Merge my pending PR's & work on replacing old `solve` in the code base with `solveset`.

### **$ git log**

<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9710](https://github.com/sympy/sympy/pull/9710) : Replace solve with solveset in `sympy.stats`

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9708](https://github.com/sympy/sympy/pull/9708) : Use solveset instead of solve in `sympy.geometry`

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9671](https://github.com/sympy/sympy/pull/9671) : Simplify `ComplexPlane({x}*{y})` to `FiniteSet(x + I*y)`

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9668](https://github.com/sympy/sympy/pull/9668) : Support solving for Dummy symbols in linsolve

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9666](https://github.com/sympy/sympy/pull/9666) : Equate S.Complexes with `ComplexPlane(S.Reals*S.Reals)`


<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9628](https://github.com/sympy/sympy/pull/9628) : Make invert_real more robust

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9587](https://github.com/sympy/sympy/pull/9587) : Add Linsolve Docs

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9500](https://github.com/sympy/sympy/pull/9500) :  Documenting `solveset`

</br>
That's all for now, looking forward for week #9. :grinning: