#
# @lc app=leetcode id=746 lang=python3
#
# [746] Min Cost Climbing Stairs
#
# https://leetcode.com/problems/min-cost-climbing-stairs/description/
#
# algorithms
# Easy (66.44%)
# Likes:    11853
# Dislikes: 1824
# Total Accepted:    1.4M
# Total Submissions: 2.2M
# Testcase Example:  '[10,15,20]'
#
# You are given an integer array cost where cost[i] is the cost of i^th step on
# a staircase. Once you pay the cost, you can either climb one or two steps.
# 
# You can either start from the step with index 0, or the step with index 1.
# 
# Return the minimum cost to reach the top of the floor.
# 
# 
# Example 1:
# 
# 
# Input: cost = [10,15,20]
# Output: 15
# Explanation: You will start at index 1.
# - Pay 15 and climb two steps to reach the top.
# The total cost is 15.
# 
# 
# Example 2:
# 
# 
# Input: cost = [1,100,1,1,1,100,1,1,100,1]
# Output: 6
# Explanation: You will start at index 0.
# - Pay 1 and climb two steps to reach index 2.
# - Pay 1 and climb two steps to reach index 4.
# - Pay 1 and climb two steps to reach index 6.
# - Pay 1 and climb one step to reach index 7.
# - Pay 1 and climb two steps to reach index 9.
# - Pay 1 and climb one step to reach the top.
# The total cost is 6.
# 
# 
# 
# Constraints:
# 
# 
# 2 <= cost.length <= 1000
# 0 <= cost[i] <= 999
# 
# 
#

# @lc code=start
# Duyệt toàn bộ (Brute Force)
# Hãy hình dung cách giải quyết đơn giản nhất: duyệt tất cả các cách đi để tìm phương án tốt nhất.
# Ta có hai lựa chọn ở mỗi bậc:
# Nhảy 1 bước
# Nhảy 2 bước
# Cách tiếp cận tự nhiên là sử dụng đệ quy để thử tất cả các khả năng:
# class Solution:
#     def minCostClimbingStairs(self, cost: List[int]) -> int:
#         return self.findMin(cost, -1)
#     def findMin(self, cost, i):
#         if i >= len(cost):
#             return 0
#         if(i < 0):
#             curr = 0
#         else:
#             curr = cost[i]
#         return curr + min(self.findMin(cost, i + 1),self.findMin(cost, i + 2) )
# độ phức tạp O(2^N)

# Cải thiện bằng lưu trữ kết quả
# class Solution:
#     def minCostClimbingStairs(self, cost: List[int]) -> int:
#         return self.findMin(cost, -1, {})
#     def findMin(self, cost, i, memo):
#         if i >= len(cost):
#             return 0
#         if i in memo:
#             return memo[i]
#         if(i < 0):
#             curr = 0
#         else:
#             curr = cost[i]
#         memo[i] = curr + min(self.findMin(cost, i + 1, memo),self.findMin(cost, i + 2, memo) )
#         return memo[i]
# 🔹 Cải thiện: Từ O(2^N) giảm xuống O(N) do ta chỉ tính mỗi trạng thái đúng 1 lần.

# 3️⃣ Cách tiếp cận tối ưu - Bottom-Up (Tabulation)
# class Solution:
#     def minCostClimbingStairs(self, cost: List[int]) -> int:
#         n = len(cost)
#         dp = [0] * (n+2)
#         for i in range(n -1, -1 , -1):
#             dp[i] = cost[i] + min(dp[i+1], dp[i+2])
#         return min(dp[0], dp[1])
# Không cần gọi hàm đệ quy
# Độ phức tạp O(N), nhanh hơn nhiều!
# 4️⃣ Tối ưu hóa không gian - Chỉ dùng hai biến
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        prev1, prev2 = 0,0
        for i in range(len(cost) -1, -1 , -1):
            curr = cost[i] + min(prev1, prev2)
            prev2 = prev1
            prev1 = curr
        return min(prev1, prev2)
# Dùng O(1) bộ nhớ!        
# @lc code=end

