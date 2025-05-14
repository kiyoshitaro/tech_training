#
# @lc app=leetcode id=1143 lang=python3
#
# [1143] Longest Common Subsequence
#
# https://leetcode.com/problems/longest-common-subsequence/description/
#
# algorithms
# Medium (57.79%)
# Likes:    14235
# Dislikes: 218
# Total Accepted:    1.4M
# Total Submissions: 2.5M
# Testcase Example:  '"abcde"\n"ace"'
#
# Given two strings text1 and text2, return the length of their longest common
# subsequence. If there is no common subsequence, return 0.
# 
# A subsequence of a string is a new string generated from the original string
# with some characters (can be none) deleted without changing the relative
# order of the remaining characters.
# 
# 
# For example, "ace" is a subsequence of "abcde".
# 
# 
# A common subsequence of two strings is a subsequence that is common to both
# strings.
# 
# 
# Example 1:
# 
# 
# Input: text1 = "abcde", text2 = "ace" 
# Output: 3  
# Explanation: The longest common subsequence is "ace" and its length is 3.
# 
# 
# Example 2:
# 
# 
# Input: text1 = "abc", text2 = "abc"
# Output: 3
# Explanation: The longest common subsequence is "abc" and its length is 3.
# 
# 
# Example 3:
# 
# 
# Input: text1 = "abc", text2 = "def"
# Output: 0
# Explanation: There is no such common subsequence, so the result is 0.
# 
# 
# 
# Constraints:
# 
# 
# 1 <= text1.length, text2.length <= 1000
# text1 and text2 consist of only lowercase English characters.
# 
# 
#

# @lc code=start
class Solution:
    # def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    #     if not text1 or not text2:
    #         return 0
    #     if text1[-1] == text2[-1]:
    #         return 1 + self.longestCommonSubsequence(text1[:-1], text2[:-1])
    #     return max(self.longestCommonSubsequence(text1[:-1], text2),self.longestCommonSubsequence(text1, text2[:-1]))
        

    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        # NOTE: Khi khai báo theo cách này, Python nhân bản danh sách bên trong, nghĩa là mọi dòng trong dp đều tham chiếu đến cùng một danh sách.
        # dp = [[0] * (n + 1)] * (m + 1)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        
        return dp[m][n]        
# @lc code=end

