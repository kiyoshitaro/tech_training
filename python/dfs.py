from collections import defaultdict

class Graph:

    def __init__(self):
        self.graph = defaultdict(list)
        self.visited = [False]*(len(self.graph))
        # self.stack = []


    def addEdge(self, u,v):
        self.graph[u].append(v)

    def dfsInit(self, s,visited,stack):
        count = int(not stack==[]) 
        visited[s] = True
        stack.append(s)
        print(s)
        while(stack):
            for i in self.graph[s]:
                if (visited[i] == False):
                    count += 1
                    self.dfsInit(i,visited,stack)
            
            
            if(count == 1):
                stack.pop(len(stack)-1)


    def dfs(self,s):
        visited = [False]*(len(self.graph))
        stack = []
        self.dfsInit(s,visited,stack)



    
g = Graph()
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(1, 4)
g.addEdge(2, 4)
g.addEdge(3, 4)
g.addEdge(3, 5)
g.addEdge(4, 5)
 
g.dfs(0)
            

# Python program to print DFS traversal from a
# given given graph
# from collections import defaultdict
 
# # This class represents a directed graph using
# # adjacency list representation
# class Graph:
 
#     # Constructor
#     def __init__(self):
 
#         # default dictionary to store graph
#         self.graph = defaultdict(list)
 
#     # function to add an edge to graph
#     def addEdge(self,u,v):
#         self.graph[u].append(v)
 
#     # A function used by DFS
#     def DFSUtil(self,v,visited):
 
#         # Mark the current node as visited and print it
#         visited[v]= True
#         print(v)
 
#         # Recur for all the vertices adjacent to this vertex
#         for i in self.graph[v]:
#             if visited[i] == False:
#                 self.DFSUtil(i, visited)
 
 
#     # The function to do DFS traversal. It uses
#     # recursive DFSUtil()
#     def DFS(self,v):
 
#         # Mark all the vertices as not visited
#         visited = [False]*(len(self.graph))
 
#         # Call the recursive helper function to print
#         # DFS traversal
#         self.DFSUtil(v,visited)
 
 
# # Driver code
# # Create a graph given in the above diagram
# g = Graph()
# g.addEdge(0, 1)
# g.addEdge(0, 2)
# g.addEdge(1, 3)
# g.addEdge(1, 4)
# g.addEdge(2, 4)
# g.addEdge(3, 4)
# g.addEdge(3, 5)
# g.addEdge(4, 5)


 
# g.DFS(0)
 
# # This code is contributed by Neelam Yadav
                

        

