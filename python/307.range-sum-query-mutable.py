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
        print(self.tree)
        return self._query(left, right, 0, self.len-1, 0);
  
    def update(self, index: int, val: int) -> None:
        return self._update_sum(1 , 0 , self.len - 1 , index , val)
  
    def _update_sum(self, v, low, high, pos, new_val):
        if low == high: 
            self.tree[v] = new_val
        else:
            div = int((low + high) / 2)
            if pos <= div:
                self._update_sum(v*2-1, low, div, pos, new_val)
            else: 
                self._update_sum(v*2, div+1, high, pos, new_val)
            self.tree[v] = self.tree[v*2] + self.tree[v*2+1]
            
    # def _update_range(self, low, high, value):
    #     return self._update(low, high, value, 0, self.len-1, 0)

    # def _update(self, low, high, value, left, right, par):
    #     if self.dues[par] > 0:
    #         self.tree[par] += self.dues[par]
    #         if left is not right:
    #             self.dues[(par<<1)+1] += self.dues[par]
    #             self.dues[(par<<1)+2] += self.dues[par]
    #         self.dues[par]=0;

    #     if low > right or high < left:
    #         return;

    #     if low <= left and high >= right:
    #         self.tree[par] += value
    #         if(left is not right):
    #             self.dues[(par<<1)+1] += value
    #             self.dues[(par<<1)+2] += value
    #         return

    #     div = (right+left)//2
    #     self._update(low, high, value, left, div, (par<<1)+1)
    #     self._update(low, high, value, div+1, right, (par<<1)+2)
        


# Your NumArray object will be instantiated and called as such:
# obj = NumArray(nums)
# obj.update(index,val)
# param_2 = obj.sumRange(left,right)
# @lc code=end

