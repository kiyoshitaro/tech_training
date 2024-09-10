#
# @lc app=leetcode id=239 lang=python3
#
# [239] Sliding Window Maximum
#

# @lc code=start
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q = deque()
        res = []
        for i in range(len(nums)):
            while len(q) > 0 and nums[q[-1]] <= nums[i]:
                q.pop()
            while len(q) > 0 and q[0] <= i - k:
                q.popleft()
            q.append(i)
            if i >= k - 1:
                res.append(nums[q[0]])
        return res
            
            
        
# @lc code=end

