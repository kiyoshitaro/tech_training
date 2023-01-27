#
# @lc app=leetcode id=142 lang=python3
#
# [142] Linked List Cycle II
#
# https://leetcode.com/problems/linked-list-cycle-ii/description/
#
# algorithms
# Medium (46.38%)
# Likes:    9456
# Dislikes: 664
# Total Accepted:    870.6K
# Total Submissions: 1.9M
# Testcase Example:  '[3,2,0,-4]\n1'
#
# Given the head of a linked list, return the node where the cycle begins. If
# there is no cycle, return null.
# 
# There is a cycle in a linked list if there is some node in the list that can
# be reached again by continuously following the next pointer. Internally, pos
# is used to denote the index of the node that tail's next pointer is connected
# to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as
# a parameter.
# 
# Do not modify the linked list.
# 
# 
# Example 1:
# 
# 
# Input: head = [3,2,0,-4], pos = 1
# Output: tail connects to node index 1
# Explanation: There is a cycle in the linked list, where tail connects to the
# second node.
# 
# 
# Example 2:
# 
# 
# Input: head = [1,2], pos = 0
# Output: tail connects to node index 0
# Explanation: There is a cycle in the linked list, where tail connects to the
# first node.
# 
# 
# Example 3:
# 
# 
# Input: head = [1], pos = -1
# Output: no cycle
# Explanation: There is no cycle in the linked list.
# 
# 
# 
# Constraints:
# 
# 
# The number of the nodes in the list is in the range [0, 10^4].
# -10^5 <= Node.val <= 10^5
# pos is -1 or a valid index in the linked-list.
# 
# 
# 
# Follow up: Can you solve it using O(1) (i.e. constant) memory?
# 
#

# @lc code=start
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

        # x = initial list size before cycle
        # y = circle size
        # when met at m of y: x+hy+m = 2(x+ty+m) ==> (x+m) mod y = 0
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        fast = head
        slow = head
        _flag = False
        while fast and fast.next and slow:
            fast = fast.next.next
            slow = slow.next
            if slow == fast:
                _flag = True
                break
        if not _flag:
            return None
        _tmp = head
        while(_tmp):
            if _tmp == slow:
                break
            _tmp = _tmp.next
            slow = slow.next
        return slow
            
# @lc code=end

