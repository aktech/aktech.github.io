---
layout: post
title: GSoC &#58; This week in SymPy &#35;1
tags:
  - Open Source
  - GSoC
  - SymPy
permalink: /blog/GSoC-week-1
---

Hi there! The First week of the coding period has came to an end, this week has been very hectic for me due to my practicals and Minor project submission at college, though I mananged to reach the goal for this week.

This week, I worked on Linear system solver `linsolve` in the `solveset` Module, as I mentioned in my last [post](http://blog.iamit.in/GSoC-Getting-Up-For-the-Coding-Period/), about my goals for Week 1. 

### **Progress of Week 1** 
<img src="/assets/gsoc/pr.png"> I implemented the following two functions: </br>
PR : **[#9438](https://github.com/sympy/sympy/pull/9438)**.
It's almost good to merge after a final review by [flacjacket](http://www.github.com/flacjacket) & [hargup](http://www.github.com/hargup).

* **`linear_eq_to_matrix`** : *method to convert system of linear Equations to Matrix Form.*

* **`linsolve`**: *It's the General Linear System solver.*

Thanks to [Jason](http://www.github.com/moorepants) for reviewing my initial implementation & suggesting useful changes.

### Algorithm Used
The algorithm used in `linsolve` is Gauss-Jordan elimination, which results, after elimination, in an reduced row echelon form matrix. (used `rref()` method of matrices)

### Capabilities of Linsolve
`linsolve` is a powerful linear system solver, It can solve all types of linear systems, accepted in all input forms, hence providing a user friendly Public API. 

* ***under-determined***:

```python
In []: A = Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

In []: b = Matrix([3, 6, 9])

In []: linsolve((A, b), [x, y, z])
Out[]:{(z - 1, -2*z + 2, z)}
```

* ***well-behaved***: 

```python
In []: Eqns = [3*x + 2*y - z - 1, 2*x - 2*y + 4*z + 2, - x + S(1)/2*y - z]

In []: linsolve(Eqns, x, y, z)
Out[]:{(1, -2, -2)}
```

* ***over-determined***:

```python
# Parametrized solution
In []: A = Matrix([[1, 5, 3], [2, 10, 6], [3, 15, 9], [1, 4, 3]])

In []: b = Matrix([0, 0, 0, 1])

In []: linsolve((A, b), [x, y, z])
Out[]:{(-3*z + 5, -1, z)}

# No solution
In []: A = Matrix([[1, 5, 3], [2, 1, 6], [1, 7, 9], [1, 4, 3]])

In []: b = Matrix([0, 0, 0, 1])

In []: linsolve((A, b), [x, y, z])
Out[]: ....
ValueError: Linear system has no solution
```
### The input formats supported:</br>
(as mentioned in my last [post](http://blog.iamit.in/GSoC-Getting-Up-For-the-Coding-Period/))

* Augmented Matrix Form
* List Of Equations Form
* Input A & b Matrix Form (from `Ax = b`)

### Plan for Week 2:
This week I plan to work on Complex Sets.

That's all for now, looking forward for week #2.