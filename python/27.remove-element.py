#
# @lc app=leetcode id=27 lang=python3
#
# [27] Remove Element
#

# @lc code=start
class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        n = len(nums)
        for num in nums:
            if num == val:
                nums.remove(num)
                n -= 1
        return n
        
# @lc code=end

