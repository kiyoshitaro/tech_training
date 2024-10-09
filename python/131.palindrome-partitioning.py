#
# @lc app=leetcode id=131 lang=python3
#
# [131] Palindrome Partitioning
#
# https://leetcode.com/problems/palindrome-partitioning/description/
#
# algorithms
# Medium (70.38%)
# Likes:    13054
# Dislikes: 510
# Total Accepted:    975.3K
# Total Submissions: 1.4M
# Testcase Example:  '"aab"'
#
# Given a string s, partition s such that every substring of the partition is a
# palindrome. Return all possible palindrome partitioning of s.
# 
# 
# Example 1:
# Input: s = "aab"
# Output: [["a","a","b"],["aa","b"]]
# Example 2:
# Input: s = "a"
# Output: [["a"]]
# 
# 
# Constraints:
# 
# 
# 1 <= s.length <= 16
# s contains only lowercase English letters.
# 
# 
#

# @lc code=start
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        def isPalindrome(s):
            l = 0
            r = len(s)-1
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True
        res = []
        subset = []
        def backtrack(i):
            if i >= len(s): 
                res.append(subset[::])
                return
            for j in range(i, len(s)):
                if isPalindrome(s[i:j+1]):
                    subset.append(s[i:j+1])
                    backtrack(j+1)
                    subset.pop()
        backtrack(0)
        return res
# @lc code=end

