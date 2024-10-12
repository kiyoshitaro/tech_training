#
# @lc app=leetcode id=424 lang=python3
#
# [424] Longest Repeating Character Replacement
#
# https://leetcode.com/problems/longest-repeating-character-replacement/description/
#
# algorithms
# Medium (55.40%)
# Likes:    10970
# Dislikes: 565
# Total Accepted:    885.4K
# Total Submissions: 1.6M
# Testcase Example:  '"ABAB"\n2'
#
# You are given a string s and an integer k. You can choose any character of
# the string and change it to any other uppercase English character. You can
# perform this operation at most k times.
# 
# Return the length of the longest substring containing the same letter you can
# get after performing the above operations.
# 
# 
# Example 1:
# 
# 
# Input: s = "ABAB", k = 2
# Output: 4
# Explanation: Replace the two 'A's with two 'B's or vice versa.
# 
# 
# Example 2:
# 
# 
# Input: s = "AABABBA", k = 1
# Output: 4
# Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
# The substring "BBBB" has the longest repeating letters, which is 4.
# There may exists other ways to achieve this answer too.
# 
# 
# Constraints:
# 
# 
# 1 <= s.length <= 10^5
# s consists of only uppercase English letters.
# 0 <= k <= s.length
# 
# 
#

# @lc code=start
from collections import defaultdict
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        freq = defaultdict(int)
        maxFreq = 0
        l = 0
        for i, c in enumerate(s):
            freq[c] += 1
            maxFreq = max(maxFreq, freq[c])
            if(i -l + 1 - maxFreq > k):
                freq[s[l]] -= 1
                l += 1
        return len(s) - l

        
# @lc code=end

