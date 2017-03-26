---
layout: post
title: GSoC &#58; Getting Up For the Coding Period
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-Getting-Up-For-the-Coding-Period/
---

### **The Start of Coding Period!**
The Community bonding Period is close to end now & my Exams as well. Tomorrow starts the Coding Period & I have been waiting for it for some time now. 

Recently I gave a quick look to my Proposed Timeline in my [Proposal](https://github.com/sympy/sympy/wiki/GSoC-2015-Application-AMiT-Kumar--Solvers-:-Extending-Solveset#timeline), &  decided to swap the 2nd Week's work with Ist, this will help me securing few credits in my College's Minor Project Submission (Which has the deadline of 30th May).

### **Plan for Week 1**
This week, I am planning to work on Solving Linear systems in `solveset`. (Currently solveset support univariate solvers only).

The main functions, I would be implementing are:


* `eq_to_matrix` :
*method to convert system of Equations to Matrix Form.*

* `linsolve`: *It's the General Linear System solver.*

As mentioned in the proposal, Solving system of linear equations is an important feature of solvers in a CAS. Most of the CAS have a convenient single function to solve linear systems, for example `LinearSolve` in Mathematica.

The **`linsolve`** which I would be implementing is inspired from Matlab & Maxima.

##### **Features Overview**
We have a lot of reusable code in `sympy.matrices`  & `sympy.solvers.solvers`, which would be quite useful.
One of the most important thing I would like to have in `linsolve` is supporting a lot of input formats.
Though, most of the CAS suport only one input format. This feature would be quite useful for sympy's `linsolve`.

###### The three most common input formats, I can recall as of now are:

* Augmented Matrix Form
* List Of Equations Form
* Input A & b Matrix Form (from `Ax = b`)

It would be great to have all three input formats supported in the Public API `linsolve` Method.

Looking forward for Coding Period, that's all for now.