#
# @lc app=leetcode id=560 lang=python3
#
# [560] Subarray Sum Equals K
#
# https://leetcode.com/problems/subarray-sum-equals-k/description/
#
# algorithms
# Medium (44.19%)
# Likes:    14383
# Dislikes: 443
# Total Accepted:    824.7K
# Total Submissions: 1.9M
# Testcase Example:  '[1,1,1]\n2'
#
# Given an array of integers nums and an integer k, return the total number of
# subarrays whose sum equals to k.
# 
# A subarray is a contiguous non-empty sequence of elements within an array.
# 
# 
# Example 1:
# Input: nums = [1,1,1], k = 2
# Output: 2
# Example 2:
# Input: nums = [1,2,3], k = 3
# Output: 2
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 2 * 10^4
# -1000 <= nums[i] <= 1000
# -10^7 <= k <= 10^7
# 
# 
#
import math

# @lc code=start
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # preSum = [0]
        # c = 0
        mn = 0
        mx = float('-inf')
        tmp = 0
        for num in nums:
            mn = min(mn, tmp)
            tmp += num
            mx = max(mx, tmp - mn)

        sums = [0 for i in range(max(mx + 1))]
        sums[0] = 1;
        prefix_sum = 0
        ans = 0
        for num in nums:
          prefix_sum += num
          ans += sums[prefix_sum - k]
          sums[prefix_sum] += 1
        

        # for num in nums:
        #     tmp += num
        #     preSum.append(tmp)
        # for i in range(len(preSum)-1):
        #   tmp = preSum[i]
        #   for j in range(i + 1, len(preSum)):
        #     if(preSum[j] - tmp == k):
        #       c += 1
        return ans
# @lc code=end

