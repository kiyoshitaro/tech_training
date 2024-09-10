#
# @lc app=leetcode id=373 lang=python3
#
# [373] Find K Pairs with Smallest Sums
#

# @lc code=start
import heapq
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        heap = [(nums1[i] + nums2[0], i, 0) for i in range(len(nums1))]
        n2 = len(nums2)
        res = []
        cnt = 0
        while k > cnt and heap:
            cnt += 1
            ele = heapq.heappop(heap)
            res.append([nums1[ele[1]], nums2[ele[2]]])
            if(ele[2] + 1 < n2):
                heapq.heappush(heap, (nums1[ele[1]] + nums2[ele[2] + 1], ele[1], ele[2] + 1))
        return res
# @lc code=end

