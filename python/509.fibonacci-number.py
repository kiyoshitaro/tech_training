#
# @lc app=leetcode id=509 lang=python3
#
# [509] Fibonacci Number
#
# https://leetcode.com/problems/fibonacci-number/description/
#
# algorithms
# Easy (71.98%)
# Likes:    8669
# Dislikes: 383
# Total Accepted:    2.4M
# Total Submissions: 3.3M
# Testcase Example:  '2'
#
# The Fibonacci numbers, commonly denoted F(n) form a sequence, called the
# Fibonacci sequence, such that each number is the sum of the two preceding
# ones, starting from 0 and 1. That is,
# 
# 
# F(0) = 0, F(1) = 1
# F(n) = F(n - 1) + F(n - 2), for n > 1.
# 
# 
# Given n, calculate F(n).
# 
# 
# Example 1:
# 
# 
# Input: n = 2
# Output: 1
# Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
# 
# 
# Example 2:
# 
# 
# Input: n = 3
# Output: 2
# Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
# 
# 
# Example 3:
# 
# 
# Input: n = 4
# Output: 3
# Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
# 
# 
# 
# Constraints:
# 
# 
# 0 <= n <= 30
# 
# 
#

# @lc code=start
# hashMap = {}
# class Solution:
#     def fib(self, n: int) -> int:
#         if n == 0:
#             return 0
#         if n == 1:
#             return 1
#         if n in hashMap:
#             return hashMap[n]
#         _tmp = self.fib(n-1) + self.fib(n-2)
#         hashMap[n] = _tmp
#         return _tmp
        

# # Brute Force - Recursive- Độ phức tạp O(2ⁿ) (rất chậm).
# class Solution:
#     def fib(self, n: int) -> int:
#         if n <= 1:
#             return n
#         return self.fib(n-1) + self.fib(n-2)

# # Memoization - Top-down DP - O(n)
# class Solution:
#     def fib(self, n: int) -> int:
#         return self.fibonacci(n)

#     def fibonacci(self, n: int, memo = {}):
#         if n in memo:
#             return memo[n]
#         if n <= 1:
#             return n
#         memo[n] = self.fibonacci(n-1, memo) + self.fibonacci(n-2, memo)
#         return memo[n]

# # Duyệt dãy Fibonacci - Tabulation - Bottom-up DP, Độ phức tạp O(n), tốt hơn so với cách 1.
# class Solution:
#     def fib(self, n: int) -> int:
#         if n <= 1:
#             return n

#         dp = [0] * (n + 1)
#         dp[1] = 1

#         for i in range(2, n + 1):
#             dp[i] = dp[i - 1] + dp[i - 2]

#         return dp[n]

# # Tối ưu hóa bộ nhớ (Biến nhớ thay vì mảng) - bộ nhớ từ O(n) xuống O(1), phức tạp vẫn là O(n)
# class Solution:
#     def fib(self, n: int) -> int:
#         if n <= 1:
#             return n

#         a, b = 0, 1
#         for _ in range(2, n + 1):
#             a, b = b, a + b

#         return b

# # Binet's Formula - phức tạp O(1) (cực nhanh) - có sai số nhỏ với số lớn do làm tròn
# class Solution:
#     def fib(self, n: int) -> int:
#         phi = (1 + math.sqrt(5)) / 2
#         return round(phi**n / math.sqrt(5))

# # Dùng Ma trận (Matrix Exponentiation: phương pháp lũy thừa nhanh) - phức tạp O(log n)
# class Solution:
#     def fib(self, n: int) -> int:
#         F = [[1, 1], [1, 0]]
#         return self.matrix_power(F, n)[0][1]
#     def matrix_mult(self, A, B):
#         return [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
#                 [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]]
#     def matrix_power(self, M, power):
#         result = [[1, 0], [0, 1]]
#         base = M

#         while power:
#             if power % 2:
#                 result = self.matrix_mult(result, base)
#             base = self.matrix_mult(base, base)
#             power //= 2

#         return result
        
# @lc code=end

