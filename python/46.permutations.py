#
# @lc app=leetcode id=46 lang=python3
#
# [46] Permutations
#
# https://leetcode.com/problems/permutations/description/
#
# algorithms
# Medium (79.33%)
# Likes:    19306
# Dislikes: 335
# Total Accepted:    2.3M
# Total Submissions: 2.9M
# Testcase Example:  '[1,2,3]'
#
# Given an array nums of distinct integers, return all the possible
# permutations. You can return the answer in any order.
# 
# 
# Example 1:
# Input: nums = [1,2,3]
# Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
# Example 2:
# Input: nums = [0,1]
# Output: [[0,1],[1,0]]
# Example 3:
# Input: nums = [1]
# Output: [[1]]
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 6
# -10 <= nums[i] <= 10
# All the integers of nums are unique.
# 
# 
#

# @lc code=start
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        def backtrack(nums, path):
            if not nums:
                res.append(path)
            for i in range(len(nums)):
                backtrack(nums[:i] + nums[i+1:], path + [nums[i]])
        backtrack(nums, [])
        return res
    
        # def backtrack(nums):
        #     if not nums:
        #         return [[]]
        #     prevs = backtrack(nums[1:])
        #     res = []
        #     for prev in prevs:
        #         for i in range(len(prev)+1):
        #             res.append(prev[:i] + [nums[0]] + prev[i:])
        #     return res
        # return backtrack(nums)

        
# @lc code=end

