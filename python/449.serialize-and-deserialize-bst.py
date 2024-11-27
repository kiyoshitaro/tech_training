#
# @lc app=leetcode id=449 lang=python3
#
# [449] Serialize and Deserialize BST
#
# https://leetcode.com/problems/serialize-and-deserialize-bst/description/
#
# algorithms
# Medium (58.05%)
# Likes:    3514
# Dislikes: 173
# Total Accepted:    244.9K
# Total Submissions: 421.7K
# Testcase Example:  '[2,1,3]'
#
# Serialization is converting a data structure or object into a sequence of
# bits so that it can be stored in a file or memory buffer, or transmitted
# across a network connection link to be reconstructed later in the same or
# another computer environment.
# 
# Design an algorithm to serialize and deserialize a binary search tree. There
# is no restriction on how your serialization/deserialization algorithm should
# work. You need to ensure that a binary search tree can be serialized to a
# string, and this string can be deserialized to the original tree structure.
# 
# The encoded string should be as compact as possible.
# 
# 
# Example 1:
# Input: root = [2,1,3]
# Output: [2,1,3]
# Example 2:
# Input: root = []
# Output: []
# 
# 
# Constraints:
# 
# 
# The number of nodes in the tree is in the range [0, 10^4].
# 0 <= Node.val <= 10^4
# The input tree is guaranteed to be a binary search tree.
# 
# 
#

# @lc code=start
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Codec:

    def serialize(self, root):
        def preorder(node):
            if not node:
                return "N"
            return str(node.val) + "," + preorder(node.left) + ',' + preorder(node.right)
        return preorder(root)

    def deserialize(self, data):
        def desPreorder(deque):
            if deque[0] == 'N':
                deque.popleft()
                return None
            node = TreeNode(int(deque[0]))
            deque.popleft()
            node.left = desPreorder(deque)
            node.right = desPreorder(deque)
            return node
        
        queue = collections.deque(data.split(','))
        return desPreorder(queue)
        

# Your Codec object will be instantiated and called as such:
# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# tree = ser.serialize(root)
# ans = deser.deserialize(tree)
# return ans
# @lc code=end

