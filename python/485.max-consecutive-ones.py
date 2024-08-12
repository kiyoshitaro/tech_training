#
# @lc app=leetcode id=485 lang=python3
#
# [485] Max Consecutive Ones
#

# @lc code=start
class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        res = 0
        curRes = 0
        for num in nums:
            if num == 1:
                curRes += 1
            else:
                res = max(res, curRes)
                curRes = 0
        return max(res, curRes)
        
# @lc code=end

