#
# @lc app=leetcode id=1 lang=python3
#
# [1] Two Sum
#

# @lc code=start
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        _dict = {}
        for i, v in enumerate(nums):
            if(v in _dict):
                return [i, _dict[v]]
            else:
                _dict[target - v] = i
        
# @lc code=end

