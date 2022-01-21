# Assignment
Learn and practice the C Sharp propramming language.
## Requirements
There are ten files in the Data folder. Each file includes 499999 lines, each line includes ten strings and which is split with ';', each string includes ten letters. Find out the 10 most frequent strings from all ten data files and show them on the console. 

The data format is shown in the figure below.
![directory](/DataFormat.png) 

You can find these files from 
![directory](/Data.png) 

1.Check out develop branch to your branch

2.Create a class library project for the solution

3.Refer the contract project to your class library project and Implement the interface IDataAnalyser

4.IDataAnalyser description 

![directory](/Interface.png) 

5.Register your implement to CSharpBasic project and run a project to get the test results. 

![directory](/Example.png) 

6.Merge your code to develop branch finally.

## Tips:

1.Strings should ignore Case, it means that when you meet 'AbCdD', 'ABCDD' and 'abcdd'， the count number should be 3

2.GetHashCode() will generate a hash code for you, it should be helpful for you.

3.CSharpBasic project's target framework is .NET Core 3.1

4.We have created an example as your reference.

