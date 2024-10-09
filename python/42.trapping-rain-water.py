#
# @lc app=leetcode id=42 lang=python3
#
# [42] Trapping Rain Water
#
# https://leetcode.com/problems/trapping-rain-water/description/
#
# algorithms
# Hard (63.23%)
# Likes:    32566
# Dislikes: 544
# Total Accepted:    2.4M
# Total Submissions: 3.8M
# Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
#
# Given n non-negative integers representing an elevation map where the width
# of each bar is 1, compute how much water it can trap after raining.
# 
# 
# Example 1:
# 
# 
# Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
# Output: 6
# Explanation: The above elevation map (black section) is represented by array
# [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section)
# are being trapped.
# 
# 
# Example 2:
# 
# 
# Input: height = [4,2,0,3,2,5]
# Output: 9
# 
# 
# 
# Constraints:
# 
# 
# n == height.length
# 1 <= n <= 2 * 10^4
# 0 <= height[i] <= 10^5
# 
# 
#

# @lc code=start
class Solution:
    def trap(self, height: List[int]) -> int:
        res = 0
        list_maxl, list_maxr = [0], [0]
        l, r = 0, len(height) - 1
        while l < len(height) - 1:
            list_maxl.append(max(height[l], list_maxl[-1]))
            l += 1
        print(list_maxl)
        while r > 0:
            list_maxr.append(max(height[r], list_maxr[-1]))
            r -= 1
        list_maxr.reverse()
        i = 0
        while i < len(height):
            res += max(min(list_maxl[i], list_maxr[i]) - height[i], 0)
            i += 1
        return res
        
# @lc code=end

