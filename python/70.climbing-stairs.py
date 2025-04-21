#
# @lc app=leetcode id=70 lang=python3
#
# [70] Climbing Stairs
#
# https://leetcode.com/problems/climbing-stairs/description/
#
# algorithms
# Easy (53.18%)
# Likes:    23023
# Dislikes: 952
# Total Accepted:    4.1M
# Total Submissions: 7.7M
# Testcase Example:  '2'
#
# You are climbing a staircase. It takes n steps to reach the top.
# 
# Each time you can either climb 1 or 2 steps. In how many distinct ways can
# you climb to the top?
# 
# 
# Example 1:
# 
# 
# Input: n = 2
# Output: 2
# Explanation: There are two ways to climb to the top.
# 1. 1 step + 1 step
# 2. 2 steps
# 
# 
# Example 2:
# 
# 
# Input: n = 3
# Output: 3
# Explanation: There are three ways to climb to the top.
# 1. 1 step + 1 step + 1 step
# 2. 1 step + 2 steps
# 3. 2 steps + 1 step
# 
# 
# 
# Constraints:
# 
# 
# 1 <= n <= 45
# 
# 
#

# @lc code=start
class Solution:
    # def climbStairs(self, n: int) -> int:
    #     return self.solve(n, 0, {})
        
    # def solve(self, n, i, memo):
    #     if i in memo:
    #         return memo[i]
    #     if i == n or n == 0:
    #         return 0
    #     if i == n-1 or n == 1:
    #         return 1
    #     if i == n- 2:
    #         return 2
    #     return self.solve(n, i + 1, memo) + self.solve(n , i + 2, memo)
        
    # def climbStairs(self, n: int) -> int:
    #     if n <= 2:
    #         return n
    #     dp = [0]*(n-2)
    #     dp.extend([2,1])
    #     for i in range(n-3, -1, -1):
    #         dp[i] = dp[i+1] + dp[i+2]
    #     return dp[0]

    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        first, second = 1, 2
        for i in range(n-3, -1, -1):
            curr = first + second
            first = second
            second = curr
        return curr

        
# @lc code=end

