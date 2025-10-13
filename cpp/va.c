#include <stdio.h>
#include <stdlib.h>

int main(){
    printf("location of code: %p\n", main);
    printf("location of heap: %p\n", malloc(100e6));
    int x = 3;
    printf("location of stack: %p\n", &x);
    return 0;
}

// if run concurrent: ./va & ./va we can see the same address
// Each process have its own virtual address space 
// a memory reference in 1 process not affect to address space of other processes
