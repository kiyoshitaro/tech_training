#
# @lc app=leetcode id=460 lang=python3
#
# [460] LFU Cache
#
# https://leetcode.com/problems/lfu-cache/description/
#
# algorithms
# Hard (45.16%)
# Likes:    5798
# Dislikes: 334
# Total Accepted:    275.5K
# Total Submissions: 608.6K
# Testcase Example:  '["LFUCache","put","put","get","put","get","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]'
#
# Design and implement a data structure for a Least Frequently Used (LFU)
# cache.
# 
# Implement the LFUCache class:
# 
# 
# LFUCache(int capacity) Initializes the object with the capacity of the data
# structure.
# int get(int key) Gets the value of the key if the key exists in the cache.
# Otherwise, returns -1.
# void put(int key, int value) Update the value of the key if present, or
# inserts the key if not already present. When the cache reaches its capacity,
# it should invalidate and remove the least frequently used key before
# inserting a new item. For this problem, when there is a tie (i.e., two or
# more keys with the same frequency), the least recently used key would be
# invalidated.
# 
# 
# To determine the least frequently used key, a use counter is maintained for
# each key in the cache. The key with the smallest use counter is the least
# frequently used key.
# 
# When a key is first inserted into the cache, its use counter is set to 1 (due
# to the put operation). The use counter for a key in the cache is incremented
# either a get or put operation is called on it.
# 
# The functions get and put must each run in O(1) average time complexity.
# 
# 
# Example 1:
# 
# 
# Input
# ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get",
# "get"]
# [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
# Output
# [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
# 
# Explanation
# // cnt(x) = the use counter for key x
# // cache=[] will show the last used order for tiebreakers (leftmost element
# is  most recent)
# LFUCache lfu = new LFUCache(2);
# lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
# lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
# lfu.get(1);      // return 1
# ⁠                // cache=[1,2], cnt(2)=1, cnt(1)=2
# lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest,
# invalidate 2.
# // cache=[3,1], cnt(3)=1, cnt(1)=2
# lfu.get(2);      // return -1 (not found)
# lfu.get(3);      // return 3
# ⁠                // cache=[3,1], cnt(3)=2, cnt(1)=2
# lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate
# 1.
# ⁠                // cache=[4,3], cnt(4)=1, cnt(3)=2
# lfu.get(1);      // return -1 (not found)
# lfu.get(3);      // return 3
# ⁠                // cache=[3,4], cnt(4)=1, cnt(3)=3
# lfu.get(4);      // return 4
# ⁠                // cache=[4,3], cnt(4)=2, cnt(3)=3
# 
# 
# 
# Constraints:
# 
# 
# 1 <= capacity <= 10^4
# 0 <= key <= 10^5
# 0 <= value <= 10^9
# At most 2 * 10^5 calls will be made to get and put.
# 
# 
# 
# 
#

# @lc code=start
class LFUCache:

    class Node:
        def __init__(self, value):
            self.value = value
            self.freq = 1
    class DoublyLinkedListWithHashmap:
        class NodeDDL:
            def __init__(self, key):
                self.next = None
                self.prev = None
                self.key = key
        def __init__(self):
            self.head = self.NodeDDL(0)
            self.tail = self.NodeDDL(0)
            self.head.next = self.tail
            self.tail.prev = self.head
            self.map = {}
        def size(self):
            return len(self.map)
        def insert(self, key):
            new_node = self.NodeDDL(key)
            self.head.next.prev = new_node
            new_node.next = self.head.next
            new_node.prev = self.head
            self.head.next = new_node
            self.map[key] = new_node
        def remove(self, key):
            node = self.map[key]
            node.prev.next = node.next
            node.next.prev = node.prev
            del self.map[key]
        def removeLast(self):
            node = self.tail.prev
            node.prev.next = self.tail
            self.tail.prev = node.prev
            del self.map[node.key]
            return node.key
    def __init__(self, capacity: int):
        self.cache = {}
        self.capacity = capacity
        self.freqMap = {}
        self.minFreq = 1

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            newFreq = node.freq + 1
            if node.freq in self.freqMap:
                self.freqMap[node.freq].remove(key)
                if self.freqMap[node.freq].size() == 0:
                    del self.freqMap[node.freq]
                    self.minFreq = newFreq
            node.freq = newFreq      
            if node.freq not in self.freqMap:
              self.freqMap[node.freq] = self.DoublyLinkedListWithHashmap()
            self.freqMap[node.freq].insert(key)
            return node.value
        else:
            return -1



# Your LFUCache object will be instantiated and called as such:
# obj = LFUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
# @lc code=end

