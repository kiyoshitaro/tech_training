#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 100000000  

// Tìm kiếm tuyến tính thông thường
int linear_search(int *arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// Sentinel search: bỏ kiểm tra i < n, chỉ so sánh giá trị.
// loại bỏ kiểm tra biên, giảm số lần so sánh, giữ nguyên logic O(n) nhưng chạy gọn hơn
int sentinel_search(int *arr, int n, int target) {
    int last = arr[n-1];
    arr[n-1] = target;  // đặt sentinel

    int i = 0;
    while (arr[i] != target) i++;

    arr[n-1] = last;    // khôi phục giá trị cuối
    if (i < n-1 || arr[n-1] == target) return i;
    return -1;
}

int main() {
    int *arr = malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) {
        arr[i] = rand();
    }

    int target = -1;
    clock_t start, end;
    double time_linear, time_sentinel;
    start = clock();
    int idx1 = linear_search(arr, N, target);
    end = clock();
    time_linear = (double)(end - start) / CLOCKS_PER_SEC;

    start = clock();
    int idx2 = sentinel_search(arr, N, target);
    end = clock();
    time_sentinel = (double)(end - start) / CLOCKS_PER_SEC;

    printf("Linear search:   %.6f giây (kết quả %d)\n", time_linear, idx1);
    printf("Sentinel search: %.6f giây (kết quả %d)\n", time_sentinel, idx2);
    // Linear search:   0.103976 giây (kết quả -1)
    // Sentinel search: 0.050898 giây (kết quả -1)
    free(arr);
    return 0;
}
