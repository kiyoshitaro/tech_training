#
# @lc app=leetcode id=40 lang=python3
#
# [40] Combination Sum II
#
# https://leetcode.com/problems/combination-sum-ii/description/
#
# algorithms
# Medium (56.51%)
# Likes:    11107
# Dislikes: 324
# Total Accepted:    1.2M
# Total Submissions: 2.1M
# Testcase Example:  '[10,1,2,7,6,1,5]\n8'
#
# Given a collection of candidate numbers (candidates) and a target number
# (target), find all unique combinations in candidates where the candidate
# numbers sum to target.
# 
# Each number in candidates may only be used once in the combination.
# 
# Note: The solution set must not contain duplicate combinations.
# 
# 
# Example 1:
# 
# 
# Input: candidates = [10,1,2,7,6,1,5], target = 8
# Output: 
# [
# [1,1,6],
# [1,2,5],
# [1,7],
# [2,6]
# ]
# 
# 
# Example 2:
# 
# 
# Input: candidates = [2,5,2,1,2], target = 5
# Output: 
# [
# [1,2,2],
# [5]
# ]
# 
# 
# 
# Constraints:
# 
# 
# 1 <= candidates.length <= 100
# 1 <= candidates[i] <= 50
# 1 <= target <= 30
# 
# 
#

# @lc code=start
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        res, subset = [], []
        candidates.sort()
        def backtrack(i, sum):
            if(sum == target):
                res.append(subset[::])
                return
            if(sum > target or i >= len(candidates)):
                return
            subset.append(candidates[i])
            backtrack(i + 1, sum + candidates[i])
            subset.pop()
            while(i + 1 < len(candidates) and candidates[i] == candidates[i + 1]):
                i += 1
            backtrack(i + 1, sum)
        backtrack(0, 0)
        return res
# @lc code=end

