#
# @lc app=leetcode id=22 lang=python3
#
# [22] Generate Parentheses
#

# @lc code=start
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        stack = []
        res = []
        def backtrack(lo, hi):
            if(lo == n and hi == n):
                res.append("".join(stack))
                return
            if(lo< n):
                stack.append("(")
                backtrack(lo+1,hi)
                stack.pop()
            if(hi<lo):
                stack.append(")")
                backtrack(lo,hi+1)
                stack.pop()
        backtrack(0,0)
        return res
        
# @lc code=end

