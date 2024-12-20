#
# @lc app=leetcode id=146 lang=python3
#
# [146] LRU Cache
#
# https://leetcode.com/problems/lru-cache/description/
#
# algorithms
# Medium (43.58%)
# Likes:    21171
# Dislikes: 1083
# Total Accepted:    1.9M
# Total Submissions: 4.2M
# Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
#
# Design a data structure that follows the constraints of a Least Recently Used
# (LRU) cache.
# 
# Implement the LRUCache class:
# 
# 
# LRUCache(int capacity) Initialize the LRU cache with positive size
# capacity.
# int get(int key) Return the value of the key if the key exists, otherwise
# return -1.
# void put(int key, int value) Update the value of the key if the key exists.
# Otherwise, add the key-value pair to the cache. If the number of keys exceeds
# the capacity from this operation, evict the least recently used key.
# 
# 
# The functions get and put must each run in O(1) average time complexity.
# 
# 
# Example 1:
# 
# 
# Input
# ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
# [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
# Output
# [null, null, null, 1, null, -1, null, -1, 3, 4]
# 
# Explanation
# LRUCache lRUCache = new LRUCache(2);
# lRUCache.put(1, 1); // cache is {1=1}
# lRUCache.put(2, 2); // cache is {1=1, 2=2}
# lRUCache.get(1);    // return 1
# lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
# lRUCache.get(2);    // returns -1 (not found)
# lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
# lRUCache.get(1);    // return -1 (not found)
# lRUCache.get(3);    // return 3
# lRUCache.get(4);    // return 4
# 
# 
# 
# Constraints:
# 
# 
# 1 <= capacity <= 3000
# 0 <= key <= 10^4
# 0 <= value <= 10^5
# At most 2 * 10^5 calls will be made to get and put.
# 
# 
#

# @lc code=start
class LRUCache:
    class DoublyLinkedListWithHashmap:
        class Node:
            def __init__(self, key):
                self.next = None
                self.prev = None
                self.key = key
        def __init__(self):
            self.head = self.Node(0)
            self.tail = self.Node(0)
            self.head.next = self.tail
            self.tail.prev = self.head
            self.map = {}
        def insert(self, key):
            new_node = self.Node(key)
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
        self.dl = self.DoublyLinkedListWithHashmap()

    def get(self, key: int) -> int:
        if key in self.cache:
            self.dl.remove(key)
            self.dl.insert(key)
            return self.cache[key]
        else:
            return -1
        

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache[key] = value
            self.dl.remove(key)
            self.dl.insert(key)
        else:
            if len(self.cache) == self.capacity:
                self.cache.pop(self.dl.removeLast())
            self.cache[key] = value
            self.dl.insert(key)
            
        
    # def __init__(self, capacity: int):
    #   self.cache = {}
    #   self.capacity = capacity
    #   self.deq = deque()
        

    # def get(self, key: int) -> int:
    #   if key in self.cache:
    #     self.deq.remove(key)
    #     self.deq.append(key)
    #     return self.cache[key]
    #   else:
    #     return -1
        

    # def put(self, key: int, value: int) -> None:
    #   if key in self.cache:
    #     self.cache[key] = value
    #     self.deq.remove(key)
    #     self.deq.append(key)
    #   else:
    #     if len(self.cache) == self.capacity:
    #       self.cache.pop(self.deq.popleft())
    #     self.cache[key] = value
    #     self.deq.append(key)
        



# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
# @lc code=end

