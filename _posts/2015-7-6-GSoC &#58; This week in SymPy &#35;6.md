---
layout: post
title: GSoC &#58; This week in SymPy &#35;6
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-6
---

Hi there! It's been six weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code),
and it marks the half of GSoC. The Mid term evaluations have been done now, Google has been preety quick doing this, I recieved the passing mail within 15 minutes after the deadline to fill up evaluations, so basically GSoC Admin did the following, (I guess):

```sql
SELECT * FROM GSoCStudents
WHERE EvaluationResult='PASS';
```
```sql
and SendThemMail
```
(Don't Judge my SQL, I am not good at it!)

### &nbsp; **Progress of Week 6** <img style="float: left" src="/assets/gsoc/pr.png"> 
</br>
Last week my `Linsolve` [PR #9438](https://github.com/sympy/sympy/pull/9438)
finally got Merged Thanks! to [@hargup](http://github.com/hargup) [@moorepants](http://github.com/moorepants) [@flacjacket](http://github.com/flacjacket) [@debugger22](http://github.com/debugger22) for reviewing it and suggesting constructive changes.

This week I worked on Intersection's of `FiniteSet` with symbolic elements, which was a blocking issue for lot of things, I managed to Fix the failing test which I mentioned in my last post. Eventually this PR got Merged as well, which has opened doors for lot of improvements.

Thanks to [@jksuom](https://github.com/jksuom) & [@hargup](https://github.com/hargup) for iterating over this PR, and making some very useful comments for improving it to make it Mergeable.

I had a couple of hangout meeting with [@hargup](https://github.com/hargup) this week, (though now he has left for SciPy for a couple of weeks), we discussed about the further plan, for making `solveset` more robust, such as like returning the domain of invert while calling the `invert_real` , See [#9617](https://github.com/sympy/sympy/issues/9617).

Motivation for this:

```python
In [8]: x = Symbol('x', real=True)

In [9]: n = Symbol('n', real=True)

In [12]: solveset(Abs(x) - n, x)
Out[12]: {-n, n}
```

The solution returned above is not actually complete, unless, somehow we state `n` should be positive for the output set to be non-Empty. See [#9588](https://github.com/sympy/sympy/issues/9588)

### **from __future__ import plan**  Week #7:
This week I plan to work on making `invert_real` more robust.

Relavant Issue:

* [#9617](https://github.com/sympy/sympy/issues/9617)
* [#9588](https://github.com/sympy/sympy/issues/9588)


### **$ git log**

<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9618](https://github.com/sympy/sympy/pull/9618) : Add test for `solveset(x**2 + a, x)` issue 9557

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9587](https://github.com/sympy/sympy/pull/9587) : Add Linsolve Docs

</br>
<img align="left" src="/assets/gsoc/opr.png"> &nbsp; [PR #9500](https://github.com/sympy/sympy/pull/9500) :  Documenting `solveset`

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9612](https://github.com/sympy/sympy/pull/9612) : solveset return solution for `solveset(True, ..)`

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9540](https://github.com/sympy/sympy/pull/9540) : Intersection's of FiniteSet with symbolic elements

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9438](https://github.com/sympy/sympy/pull/9438) : Linsolve

</br>
<img align="left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9463](https://github.com/sympy/sympy/pull/9463) : ComplexPlane 

</br>
<img style="float: left" src="/assets/gsoc/mpr.png"> &nbsp; [PR #9527](https://github.com/sympy/sympy/pull/9527) : Printing of ProductSets  </br> 

</br>
<img style="float: left" src="/assets/gsoc/mpr.png"> &nbsp; [PR # 9524](https://github.com/sympy/sympy/pull/9524) : Fix solveset returned solution making denom zero 

</br>
That's all for now, looking forward for week #7. :grinning: