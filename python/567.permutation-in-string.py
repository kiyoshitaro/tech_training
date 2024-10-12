#
# @lc app=leetcode id=567 lang=python3
#
# [567] Permutation in String
#
# https://leetcode.com/problems/permutation-in-string/description/
#
# algorithms
# Medium (45.52%)
# Likes:    11892
# Dislikes: 450
# Total Accepted:    1.1M
# Total Submissions: 2.3M
# Testcase Example:  '"ab"\n"eidbaooo"'
#
# Given two strings s1 and s2, return true if s2 contains a permutation of s1,
# or false otherwise.
# 
# In other words, return true if one of s1's permutations is the substring of
# s2.
# 
# 
# Example 1:
# 
# 
# Input: s1 = "ab", s2 = "eidbaooo"
# Output: true
# Explanation: s2 contains one permutation of s1 ("ba").
# 
# 
# Example 2:
# 
# 
# Input: s1 = "ab", s2 = "eidboaoo"
# Output: false
# 
# 
# 
# Constraints:
# 
# 
# 1 <= s1.length, s2.length <= 10^4
# s1 and s2 consist of lowercase English letters.
# 
# 
#

# @lc code=start
from collections import defaultdict
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        def encChar(c):
            return ord(c) - ord('a')
        if len(s1) > len(s2):
            return False
        freqs1, freqs2 = [0] * 26, [0] * 26
        for c in s1:
            freqs1[encChar(c)] += 1
        for i in range(len(s1)):
            freqs2[encChar(s2[i])] += 1
        totalMatched = 0
        for i in range(26):
            if freqs1[i] == freqs2[i]:
                totalMatched += 1
        if totalMatched == 26:
            return True
        for i in range(len(s1), len(s2)):
            if(s2[i] == s2[i - len(s1)]):
                continue
            else:
                freqs2[encChar(s2[i])] += 1
                if freqs2[encChar(s2[i])] == freqs1[encChar(s2[i])]:
                    totalMatched += 1
                elif freqs2[encChar(s2[i])] - 1 == freqs1[encChar(s2[i])]:
                    totalMatched -= 1
                freqs2[encChar(s2[i - len(s1)])] -= 1
                if freqs2[encChar(s2[i - len(s1)])] == freqs1[encChar(s2[i - len(s1)])]:
                    totalMatched += 1
                elif freqs2[encChar(s2[i - len(s1)])] + 1 == freqs1[encChar(s2[i - len(s1)])]:
                    totalMatched -= 1
                if totalMatched == 26:
                    return True
        return False

# @lc code=end

