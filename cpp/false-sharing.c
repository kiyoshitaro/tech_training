#define _POSIX_C_SOURCE 199309L
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <stdint.h>
#include <time.h>

#define NUM_THREADS 8
#define NUM_ITER 2147483647

// ----------------------
// FALSE SHARING
// ----------------------
// Các biến counter nằm sát nhau trong bộ nhớ.
// Nhiều thread cùng cập nhật các biến này -> chung cache line -> false sharing.
typedef struct
{
    int counter;
} SharedData;

SharedData shared[NUM_THREADS];

// ----------------------
// TRÁNH FALSE SHARING
// ----------------------
// thêm padding để mỗi biến nằm trên cache line riêng biệt.
// Giả sử cache line = 64 byte, ta chèn thêm 60 byte.
typedef struct
{
    int counter;
    char padding[60]; // đảm bảo mỗi struct chiếm 64 byte
} PaddedData;

PaddedData padded[NUM_THREADS];

double get_time_sec()
{
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec / 1e9;
}

// ----------------------
// Worker cho false sharing
// ----------------------
void *worker_false(void *arg)
{
    int id = *(int *)arg;
    for (int i = 0; i < NUM_ITER; i++)
    {
        shared[id].counter++;
    }
    return NULL;
}

// ----------------------
// Worker cho tránh false sharing
// ----------------------
void *worker_padded(void *arg)
{
    int id = *(int *)arg;
    for (int i = 0; i < NUM_ITER; i++)
    {
        padded[id].counter++;
    }
    return NULL;
}

int main()
{
    pthread_t threads[NUM_THREADS];
    int ids[NUM_THREADS];

    // ----------------------
    // Test FALSE SHARING
    // ----------------------
    double start = get_time_sec();
    for (int i = 0; i < NUM_THREADS; i++)
    {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker_false, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }
    double end = get_time_sec();
    printf("False sharing time: %.8f sec\n", end - start);

    // ----------------------
    // Test TRÁNH FALSE SHARING
    // ----------------------
    start = get_time_sec();
    for (int i = 0; i < NUM_THREADS; i++)
    {
        ids[i] = i;
        pthread_create(&threads[i], NULL, worker_padded, &ids[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }
    end = get_time_sec();
    printf("Padded (no false sharing) time: %.8f sec\n", end - start);

    return 0;
}

// False sharing là một hiện tượng trong multi-threading khiến chương trình chạy chậm đi,
// do nhiều biến nằm chung trong một cache line (64 byte)
// và các luồng khác nhau cùng truy cập các biến riêng của nó,
// nhưng CPU vẫn phải đồng bộ toàn bộ cache line
// sau từng luồng chạy CPU vẫn phải đồng bộ toàn bộ cache line
// làm luồng kia phải load lại block dù dùng biến khác không ảnh hưởng

// ==> mất thêm thời gian đồng bộ, giảm hiệu năng.
// gcc -O2 -pthread false-sharing.c -o fs
// ./fs