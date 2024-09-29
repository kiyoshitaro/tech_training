#
# @lc app=leetcode id=78 lang=python3
#
# [78] Subsets
#
# https://leetcode.com/problems/subsets/description/
#
# algorithms
# Medium (79.16%)
# Likes:    17474
# Dislikes: 284
# Total Accepted:    2.1M
# Total Submissions: 2.7M
# Testcase Example:  '[1,2,3]'
#
# Given an integer array nums of unique elements, return all possible subsets
# (the power set).
# 
# The solution set must not contain duplicate subsets. Return the solution in
# any order.
# 
# 
# Example 1:
# 
# 
# Input: nums = [1,2,3]
# Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
# 
# 
# Example 2:
# 
# 
# Input: nums = [0]
# Output: [[],[0]]
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 10
# -10 <= nums[i] <= 10
# All the numbers of nums are unique.
# 
# 
#

# @lc code=start
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        # res, subset = [], []
        # def backtrack(i):
        #     if(i >= len(nums)):
        #         res.append(subset.copy())
        #         return
        #     subset.append(nums[i])
        #     backtrack(i+1)
        #     subset.pop()
        #     backtrack(i+1)
            
        # backtrack(0)
        # return res
        nums.sort()
        result = []
        self.backtrack(nums, [], result)
        return result

    def backtrack(self, S, current, result):
        result.append(current)
        for ind, val in enumerate(S):
            self.backtrack(S[ind+1:], current+[val], result)


# @lc code=end

