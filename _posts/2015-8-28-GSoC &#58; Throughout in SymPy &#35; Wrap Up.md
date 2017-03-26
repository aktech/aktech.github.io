---
layout: post
title: GSoC &#58; Throughout in SymPy &#35; Wrap Up
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-wrap-up/
---

Hi! I am Amit Kumar ([**@aktech**](http://www.github.com/aktech)), a final year undergraduate student of Mathematics & Computing at Delhi Technological University. This post summarizes my experience working on GSoC Project on Improving Solvers in SymPy.

## Introduction

I first stumbled upon SymPy last year, while looking for some Open Source Computer Algebra Systems to contribute. I didn't had any Open Source experience by then, So SymPy was an Ideal Choice for getting into the beautiful world of Open Source. I wasn't even Proficient in Python so at first it was little difficult for me, but Thanks! to the beauty of the language itself, which makes anyone comfortable with it in no time. Soon, I decided to participate into Google Summer of Code under SymPy. Though at this point of time, I didn't had decided about the project, I would like to work in Summers. 

##### First Contribution
I started learning the codebase & made my first contribution by Fixing an EasyToFix bug in `solvers.py` through the PR [#8647](https://github.com/sympy/sympy/pull/8647), Thanks to [@smichr]() for helping me making my first ever open source contribution. After my first PR, I started looking for more things to work and improve upon and I started commiting quite often. During this period I learnt the basics of Git, which is one of the most important tools for contributing to Open Source.

## Project Ideas
When I got a bit comfortable with the basics of SymPy & contributing to open source in general, I decided to chose an area (module) to concentrate on. The modules I was interested in, were Solvers and Integrals, I was literally amazed by the capability of a CAS to integrate and solve equations. I decided to work on one of these in the summers. There was already some work done on the Integrals module in 2013, which was yet to be Merged. I wasn't well versed about the Manuel Bronsteins works on Methods of Integration in a Computer Algebra System, so I was little skeptical about working on Integrals. The Solvers module attracted me due it's awesome capabilities, I found it one of the most useful features of any Computer Algebra Systems, So I finally decided to work on Solvers Module.

## Coding
I was finally accepted to work on Solvers this summer. I had my exams during the community bonding period, So I started almost in the first week of Coding Period. I made a detailed timeline of my work in summers, but through my experience I can say that's seldom useful. Since, you never know what may come out in between you and your schedule. As an instance PR [#9540](https://github.com/sympy/sympy/pull/9540), was a stumbling block in lot of my work, which was necessary to fix for proceeding ahead.

#### Phase I (Before Mid Terms)
When coding period commenced, I started implementing the `linsolve`, the linear system solver which is tolerant to different input forms & can solve almost all forms of linear systems. At the start I got lot of reviews from Jason and Harsh, regarding improvement of the function. One of the most important thing I learnt which they focused on was Test Driven Development, they suggested me to write extensive tests before implementing the logic, which helps in reducing the problems in visualizing the final implementaion of the function and avoids API changes.

After `linsolve` I implemented `ComplexPlane`, which is basically Complex Sets. It is useful for representing infinite solutions in argand plane. While implementing this I learnt that chosing the right API is one of the most important factors while designing aa important functionality. To know more about it, see my blog post [here](http://iamit.in/blog/GSoC-week-3/). During this period I also worked on fixing Intersection's of FiniteSet with symbolic elements, which was a stumbling block.

#### Phase II (After Mid Terms)

After successfully passing the Mid Terms, I started working more on robustness of `solveset`, Thanks to @hargup for pointing out the motivation for this work. The idea is to tell the user about the domain of solution returned. Simplest motivation was the solution of the equation `|x| - n`, for more info see my blog post [here](http://iamit.in/blog/GSoC-week-7/). I also worked on various trivial and non trivial bugs which were more or less blocking my work. 

Then I started replacing `solve` with `solveset` in the codebase, the idea was to make a smooth transition between `solve` and `solveset`, while doing this Jason pointed out that I should not remove `solve` tests, which can make `solve` vunerable to break, So I reverted removing of solve tests. Later we decided to add `domain` argument to `solveset`, which would help the user in easily dictating to solveset about what solutions they are interested in, thanks to @shivamvats for doing this in a PR.
After the decision of adding `domain` argument, Harsh figured out that, as of now `solveset` is vunerable to API changes, so it's not the right time to replace solve with solveset, so we decided to halt this work, as a result I closed my several PR's unmerged. 

I also worked on Implementing Differential Calculus Method such as `is_increasing` etc, which is also Merged now. Meanwhile I have been working on documenting `solveset`, because a lot of people don't know what we are doing & why we are doing, so It's very important to answer all those subtle questions which may come up in there mind, So we decided to create a FAQ style documentation of `solveset` see PR [#9500](https://github.com/sympy/sympy/pull/9500). This is almost done, some polishing is needed. It would be Merged soon.

During this period apart from my work, there are some other works as well which is worth mentioning, one of them is `ConditionSet` by Harsh which serves the purpose of unevaluated solve object and even much more than that for our future endeavours with `solveset`. Others being `codomain` & `not_empty` by Gaurav [@gxyd](http://github.com/gxyd) which are also important additions to SymPy.

## Advice
TODO: Probably, this will need a comprehensive post, I would write soon.

## Future Plans
Recently Harsh came up with an idea of tree based solver. Since now `ConditionSet` has been introduced, the solving of equations can be seen as set transformation, We can do the following things to solve equations (abstract View):

* Apply Various Set Transformations on the given Set.
* Define a Metric of the usability or define a notion of better solution over others.
* Different Transformation would be the nodes of the tree.
* Suitable searching techniques could be applied to get the best solution.

For more info see mailing list thread [here](https://groups.google.com/forum/#!topic/sympy/-SIbX0AFL3Q).

As a part of this I worked on implementing a general decomposition function `decompogen` in PR [#9831](https://github.com/sympy/sympy/pull/9831), It's almost done, will be merged soon.

I plan for a long term association with SymPy, I take the full responsibilty of my code. I will try to contribute as much as I can particularly in sets and solvers module.

## Conclusion

On a concluding note, I must say that getting the opportunity to work on SymPy this summer has been one of the best things that could happen to me. Thanks to Harsh for helping me all my endeavour, also for being one of the best mentors I could get. I would like to thank Sean as well who from his busy schedule took up the time to attend meetings, hangouts and for doing code reviews. Also thanks to Chris Smith who is the most gentle and helpful person I have ever seen, he is one of the reasons I started contributing to SymPy.
Thanks to Aaron, Ondrej, and last but not the least my fellow GSoCer's at SymPy [leosartaj](http://github.com/leosartaj), [debugger22](http://github.com/debugger22), [sumith1896](http://github.com/sumith1896), [shivamvats](http://github.com/shivamvats), [abinashmeher999](https://github.com/abinashmeher999). Special Thanks to whole SymPy team and Community for a wonderful collaboration experience. Kudos!