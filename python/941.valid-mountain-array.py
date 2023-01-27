#
# @lc app=leetcode id=941 lang=python3
#
# [941] Valid Mountain Array
#
# https://leetcode.com/problems/valid-mountain-array/description/
#
# algorithms
# Easy (33.53%)
# Likes:    2410
# Dislikes: 151
# Total Accepted:    335K
# Total Submissions: 999.1K
# Testcase Example:  '[2,1]'
#
# Given an array of integers arr, return true if and only if it is a valid
# mountain array.
# 
# Recall that arr is a mountain array if and only if:
# 
# 
# arr.length >= 3
# There exists some i with 0 < i < arr.length - 1 such that:
# 
# arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
# arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
# 
# 
# 
# 
# 
# Example 1:
# Input: arr = [2,1]
# Output: false
# Example 2:
# Input: arr = [3,5,5]
# Output: false
# Example 3:
# Input: arr = [0,3,2,1]
# Output: true
# 
# 
# Constraints:
# 
# 
# 1 <= arr.length <= 10^4
# 0 <= arr[i] <= 10^4
# 
# 
#

# @lc code=start
class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        incr = 0
        for i in range(1, len(arr)):
            if arr[i] == arr[i-1]:
                return False
            elif arr[i] > arr[i-1]:
                if incr == 2:
                    return False
                incr = 1
            else:
                if incr == 0:
                    return False
                incr = 2

        return incr == 2

# @lc code=end

