#
# @lc app=leetcode id=74 lang=python3
#
# [74] Search a 2D Matrix
#
# https://leetcode.com/problems/search-a-2d-matrix/description/
#
# algorithms
# Medium (51.11%)
# Likes:    16054
# Dislikes: 424
# Total Accepted:    2M
# Total Submissions: 3.9M
# Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'
#
# You are given an m x n integer matrix matrix with the following two
# properties:
# 
# 
# Each row is sorted in non-decreasing order.
# The first integer of each row is greater than the last integer of the
# previous row.
# 
# 
# Given an integer target, return true if target is in matrix or false
# otherwise.
# 
# You must write a solution in O(log(m * n)) time complexity.
# 
# 
# Example 1:
# 
# 
# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
# Output: true
# 
# 
# Example 2:
# 
# 
# Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
# Output: false
# 
# 
# 
# Constraints:
# 
# 
# m == matrix.length
# n == matrix[i].length
# 1 <= m, n <= 100
# -10^4 <= matrix[i][j], target <= 10^4
# 
# 
#

# @lc code=start
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        lR, rR = 0, len(matrix) - 1
        while lR <= rR:
            midR = (lR + rR) // 2
            if target < matrix[midR][0]:
                rR = midR - 1
            elif target > matrix[midR][-1]:
                lR = midR + 1
            else:
                break
        midR = (lR + rR) // 2
        lC, rC = 0, len(matrix[0]) - 1
        while lC <= rC:
            midC = (lC + rC) // 2
            if target < matrix[midR][midC]:
                rC = midC - 1
            elif target > matrix[midR][midC]:
                lC = midC + 1
            else:
                return True
        return False
        
# @lc code=end

