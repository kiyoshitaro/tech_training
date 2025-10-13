#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 500000000

int main() {
    int *values = malloc(SIZE * sizeof(int));
    // int values[SIZE]; -> segmentation fault: 500000000 * 4 bytes = 2Gb >> limit stack memory ~mb
    for (int i = 0; i < SIZE; i++) {
        values[i] = i;
    }

    // Case 1: Pointer chasing
    int **ptr_array = malloc(SIZE * sizeof(int *));
    for (int i = 0; i < SIZE; i++) {
        ptr_array[i] = &values[i];
    }

    clock_t start1 = clock();
    long long sum1 = 0;
    for (int i = 0; i < SIZE; i++) {
        sum1 += *ptr_array[i];  // dereference
    }
    clock_t end1 = clock();

    // Case 2: Contiguous access
    clock_t start2 = clock();
    long long sum2 = 0;
    for (int i = 0; i < SIZE; i++) {
        sum2 += values[i];
    }
    clock_t end2 = clock();

    printf("Sum1 (dereference): %lld, Time: %.2f ms\n", sum1, 1000.0 * (end1 - start1) / CLOCKS_PER_SEC); // 1245.37 ms
    printf("Sum2 (direct access): %lld, Time: %.2f ms\n", sum2, 1000.0 * (end2 - start2) / CLOCKS_PER_SEC); // 497.86 ms

    free(values);
    free(ptr_array);
    return 0;

    // Explanation: Tại sao access vec qua pointer lại chậm hơn
    // Memory access: 
    // - Các Kiểu truy cập: pointer chase (*ptr), arr[i], heap (malloc) đều phát sinh memory access
    // - Không phát sinh khi data đã sẵn trong Register/L1 khi CPU load vào => Hằng số (add eax, 42), stack (1 số khi cache locality rất tốt)
    // - khi có mem acess thì OS phải làm dịch từ virtual address sang physical address, rồi mới đọc từ memory vào register / cache
    // - Pointer chase chậm do dễ bị: TLB miss, Cache miss, Page fault do các vùng nhớ nếu cấp phát kiểu này sẽ nằm rời rạc -> cache locality kém

}
