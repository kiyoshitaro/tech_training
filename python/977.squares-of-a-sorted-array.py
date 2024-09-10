#
# @lc app=leetcode id=977 lang=python3
#
# [977] Squares of a Sorted Array
#

# @lc code=start
from collections import deque
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        res = deque()
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            if nums[lo] ** 2 > nums[hi] ** 2:
                res.appendleft(nums[lo] ** 2)
                lo += 1
            else:
                res.appendleft(nums[hi] ** 2)
                hi -= 1
        return res
        
# @lc code=end

