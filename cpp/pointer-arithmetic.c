#include <stdio.h>
#include <stdlib.h>
void process()
{
    // MEMORY LAYOUT
    // Higher addresses
    // ┌──────────────────────────────┐
    // │           Stack (↓ grow)     │  R/W, có guard page
    // ├──────────────────────────────┤
    // │        Mapped regions        │  .so, mmap(file), JIT code…
    // ├──────────────────────────────┤
    // │            Heap (↑ grow)     │  R/W; quản lý bởi malloc/new (brk/mmap)
    // ├──────────────────────────────┤
    // │ .bss (zero-inited), .data    │  R/W
    // │ .rodata (hằng)               │  R
    // │ .text (code)                 │  R/X (không W) — có thể share giữa process
    // ├──────────────────────────────┤
    // │           … (khác)           │
    // └──────────────────────────────┘
    // Lower addresses

    // int a = 10;
    // int b = 20;
    // printf("Address of a: %p\n", (void*)&a);
    // printf("Address of b: %p\n", (void*)&b);

    // // Arr values store in heap (indirect access): upward--> increase address
    // int* arr = malloc(3 * sizeof(int));
    // arr[0] = 10;
    // arr[1] = 20;
    // arr[2] = 30;
    // printf("0 = %p\n", &arr[0]); // 0x138e05dc0
    // printf("1 = %p\n", &arr[1]); // 0x138e05dc4
    // printf("2 = %p\n", &arr[2]); // 0x138e05dc8

    // // Static arr values store in stack --> increase address ??
    // int arr[3] = {10, 20, 30};
    // printf("0 = %p\n", &arr[0]); // 0x16dc9ebb8
    // printf("1 = %p\n", &arr[1]); // 0x16dc9ebbc
    // printf("2 = %p\n", &arr[2]); // 0x16dc9ebc0

    // int *p = &arr[1];
    // p--;
    // *p = 1;
    // printf("0 = %d\n", arr[0]);
    // printf("1 = %d\n", arr[1]);
    // printf("2 = %d\n", arr[2]);
    // free(arr);

    // // a, b, c values store in stack (direct access): downward --> decrease address
    // int a = 10;
    // int b = 20;
    // int c = 30;
    // printf("Address of a: %p\n", (void*)&a); // 0x16b082bcc
    // printf("Address of b: %p\n", (void*)&b); // 0x16b082bc8
    // printf("Address of c: %p\n", (void*)&c); // 0x16b082bc4
    // int *p = &b;
    // p--;
    // *p = 1;
    // printf("a = %d\n", a);
    // printf("b = %d\n", b);
    // printf("c = %d\n", c);
}
int main()
{
    process();
    return 0;
}
