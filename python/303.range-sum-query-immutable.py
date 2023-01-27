#
# @lc app=leetcode id=303 lang=python3
#
# [303] Range Sum Query - Immutable
#
# https://leetcode.com/problems/range-sum-query-immutable/description/
#
# algorithms
# Easy (56.63%)
# Likes:    2249
# Dislikes: 1691
# Total Accepted:    379.7K
# Total Submissions: 664.7K
# Testcase Example:  '["NumArray","sumRange","sumRange","sumRange"]\n' +
  '[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]'
#
# Given an integer array nums, handle multiple queries of the following
# type:
# 
# 
# Calculate the sum of the elements of nums between indices left and right
# inclusive where left <= right.
# 
# 
# Implement the NumArray class:
# 
# 
# NumArray(int[] nums) Initializes the object with the integer array nums.
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
# ["NumArray", "sumRange", "sumRange", "sumRange"]
# [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
# Output
# [null, 1, -1, -3]
# 
# Explanation
# NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
# numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
# numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
# numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
# 
# 
# 
# Constraints:
# 
# 
# 1 <= nums.length <= 10^4
# -10^5 <= nums[i] <= 10^5
# 0 <= left <= right < nums.length
# At most 10^4 calls will be made to sumRange.
# 
# 
#

# @lc code=start
class NumArray:

    def __init__(self, nums: List[int]):    
      
        self.MAX_INT = 2**31-1
        self.src = nums
        self.len = len(nums)
        # Maximum size of segment tree
        self.total_nodes = 2 * (int)(2**(int)(ceil(log2(len(nums))))) - 1;
        self.tree = [0] * self.total_nodes
        self.dues = [0] * self.total_nodes
        self.build()

    def build(self) :
        self._build_tree(left=0, right=self.len-1, par=0)
                
    def _build_tree(self, left, right, par):
        if left == right:
            self.tree[par] = self.src[left]
            return
        div = (left + right)//2
        self._build_tree(left, div, (par<<1)+1)
        self._build_tree(div+1, right, (par<<1)+2)
        self.tree[par]=self._combine(self.tree[(par<<1)+1], self.tree[(par<<1)+2])
  
    def _query(self, low, high, left, right, par):
              
        if self.dues[par] > 0:
            self.tree[par] += self.dues[par]
            if left is not right:
                self.dues[(par<<1)+1] += self.dues[par]
                self.dues[(par<<1)+2] += self.dues[par]
            self.dues[par]=0;
            
        if low <= left and high >= right:
            return self.tree[par]
        
        div = int((right+left)/2)
        
        if low > div or high < left:
            return self._query(low, high, div+1, right, (par<<1)+2)      
        if low > right or high < div+1:
            return self._query(low, high, left, div, (par<<1)+1)
          
        return self._combine(self._query(low, high, left, div, (par<<1)+1),
                  self._query(low, high, div+1, right, (par<<1)+2) )
        
    def _combine(self,x,y): 
        return x + y
      
    def sumRange(self, left: int, right: int) -> int:
        return self._query(left, right, 0, self.len-1, 0);
  
    


# Your NumArray object will be instantiated and called as such:
# obj = NumArray(nums)
# param_1 = obj.sumRange(left,right)
# @lc code=end

