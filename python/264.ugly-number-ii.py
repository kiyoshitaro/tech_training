#
# @lc app=leetcode id=264 lang=python3
#
# [264] Ugly Number II
#
# https://leetcode.com/problems/ugly-number-ii/description/
#
# algorithms
# Medium (49.13%)
# Likes:    6571
# Dislikes: 398
# Total Accepted:    464.1K
# Total Submissions: 944.5K
# Testcase Example:  '10'
#
# An ugly number is a positive integer whose prime factors are limited to 2, 3,
# and 5.
# 
# Given an integer n, return the n^th ugly number.
# 
# 
# Example 1:
# 
# 
# Input: n = 10
# Output: 12
# Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10
# ugly numbers.
# 
# 
# Example 2:
# 
# 
# Input: n = 1
# Output: 1
# Explanation: 1 has no prime factors, therefore all of its prime factors are
# limited to 2, 3, and 5.
# 
# 
# 
# Constraints:
# 
# 
# 1 <= n <= 1690
# 
# 
#

# @lc code=start
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        heapQ = [1]
        seen = set()
        for _ in range(n):
            num = heapq.heappop(heapQ)
            for p in [2, 3, 5]:
                newNum = num * p
                if newNum not in seen:
                    seen.add(newNum)
                    heapq.heappush(heapQ, newNum)
        return num
        
# @lc code=end

