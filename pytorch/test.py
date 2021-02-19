class TrieNode: 
      
    # Trie node class 
    def __init__(self): 
        self.children = [None]*26
  
        # isEndOfWord is True if node represent the end of the word 
        self.isEndOfWord = False
  
class Trie: 
      
    # Trie data structure class 
    def __init__(self): 
        self.root = self.getNode() 
  
    def getNode(self): 
      
        # Returns new trie node (initialized to NULLs) 
        return TrieNode() 
  
    def _charToIndex(self,ch): 
          
        # private helper function 
        # Converts key current character into index 
        # use only 'a' through 'z' and lower case 
          
        return ord(ch)-ord('a') 
  
  
    def insert(self,key): 
          
        # If not present, inserts key into trie 
        # If the key is prefix of trie node,  
        # just marks leaf node 
        pCrawl = self.root 
        length = len(key) 
        for char in key: 
            index = self._charToIndex(char) 
            if not pCrawl.children[index]: 
                pCrawl.children[index] = self.getNode() 
            pCrawl = pCrawl.children[index] 
  
        # mark last node as leaf 
        pCrawl.isEndOfWord = True
  
    def match(self,key):
        pCrawl = self.root
        sent = ""
        for i in range(len(key)):
            index = self._charToIndex(key[i])
            sent += key[i]
            if(pCrawl.isEndOfWord):
                sent += " " + match(key[i:])




        while(pCrawl):
            sent = ""


            sent = ""
            for ind in range(begin,len(key)):
                index = self._charToIndex(key[ind]) 

            begin = ind
            pCrawl = pCrawl.children[index] 
        # for char in key:
        #     index = self._charToIndex(char)
        #     sent += char
        #     if pCrawl.isEndOfWord:
        #         sent += " "

            for ind in range(begin,len(key)):
                index = self._charToIndex(key[ind]) 
                if pCrawl.isEndOfWord: 
                    if(ind == len(key) - 1):
                        print(sent)
                        sent = ""
                    else:
                        sent += " "
                        pCrawl = self.root
                pCrawl = pCrawl.children[index] 
                sent += key[ind]

        return sent 
  

    def search(self, key): 
          
        # Search key in the trie 
        # Returns true if key presents  
        # in trie, else false 
        pCrawl = self.root 
        # while(pCrawl != None ):        
        

        
        sent = ""
        for char in key:
            index = self._charToIndex(char) 
            if pCrawl.isEndOfWord: 
                sent += " "
                pCrawl = self.root
            pCrawl = pCrawl.children[index] 
            sent += char

        return sent 
  
keys = ["cat", "cats", "and", "sand", "dog"]
output = ["Not present in trie", 
            "Present in trie"] 

# Trie object 
t = Trie() 

# Construct trie 
for key in keys: 
    t.insert(key) 
  
    # Search for different keys 
    print("{} ---- {}".format("the",output[t.search("the")])) 
    print("{} ---- {}".format("these",output[t.search("these")])) 
    print("{} ---- {}".format("their",output[t.search("their")])) 
    print("{} ---- {}".format("thaw",output[t.search("thaw")])) 


res = []
def findSpace(dict, seq,out=""):
    global res 
    if not seq:
        res.append(out)
        return res
    for i in range(1,len(seq)+1):
        prefix = seq[:i]
        if prefix in dict:
            findSpace(dict,seq[i:],out + " "+ prefix)

    return res

