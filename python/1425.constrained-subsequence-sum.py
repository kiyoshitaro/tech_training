#
# @lc app=leetcode id=1425 lang=python3
#
# [1425] Constrained Subsequence Sum
#
# https://leetcode.com/problems/constrained-subsequence-sum/description/
#
# algorithms
# Hard (56.53%)
# Likes:    2145
# Dislikes: 104
# Total Accepted:    80.7K
# Total Submissions: 142.8K
# Testcase Example:  '[10,2,-10,5,20]\n2'
#
# Given an integer array nums and an integer k, return the maximum sum of a
# non-empty subsequence of that array such that for every two consecutive
# integers in the subsequence, nums[i] and nums[j], where i < j, the condition
# j - i <= k is satisfied.
# 
# A subsequence of an array is obtained by deleting some number of elements
# (can be zero) from the array, leaving the remaining elements in their
# original order.
# 
# 
# Example 1:
# 
# 
# Input: nums = [10,2,-10,5,20], k = 2
# Output: 37
# Explanation: The subsequence is [10, 2, 5, 20].
# 
# 
# Example 2:
# 
# 
# Input: nums = [-1,-2,-3], k = 1
# Output: -1
# Explanation: The subsequence must be non-empty, so we choose the largest
# number.
# 
# 
# Example 3:
# 
# 
# Input: nums = [10,-2,-10,-5,20], k = 2
# Output: 23
# Explanation: The subsequence is [10, -2, -5, 20].
# 
# 
# 
# Constraints:
# 
# 
# 1 <= k <= nums.length <= 10^5
# -10^4 <= nums[i] <= 10^4
# 
# 
#

# @lc code=start
class Solution:
    def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
        monoQueue = collections.deque()
        for r in range(len(nums)):
            if monoQueue: 
                nums[r] += nums[monoQueue[0]]
            if nums[r] > 0:
                while monoQueue and nums[monoQueue[-1]] <= nums[r]:
                    monoQueue.pop()
                monoQueue.append(r)
            if(monoQueue and r - monoQueue[0] >= k):
                monoQueue.popleft()
        return max(nums)
# @lc code=end

