#
# @lc app=leetcode id=763 lang=python3
#
# [763] Partition Labels
#
# https://leetcode.com/problems/partition-labels/description/
#
# algorithms
# Medium (80.07%)
# Likes:    10390
# Dislikes: 404
# Total Accepted:    571.6K
# Total Submissions: 713.9K
# Testcase Example:  '"ababcbacadefegdehijhklij"'
#
# You are given a string s. We want to partition the string into as many parts
# as possible so that each letter appears in at most one part.
# 
# Note that the partition is done so that after concatenating all the parts in
# order, the resultant string should be s.
# 
# Return a list of integers representing the size of these parts.
# 
# 
# Example 1:
# 
# 
# Input: s = "ababcbacadefegdehijhklij"
# Output: [9,7,8]
# Explanation:
# The partition is "ababcbaca", "defegde", "hijhklij".
# This is a partition so that each letter appears in at most one part.
# A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it
# splits s into less parts.
# 
# 
# Example 2:
# 
# 
# Input: s = "eccbbbbdec"
# Output: [10]
# 
# 
# 
# Constraints:
# 
# 
# 1 <= s.length <= 500
# s consists of lowercase English letters.
# 
# 
#

# @lc code=start
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        freq = {}
        for i in s:
            if i in freq:
                freq[i] += 1
            else:
                freq[i] = 1
        res = []
        currCount, currRes = 0, 0
        currSet = set()
        for char in s:
            currRes += 1
            if char not in currSet:
                currSet.add(char)
                currCount += freq[char] - 1
            else:
                currCount -= 1
            if currCount == 0:
                res.append(currRes)
                currCount ,currRes = 0, 0
                currSet = set()
        return res
# @lc code=end

