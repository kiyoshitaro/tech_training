#
# @lc app=leetcode id=90 lang=python3
#
# [90] Subsets II
#
# https://leetcode.com/problems/subsets-ii/description/
#
# algorithms
# Medium (58.16%)
# Likes:    9904
# Dislikes: 335
# Total Accepted:    1M
# Total Submissions: 1.8M
# Testcase Example:  '[1,2,2]'
#
# Given an integer array nums that may contain duplicates, return all possible
# subsets (the power set).
# 
# The solution set must not contain duplicate subsets. Return the solution in
# any order.
# 
# 
# Example 1:
# Input: nums = [1,2,2]
# Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
# Example 2:
# Input: nums = [0]
# Output: [[],[0]]
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 10
# -10 <= nums[i] <= 10
# 
# 
#

# @lc code=start
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res, subset = [], []
        nums.sort()
        def backtrack(i):
            if(i >= len(nums)):
                res.append(subset[::])
                return
            subset.append(nums[i])
            backtrack(i+1)
            subset.pop()
            while(i+1 < len(nums) and nums[i] == nums[i+1]):
                i += 1
            backtrack(i+1)
        backtrack(0)
        return res
        
# @lc code=end

