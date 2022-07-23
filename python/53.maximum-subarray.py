#
# @lc app=leetcode id=53 lang=python3
#
# [53] Maximum Subarray
#
# https://leetcode.com/problems/maximum-subarray/description/
#
# algorithms
# Medium (49.70%)
# Likes:    22801
# Dislikes: 1112
# Total Accepted:    2.5M
# Total Submissions: 5.1M
# Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
#
# Given an integer array nums, find the contiguous subarray (containing at
# least one number) which has the largest sum and return its sum.
#
# A subarray is a contiguous part of an array.
#
#
# Example 1:
#
#
# Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
# Output: 6
# Explanation: [4,-1,2,1] has the largest sum = 6.
#
#
# Example 2:
#
#
# Input: nums = [1]
# Output: 1
#
#
# Example 3:
#
#
# Input: nums = [5,4,-1,7,8]
# Output: 23
#
#
#
# Constraints:
#
#
# 1 <= nums.length <= 10^5
# -10^4 <= nums[i] <= 10^4
#
#
#
# Follow up: If you have figured out the O(n) solution, try coding another
# solution using the divide and conquer approach, which is more subtle.
#
#
import math

# @lc code=start
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        prefSum = [0]
        prefMin = [0]
        mn = 0
        mx = -math.inf
        tmp = 0
        for num in nums:
            tmp += num
            prefSum.append(tmp)
            mn = min(mn, tmp)
            prefMin.append(mn)
        for i in range(len(prefSum)-1):
            mx = max(mx, prefSum[i+1] - prefMin[i+1])

        return mx
        # return int(max(mx, tmp) - min(mn, tmp))


# @lc code=end
