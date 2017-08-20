---
layout: post
title: GSoC &#58; This week in SymPy &#35;10 &amp; &#35;11
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-10-11/
---

Hi there! It's been 11 weeks into [GSoC](https://en.wikipedia.org/wiki/Google_Summer_of_Code) 
and we have reached into the last week before the soft deadline. Here is the Progress so far.

### &nbsp; **Progress of Week 10 & 11** <img style="float: left" src="/assets/gsoc/pr.png"> 

Last couple of weeks, I worked mainly on the Documentation of the solveset module. It's very important to let others know what we are doing and why we are doing, so this [PR #9500](http://github.com/sympy/sympy/pull/9500) is an effort to accomplish that.
Here are some of the important questions, I have tried to answer in the [PR #9500](http://github.com/sympy/sympy/pull/9500)

 * What was the need of a new solvers module?
 * Why do we use sets as an output type?
 * What is this domain argument about?
 * What will you do with the old solve?
 * What are the general design principles behind the development of solveset?
 * What are the general methods employed by solveset to solve an equation?
 * How do we manipulate and return an infinite solutions?
 * How does solveset ensures that it is not returning any wrong solution?

There is still some polishing required in this as suggested by [@hargup](http://github.com/hargup)

#### **Linsolve Docs**
I completed the documentation PR for `linsolve`. See [PR #9587](https://github.com/sympy/sympy/pull/9587)

#### **Differential Calculus Methods**

I have also started working on the differential calculus methods as mentioned in my proposal [here](https://github.com/sympy/sympy/wiki/GSoC-2015-Application-AMiT-Kumar--Solvers-:-Extending-Solveset#week-12).
See [diff-cal](https://github.com/aktech/sympy/tree/diff-cal) branch.

### **from __future__ import plan**  Week #12:
This week I plan to finish up all the pending work and wrap up the project and get [PR #9500](http://github.com/sympy/sympy/pull/9500) Merged. 

### **$ git log**

* [PR #9500](https://github.com/sympy/sympy/pull/9500) :  Documenting `solveset`
* [PR #9587](https://github.com/sympy/sympy/pull/9587) : Add Linsolve Docs

That's all for now, looking forward for week #12. :grinning: