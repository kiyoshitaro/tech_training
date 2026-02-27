#define _POSIX_C_SOURCE 199309L
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <time.h>

#define N (50 * 1000 * 1000) // 50 triệu phần tử
#define THRESHOLD 128

static uint8_t *data;

static double now_sec()
{
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec * 1e-9;
}

int cmp_uint8(const void *a, const void *b)
{
    return *(uint8_t *)a - *(uint8_t *)b;
}

uint64_t sum_branch(uint8_t *arr, size_t n)
{
    uint64_t sum = 0;
    for (size_t i = 0; i < n; ++i)
    {
        if (arr[i] >= THRESHOLD)
            sum += arr[i];
    }
    return sum;
}

uint64_t sum_branchless(uint8_t *arr, size_t n)
{
    uint64_t sum = 0;
    for (size_t i = 0; i < n; ++i)
    {
        // mask = 0xFF nếu >=128, =0 nếu <128
        int t = (int)arr[i] - THRESHOLD;
        t >>= 31;
        uint8_t mask = (uint8_t)(~t);
        sum += mask & arr[i];
    }
    return sum;
}

int main()
{
    data = malloc(N);
    if (!data)
    {
        printf("alloc failed\n");
        return 1;
    }

    // random data
    for (size_t i = 0; i < N; ++i)
        data[i] = rand() % 256;

    double t1, t2;
    uint64_t s;

    // 1. random + branch
    t1 = now_sec();
    s = sum_branch(data, N);
    t2 = now_sec();
    printf("Random + branch     : %.3f s (sum=%llu)\n", t2 - t1, (unsigned long long)s);

    t1 = now_sec();
    s = sum_branchless(data, N);
    t2 = now_sec();
    printf("Random + branchless : %.3f s (sum=%llu)\n", t2 - t1, (unsigned long long)s);

    // 2. sorted + branch
    qsort(data, N, 1, cmp_uint8);
    t1 = now_sec();
    s = sum_branch(data, N);
    t2 = now_sec();
    printf("Sorted + branch     : %.3f s (sum=%llu)\n", t2 - t1, (unsigned long long)s);

    free(data);
    return 0;
}
// gcc -O3 -march=native -o br branch-prediction.c
// ./br

// gcc -O3 -march=native -S branch-prediction.c // --> Compile ra assembly
// Compiler đã tự biến if thành branchless
// Predictor hiện đại cực kỳ mạnh
// - predictor nhiều tầng
// - history table lớn
