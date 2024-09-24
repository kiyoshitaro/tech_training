#
# @lc app=leetcode id=150 lang=python3
#
# [150] Evaluate Reverse Polish Notation
#

# @lc code=start
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        def calculate(num1, num2, op):
            if op == '+':
                return num1 + num2
            elif op == '-':
                return num2 - num1
            elif op == '*':
                return num1 * num2
            elif op == '/':
                return int(num2 / num1)
        ops = '+-*/'
        stack = []
        for token in tokens:
            if(token not in ops):
                stack.append(int(token))
            else:
                num1 = stack.pop()
                num2 = stack.pop()
                stack.append(calculate(num1, num2, token))
        return stack[0]
        
# @lc code=end

