#
# @lc app=leetcode id=1268 lang=python3
#
# [1268] Search Suggestions System
#
# https://leetcode.com/problems/search-suggestions-system/description/
#
# algorithms
# Medium (65.09%)
# Likes:    4803
# Dislikes: 245
# Total Accepted:    342.5K
# Total Submissions: 526.3K
# Testcase Example:  '["mobile","mouse","moneypot","monitor","mousepad"]\n"mouse"'
#
# You are given an array of strings products and a string searchWord.
# 
# Design a system that suggests at most three product names from products after
# each character of searchWord is typed. Suggested products should have common
# prefix with searchWord. If there are more than three products with a common
# prefix return the three lexicographically minimums products.
# 
# Return a list of lists of the suggested products after each character of
# searchWord is typed.
# 
# 
# Example 1:
# 
# 
# Input: products = ["mobile","mouse","moneypot","monitor","mousepad"],
# searchWord = "mouse"
# Output:
# [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
# Explanation: products sorted lexicographically =
# ["mobile","moneypot","monitor","mouse","mousepad"].
# After typing m and mo all products match and we show user
# ["mobile","moneypot","monitor"].
# After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
# 
# 
# Example 2:
# 
# 
# Input: products = ["havana"], searchWord = "havana"
# Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
# Explanation: The only word "havana" will be always suggested while typing the
# search word.
# 
# 
# 
# Constraints:
# 
# 
# 1 <= products.length <= 1000
# 1 <= products[i].length <= 3000
# 1 <= sum(products[i].length) <= 2 * 10^4
# All the strings of products are unique.
# products[i] consists of lowercase English letters.
# 1 <= searchWord.length <= 1000
# searchWord consists of lowercase English letters.
# 
# 
#

# @lc code=start
class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        class TrieNode:
            def __init__(self):
                self.children = {}
                self.endWord = False
        class Trie:
            def __init__(self):
                self.root = TrieNode()
            def insert(self, word: str):
                curr = self.root
                for c in word:
                    if c not in curr.children:
                        curr.children[c] = TrieNode()
                    curr = curr.children[c]
                curr.endWord = True
            def search (self, word: str):
                curr = self.root
                for c in word:
                    if c not in curr.children:
                        return []
                    curr = curr.children[c]
                res = []
                priorityQ = [(word, curr)]
                while priorityQ and len(res) < 3:
                    # word, curr = heapq.heappop(priorityQ)
                    word, curr = priorityQ[0]
                    if curr.endWord:
                        res.append(word)
                    for c in sorted(curr.children.keys()): # curr.children:
                        priorityQ.append([(word+c, curr.children[c])])
                        # heapq.heappush(priorityQ, (word+c, curr.children[c]))
                return res
        trie = Trie()
        for word in products:
            trie.insert(word)
        res = []
        for w in range(len(searchWord)):
            res.append(trie.search(searchWord[:w+1]))
        return res
# @lc code=end

