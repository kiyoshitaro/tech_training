#
# @lc app=leetcode id=1438 lang=python3
#
# [1438] Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
#
# https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/
#
# algorithms
# Medium (56.62%)
# Likes:    4120
# Dislikes: 195
# Total Accepted:    240.9K
# Total Submissions: 425.3K
# Testcase Example:  '[8,2,4,7]\n4'
#
# Given an array of integers nums and an integer limit, return the size of the
# longest non-empty subarray such that the absolute difference between any two
# elements of this subarray is less than or equal to limit.
# 
# 
# Example 1:
# 
# 
# Input: nums = [8,2,4,7], limit = 4
# Output: 2 
# Explanation: All subarrays are: 
# [8] with maximum absolute diff |8-8| = 0 <= 4.
# [8,2] with maximum absolute diff |8-2| = 6 > 4. 
# [8,2,4] with maximum absolute diff |8-2| = 6 > 4.
# [8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
# [2] with maximum absolute diff |2-2| = 0 <= 4.
# [2,4] with maximum absolute diff |2-4| = 2 <= 4.
# [2,4,7] with maximum absolute diff |2-7| = 5 > 4.
# [4] with maximum absolute diff |4-4| = 0 <= 4.
# [4,7] with maximum absolute diff |4-7| = 3 <= 4.
# [7] with maximum absolute diff |7-7| = 0 <= 4. 
# Therefore, the size of the longest subarray is 2.
# 
# 
# Example 2:
# 
# 
# Input: nums = [10,1,2,4,7,2], limit = 5
# Output: 4 
# Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute
# diff is |2-7| = 5 <= 5.
# 
# 
# Example 3:
# 
# 
# Input: nums = [4,2,2,2,4,4,2,2], limit = 0
# Output: 3
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 10^5
# 1 <= nums[i] <= 10^9
# 0 <= limit <= 10^9
# 
# 
#

# @lc code=start
import collections
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        maxQ = collections.deque()
        minQ = collections.deque()
        res = 0
        l = 0
        for r in range(len(nums)):
            while maxQ and maxQ[-1] < nums[r]:
                maxQ.pop()
            while minQ and minQ[-1] > nums[r]:
                minQ.pop()
            maxQ.append(nums[r])
            minQ.append(nums[r])
            while maxQ[0] - minQ[0] > limit:
                if maxQ[0] == nums[l]:
                    maxQ.popleft()
                if minQ[0] == nums[l]:
                    minQ.popleft()
                l += 1
            res = max(res, r - l + 1)
        return res
        
# @lc code=end

