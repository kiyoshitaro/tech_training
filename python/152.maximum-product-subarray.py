#
# @lc app=leetcode id=152 lang=python3
#
# [152] Maximum Product Subarray
#
# https://leetcode.com/problems/maximum-product-subarray/description/
#
# algorithms
# Medium (34.71%)
# Likes:    12671
# Dislikes: 383
# Total Accepted:    806.6K
# Total Submissions: 2.3M
# Testcase Example:  '[2,3,-2,4]'
#
# Given an integer array nums, find a contiguous non-empty subarray within the
# array that has the largest product, and return the product.
# 
# The test cases are generated so that the answer will fit in a 32-bit
# integer.
# 
# A subarray is a contiguous subsequence of the array.
# 
# 
# Example 1:
# 
# 
# Input: nums = [2,3,-2,4]
# Output: 6
# Explanation: [2,3] has the largest product 6.
# 
# 
# Example 2:
# 
# 
# Input: nums = [-2,0,-1]
# Output: 0
# Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 2 * 10^4
# -10 <= nums[i] <= 10
# The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit
# integer.
# 
# 
#

# @lc code=start
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        c = False
        for i in range(0, len(nums)):
          if(nums[i] != 0):
            break
          else:
            c = True
        mn = 1
        tmp = nums[i]
        mx = tmp
        for t in range(i+1, len(nums)):
          if(nums[t] == 0): 
            c = True
            mn = 1
            tmp = nums[i]
            mx = tmp
            continue
          if(mx * mn > mx * tmp):
            mn = tmp 
          tmp *= nums[i]
          mx = max(mx, tmp/mn)
        return int(mx) if c else max(0,int(mx))

        
# @lc code=end

