#
# @lc app=leetcode id=783 lang=python3
#
# [783] Minimum Distance Between BST Nodes
#
# https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/
#
# algorithms
# Easy (59.88%)
# Likes:    3528
# Dislikes: 424
# Total Accepted:    271.2K
# Total Submissions: 452.1K
# Testcase Example:  '[4,2,6,1,3]'
#
# Given the root of a Binary Search Tree (BST), return the minimum difference
# between the values of any two different nodes in the tree.
# 
# 
# Example 1:
# 
# 
# Input: root = [4,2,6,1,3]
# Output: 1
# 
# 
# Example 2:
# 
# 
# Input: root = [1,0,48,null,null,12,49]
# Output: 1
# 
# 
# 
# Constraints:
# 
# 
# The number of nodes in the tree is in the range [2, 100].
# 0 <= Node.val <= 10^5
# 
# 
# 
# Note: This question is the same as 530:
# https://leetcode.com/problems/minimum-absolute-difference-in-bst/
# 
#

# @lc code=start
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDiffInBST(self, root: Optional[TreeNode]) -> int:
        # NOTE: inorder traversal keep order + tail recursion
        def inorder(node):
            if not node:
                return []
            left = inorder(node.left)
            right = inorder(node.right)
            return left + [node.val] + right
        arr = inorder(root)
        minDiff = float(inf)
        for i in range(1,len(arr)):
            new = arr[i] - arr[i-1]
            if(minDiff > new):
                minDiff = new
        return minDiff
            
        
# @lc code=end

