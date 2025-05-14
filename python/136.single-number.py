#
# @lc app=leetcode id=136 lang=python3
#
# [136] Single Number
#
# https://leetcode.com/problems/single-number/description/
#
# algorithms
# Easy (74.47%)
# Likes:    17492
# Dislikes: 806
# Total Accepted:    3.6M
# Total Submissions: 4.8M
# Testcase Example:  '[2,2,1]'
#
# Given a non-empty array of integers nums, every element appears twice except
# for one. Find that single one.
# 
# You must implement a solution with a linear runtime complexity and use only
# constant extra space.
# 
# 
# Example 1:
# 
# 
# Input: nums = [2,2,1]
# 
# Output: 1
# 
# 
# Example 2:
# 
# 
# Input: nums = [4,1,2,1,2]
# 
# Output: 4
# 
# 
# Example 3:
# 
# 
# Input: nums = [1]
# 
# Output: 1
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 3 * 10^4
# -3 * 10^4 <= nums[i] <= 3 * 10^4
# Each element in the array appears twice except for one element which appears
# only once.
# 
# 
#

# @lc code=start
class Solution:
    # def singleNumber(self, nums: List[int]) -> int:
    #     t = set()
    #     for i in nums:
    #         if i in t:
    #             t.remove(i)
    #         else:
    #             t.add(i)
    #     return list(t)[0]
    
    # Tính chất giao hoán: A ^ B = B ^ A

    # Tính chất kết hợp: (A ^ B) ^ C = A ^ (B ^ C)

    # XOR với chính nó bằng 0: A ^ A = 0

    # XOR với 0 không thay đổi giá trị: A ^ 0 = A

    # Có thể dùng XOR để hoán đổi giá trị mà không cần biến trung gian:
    # O(1) không gian
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result        
# @lc code=end

