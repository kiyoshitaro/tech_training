#
# @lc app=leetcode id=347 lang=python3
#
# [347] Top K Frequent Elements
#

# @lc code=start
from collections import defaultdict
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        freq = defaultdict(int)
        for n in nums:
            freq[n] += 1
        freqMap = [[] for i in range(len(nums)+1)]
        for n, f in freq.items():
            freqMap[f].append(n)
        res = []
        for i in range(len(freqMap)-1, 0, -1):
            for n in freqMap[i]:
                k -= 1
                res.append(n)
                if k == 0:
                    return res
        return res
# @lc code=end

