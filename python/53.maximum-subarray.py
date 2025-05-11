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
# cách tiếp cận tuyến tính (Kadane) và cách tiếp cận chia để trị (Divide & Conquer)
# class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        res = nums[0]
        currTotal = 0
        
        for i in range(len(nums)):
            currTotal += nums[i]
            res = max(res, currTotal)
            if(currTotal < 0):
                currTotal = 0
        return res

#         # prefixSum = [0]
#         # curr = 0
#         # for i in nums:
#         #     curr += i
#         #     prefixSum.append(curr)
#         # l, r = 0, len(prefixSum) - 1
#         # minL, maxR = l, r
#         # print(prefixSum)
#         # while l < r:
#         #     print(minL, l , maxR, r)
#         #     if(prefixSum[minL] > prefixSum[l]):
#         #         minL = l
#         #     l +=1 
#         #     if(prefixSum[maxR] < prefixSum[r]):
#         #         maxR = r
#         #     r -=1 
#         # return max(prefixSum[maxR] - prefixSum[minL], max(nums))

# # Divide & Conquer: O(nlogn)
# class Solution:
#     def maxSubArray(self, nums: List[int]) -> int:
#         def findMaxSubArray(left, right):
#             if left == right:
#                 return nums[left]

#             mid = (left + right) // 2
#             max_left = findMaxSubArray(left, mid)
#             max_right = findMaxSubArray(mid + 1, right)
#             max_cross = findMaxCrossingSum(nums, left, mid, right)

#             return max(max_left, max_right, max_cross)

#         def findMaxCrossingSum(nums, left, mid, right):
#             left_sum = float('-inf')
#             curr_sum = 0
#             for i in range(mid, left - 1, -1):  # Quét từ giữa về trái
#                 curr_sum += nums[i]
#                 left_sum = max(left_sum, curr_sum)

#             right_sum = float('-inf')
#             curr_sum = 0
#             for i in range(mid + 1, right + 1):  # Quét từ giữa về phải
#                 curr_sum += nums[i]
#                 right_sum = max(right_sum, curr_sum)

#             return left_sum + right_sum  # Tổng tốt nhất qua giữa

#         return findMaxSubArray(0, len(nums) - 1)
        


# @lc code=end
