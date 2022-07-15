#
# @lc app=leetcode id=20 lang=python3
#
# [20] Valid Parentheses
#
# https://leetcode.com/problems/valid-parentheses/description/
#
# algorithms
# Easy (40.85%)
# Likes:    14190
# Dislikes: 661
# Total Accepted:    2.4M
# Total Submissions: 5.9M
# Testcase Example:  '"()"'
#
# Given a string s containing just the characters '(', ')', '{', '}', '[' and
# ']', determine if the input string is valid.
#
# An input string is valid if:
#
#
# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
#
#
#
# Example 1:
#
#
# Input: s = "()"
# Output: true
#
#
# Example 2:
#
#
# Input: s = "()[]{}"
# Output: true
#
#
# Example 3:
#
#
# Input: s = "(]"
# Output: false
#
#
#
# Constraints:
#
#
# 1 <= s.length <= 10^4
# s consists of parentheses only '()[]{}'.
#
#
#

# @lc code=start
from typing import List


class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        for char in s:
            if char == "(" or char == "[" or char == "{":
                stack.append(char)
            else:
                if len(stack) == 0:
                    return False
                if (
                    (char == ")" and stack[-1] == "(")
                    or (char == "]" and stack[-1] == "[")
                    or (char == "}" and stack[-1] == "{")
                ):
                    stack.pop()
                    continue
                if (
                    (char == ")" and stack[-1] != "(")
                    or (char == "]" and stack[-1] != "[")
                    or (char == "}" and stack[-1] != "{")
                ):
                    return False
        if len(stack) == 0:
            return True
        else:
            return False


# @lc code=end
