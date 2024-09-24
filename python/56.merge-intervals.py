#
# @lc app=leetcode id=56 lang=python3
#
# [56] Merge Intervals
#

# @lc code=start
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        res = []
        sortedIntervals = sorted(intervals, key = lambda x: x[0])
        currPtr = [sortedIntervals[0][0], sortedIntervals[0][1]]
        for i in range(0, len(sortedIntervals)):
            (st, ed) = sortedIntervals[i]                
            if currPtr[1] < st:
                res.append(currPtr)
                currPtr = [st, ed]
            else:
                currPtr[1] = max(currPtr[1], ed)
            if i == len(sortedIntervals) - 1:
                res.append([currPtr[0], max(currPtr[1], ed)])

        return res
                
        
# @lc code=end

