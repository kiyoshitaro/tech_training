import math
def bigSum(x,y):
    c = 0
    res = 0
    for i in range(int(math.log(max(x,y)))):
        tmp = x%10 + y%10 +c 
        if(tmp > 9):
            c = 1
        else:
            c = 0
        tmp = tmp%10
        x = x//10
        y = y//10
        res = tmp*(10**i) + res
    return res

