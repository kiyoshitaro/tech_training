## Define
Builder is a creational design pattern that lets you **construct complex objects** step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

## Problem 
Initialization code is usually buried inside a monstrous constructor with lots of parameters.

![](imgs/problem.png)

## Solution

The Builder pattern suggests that you extract the object construction code out of its own class  and move it to separate objects called builders. **(SPLIT BUILDER OUT OF PRODUCT)**
![](imgs/solution.png)
![](imgs/solution1.png)

Having a director class in your program isn’t strictly necessary. You can always call the building steps in a specific order directly from the client code. However, the director class might be a good place to put various construction routines so you can reuse them across your program.

## Structure
![](imgs/structure.png)
