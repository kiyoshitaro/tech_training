#
# @lc app=leetcode id=307 lang=python3
#
# [307] Range Sum Query - Mutable
#
# https://leetcode.com/problems/range-sum-query-mutable/description/
#
# algorithms
# Medium (38.93%)
# Likes:    3952
# Dislikes: 214
# Total Accepted:    228.3K
# Total Submissions: 563.3K
# Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
#
# Given an integer array nums, handle multiple queries of the following
# types:
# 
# 
# Update the value of an element in nums.
# Calculate the sum of the elements of nums between indices left and right
# inclusive where left <= right.
# 
# 
# Implement the NumArray class:
# 
# 
# NumArray(int[] nums) Initializes the object with the integer array nums.
# void update(int index, int val) Updates the value of nums[index] to be
# val.
# int sumRange(int left, int right) Returns the sum of the elements of nums
# between indices left and right inclusive (i.e. nums[left] + nums[left + 1] +
# ... + nums[right]).
# 
# 
# 
# Example 1:
# 
# 
# Input
# ["NumArray", "sumRange", "update", "sumRange"]
# [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
# Output
# [null, 9, null, 8]
# 
# Explanation
# NumArray numArray = new NumArray([1, 3, 5]);
# numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
# numArray.update(1, 2);   // nums = [1, 2, 5]
# numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 3 * 10^4
# -100 <= nums[i] <= 100
# 0 <= index < nums.length
# -100 <= val <= 100
# 0 <= left <= right < nums.length
# At most 3 * 10^4 calls will be made to update and sumRange.
# 
# 
#

# @lc code=start
class NumArray:
    def __init__(self, nums: List[int]):    
      
        n = len(nums)
        if n == 0: return
        max_size = 2 * pow(2, int(math.ceil(math.log(n, 2)))) - 1
        self.seg_tree = [0 for i in range(max_size)]
        self.nums = nums[:]
        self._build_tree(0, n-1, 0)
                
    def _build_tree(self, start, end, curr):
        if start > end: return # empty list
        if start == end:
            self.seg_tree[curr] = self.nums[start]
        else:
            mid = start + (end - start)//2
            self.seg_tree[curr] = self._build_tree(start, mid, curr*2+1) + self._build_tree(mid+1, end, curr*2+2)
        return self.seg_tree[curr]        
        
  
    def update(self, i, val):
        diff = val - self.nums[i]
        self.nums[i] = val
        self.update_sum(0, len(self.nums)-1, i, 0, diff)
    
    def update_sum(self, start, end, idx, curr, diff):
        self.seg_tree[curr] += diff
        if start == end: return
        mid = start + (end - start)//2
        if start <= idx <= mid:
            self.update_sum(start, mid, idx, curr*2+1, diff)
        else:
            self.update_sum(mid+1, end, idx, curr*2+2, diff)
        
    def sumRange(self, i, j):
        return self.get_sum(0, len(self.nums)-1, i, j, 0)
        
    def get_sum(self, start, end, qstart, qend, curr):
        mid = start + (end - start)//2
        if qstart > end or qend < start:
            return 0
        elif start >= qstart and end <= qend:
            return self.seg_tree[curr]
        else:
            return self.get_sum(start, mid, qstart, qend, curr*2+1) + self.get_sum(mid+1, end, qstart, qend, curr*2+2)
# @lc code=end

