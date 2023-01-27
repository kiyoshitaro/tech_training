#
# @lc app=leetcode id=705 lang=python3
#
# [705] Design HashSet
#
# https://leetcode.com/problems/design-hashset/description/
#
# algorithms
# Easy (65.93%)
# Likes:    2434
# Dislikes: 230
# Total Accepted:    264.1K
# Total Submissions: 400.7K
# Testcase Example:  '["MyHashSet","add","add","contains","contains","add","contains","remove","contains"]\n' +
  '[[],[1],[2],[1],[3],[2],[2],[2],[2]]'
#
# Design a HashSet without using any built-in hash table libraries.
# 
# Implement MyHashSet class:
# 
# 
# void add(key) Inserts the value key into the HashSet.
# bool contains(key) Returns whether the value key exists in the HashSet or
# not.
# void remove(key) Removes the value key in the HashSet. If key does not exist
# in the HashSet, do nothing.
# 
# 
# 
# Example 1:
# 
# 
# Input
# ["MyHashSet", "add", "add", "contains", "contains", "add", "contains",
# "remove", "contains"]
# [[], [1], [2], [1], [3], [2], [2], [2], [2]]
# Output
# [null, null, null, true, false, null, true, null, false]
# 
# Explanation
# MyHashSet myHashSet = new MyHashSet();
# myHashSet.add(1);      // set = [1]
# myHashSet.add(2);      // set = [1, 2]
# myHashSet.contains(1); // return True
# myHashSet.contains(3); // return False, (not found)
# myHashSet.add(2);      // set = [1, 2]
# myHashSet.contains(2); // return True
# myHashSet.remove(2);   // set = [1]
# myHashSet.contains(2); // return False, (already removed)
# 
# 
# Constraints:
# 
# 
# 0 <= key <= 10^6
# At most 10^4 calls will be made to add, remove, and contains.
# 
# 
#

# @lc code=start
class Node:
    
    def __init__(self, value, nextNode=None):
        self.val = value
        self.next = nextNode
        
class Bucket:
    
    def __init__(self):
        self.head = Node(0)
    
    def exists(self, val):
        cur = self.head.next
        while cur:
            if cur.val == val:
                return True
            cur = cur.next
        return False
    
    def insert(self, val):
        if not self.exists(val):
            node = Node(val, self.head.next)
            self.head.next = node
            
    def delete(self, val):
        pre = self.head
        cur = self.head.next
        while cur:
            if cur.val == val:
                pre.next = cur.next
                return
            pre = cur
            cur = cur.next

class MyHashSet:

    def __init__(self):
        """ Initialize your data structure here. """
        self.amountBucket = 999
        self.bucket = [Bucket() for i in range(self.amountBucket)]

    def _hash(self, key):
        return key % self.amountBucket
    
    def add(self, key: int) -> None:
        self.bucket[self._hash(key)].insert(key)

    def remove(self, key: int) -> None:
        self.bucket[self._hash(key)].delete(key)

    def contains(self, key: int) -> bool:
        """ Returns true if this set contains the specified element """
        return self.bucket[self._hash(key)].exists(key)
                


# Your MyHashSet object will be instantiated and called as such:
# obj = MyHashSet()
# obj.add(key)
# obj.remove(key)
# param_3 = obj.contains(key)
# @lc code=end

