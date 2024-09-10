#
# @lc app=leetcode id=209 lang=python3
#
# [209] Minimum Size Subarray Sum
#

# @lc code=start
import math
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        distance = math.inf
        left = 0
        sum_ = 0
        
        for right in range(len(nums)):
            sum_ += nums[right]
            
            while sum_ >= target:
                distance = min(distance, right - left + 1)
                sum_ -= nums[left]
                left += 1
        
        return 0 if distance == math.inf else distance

# @lc code=end

