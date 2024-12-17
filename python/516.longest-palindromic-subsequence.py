#
# @lc app=leetcode id=516 lang=python3
#
# [516] Longest Palindromic Subsequence
#
# https://leetcode.com/problems/longest-palindromic-subsequence/description/
#
# algorithms
# Medium (63.29%)
# Likes:    9706
# Dislikes: 332
# Total Accepted:    554K
# Total Submissions: 874.8K
# Testcase Example:  '"bbbab"'
#
# Given a string s, find the longest palindromic subsequence's length in s.
# 
# A subsequence is a sequence that can be derived from another sequence by
# deleting some or no elements without changing the order of the remaining
# elements.
# 
# 
# Example 1:
# 
# 
# Input: s = "bbbab"
# Output: 4
# Explanation: One possible longest palindromic subsequence is "bbbb".
# 
# 
# Example 2:
# 
# 
# Input: s = "cbbd"
# Output: 2
# Explanation: One possible longest palindromic subsequence is "bb".
# 
# 
# 
# Constraints:
# 
# 
# 1 <= s.length <= 1000
# s consists only of lowercase English letters.
# 
# 
#

# @lc code=start
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        memo = [[-1] * len(s) for _ in range(len(s))]
        # WRONG: all the inner lists are references to the same list. 
        # memo = [[-1] * len(s)]* len(s)
        def dp(i, j):
            if i == j:
                return 1
            if i > j:
                return 0
            if memo[i][j] == -1:
                if s[i] == s[j]:
                    memo[i][j] = dp(i+1, j-1) + 2
                else:
                    memo[i][j] = max( dp(i, j-1), dp(i+1, j))
            return memo[i][j]
        return dp(0, len(s)-1)
        
# @lc code=end

