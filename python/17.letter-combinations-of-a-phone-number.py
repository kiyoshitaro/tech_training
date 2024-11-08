#
# @lc app=leetcode id=17 lang=python3
#
# [17] Letter Combinations of a Phone Number
#
# https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
#
# algorithms
# Medium (62.13%)
# Likes:    18999
# Dislikes: 1020
# Total Accepted:    2.3M
# Total Submissions: 3.6M
# Testcase Example:  '"23"'
#
# Given a string containing digits from 2-9 inclusive, return all possible
# letter combinations that the number could represent. Return the answer in any
# order.
# 
# A mapping of digits to letters (just like on the telephone buttons) is given
# below. Note that 1 does not map to any letters.
# 
# 
# Example 1:
# 
# 
# Input: digits = "23"
# Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
# 
# 
# Example 2:
# 
# 
# Input: digits = ""
# Output: []
# 
# 
# Example 3:
# 
# 
# Input: digits = "2"
# Output: ["a","b","c"]
# 
# 
# 
# Constraints:
# 
# 
# 0 <= digits.length <= 4
# digits[i] is a digit in the range ['2', '9'].
# 
# 
#

# @lc code=start
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if digits == "":
            return []
        hMap = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
        res = []
        
        # 1.
        # temp = []
        # def backtrack(i):
        #     if len(temp) == len(digits):
        #         res.append("".join(temp))
        #         return
        #     for j in hMap[digits[i]]:
        #         temp.append(j)
        #         backtrack(i+1)
        #         temp.pop()
        # backtrack(0)
        # return res
        
        # 2.
        def backtrack(comb, nextDigits):
            if len(nextDigits) == 0:
                res.append(comb)
                return
            for c in hMap[nextDigits[0]]:
                backtrack(comb+c, nextDigits[1:])
        backtrack("", digits)
        return res

# @lc code=end

