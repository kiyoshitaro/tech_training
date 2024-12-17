#
# @lc app=leetcode id=5 lang=python3
#
# [5] Longest Palindromic Substring
#
# https://leetcode.com/problems/longest-palindromic-substring/description/
#
# algorithms
# Medium (34.68%)
# Likes:    29933
# Dislikes: 1840
# Total Accepted:    3.5M
# Total Submissions: 9.9M
# Testcase Example:  '"babad"'
#
# Given a string s, return the longest palindromic substring in s.
# 
# 
# Example 1:
# 
# 
# Input: s = "babad"
# Output: "bab"
# Explanation: "aba" is also a valid answer.
# 
# 
# Example 2:
# 
# 
# Input: s = "cbbd"
# Output: "bb"
# 
# 
# 
# Constraints:
# 
# 
# 1 <= s.length <= 1000
# s consist of only digits and English letters.
# 
# 
#

# @lc code=start
class Solution:
    def longestPalindrome(self, s: str) -> str:
        memo = [[-1] * len(s) for _ in range(len(s))]
        def checkPalindrome(i, j):
            if i >= j:
                return True
            if memo[i][j] != -1:
                return memo[i][j]
            memo[i][j] = s[i] == s[j] and checkPalindrome(i+1, j-1)
            return memo[i][j]
            
        maxLen = 0
        stInx = 0
        for i in range(len(s)):
            for j in range(i, len(s)):
                if checkPalindrome(i, j):
                    if(maxLen < j-i+1):
                        maxLen = j-i+1
                        stInx = i
        return s[stInx:stInx+maxLen]
# @lc code=end

