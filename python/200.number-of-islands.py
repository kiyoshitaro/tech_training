#
# @lc app=leetcode id=200 lang=python3
#
# [200] Number of Islands
#
# https://leetcode.com/problems/number-of-islands/description/
#
# algorithms
# Medium (60.33%)
# Likes:    23051
# Dislikes: 530
# Total Accepted:    3M
# Total Submissions: 4.9M
# Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
#
# Given an m x n 2D binary grid grid which represents a map of '1's (land) and
# '0's (water), return the number of islands.
# 
# An island is surrounded by water and is formed by connecting adjacent lands
# horizontally or vertically. You may assume all four edges of the grid are all
# surrounded by water.
# 
# 
# Example 1:
# 
# 
# Input: grid = [
# ⁠ ["1","1","1","1","0"],
# ⁠ ["1","1","0","1","0"],
# ⁠ ["1","1","0","0","0"],
# ⁠ ["0","0","0","0","0"]
# ]
# Output: 1
# 
# 
# Example 2:
# 
# 
# Input: grid = [
# ⁠ ["1","1","0","0","0"],
# ⁠ ["1","1","0","0","0"],
# ⁠ ["0","0","1","0","0"],
# ⁠ ["0","0","0","1","1"]
# ]
# Output: 3
# 
# 
# 
# Constraints:
# 
# 
# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 300
# grid[i][j] is '0' or '1'.
# 
# 
#

# @lc code=start
# DFS iterative
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m,n = len(grid),len(grid[0])
        if(m < 1 or n <1):
            return 0
        visited = set()
        cnt = 0
        def encode(x,y):
            return x*n + y
        def dfs(p,q, visited):
            stack = [(p, q)]
            while stack:
                u, v = stack.pop()
                for x,y in [(u-1,v),(u+1,v),(u,v-1),(u,v+1)]:
                    if(0<=x<m and 0<=y<n and grid[x][y] == '1' and encode(x,y) not in visited):
                        stack.append((x,y))
                        visited.add(encode(x,y))
        for i in range(m):
            for j in range(n):
                if(grid[i][j] == '1' and encode(i,j) not in visited):
                    dfs(i,j, visited)
                    cnt += 1
        return cnt
# @lc code=end

