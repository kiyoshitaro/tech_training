#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 100000000

int main()
{
    int *arr = malloc(N * sizeof(int));
    if (!arr)
    {
        printf("Không đủ bộ nhớ!\n");
        return 1;
    }

    // Khởi tạo mảng
    for (int i = 0; i < N; i++)
    {
        arr[i] = 1;
    }

    long long sum = 0;
    clock_t start, end;
    double time_normal, time_unroll;

    // Vòng lặp thường
    start = clock();
    for (int i = 0; i < N; i++)
    {
        sum += arr[i];
    }
    end = clock();
    time_normal = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Normal loop:   %.6f giây, sum=%lld\n", time_normal, sum);

    sum = 0;

    // Vòng lặp unrolled (8 bước mỗi vòng)
    // Loop unrolling: xử lý nhiều phần tử trong một vòng,
    // giảm số lần tăng biến đếm và kiểm tra điều kiện.
    // Bản chất: cắt giảm overhead của vòng lặp, giữ nguyên O(n),
    // nhưng tận dụng CPU tốt hơn để chạy nhanh hơn.

    start = clock();
    for (int i = 0; i < N; i += 8)
    {
        sum += arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3] + arr[i + 4] + arr[i + 5] + arr[i + 6] + arr[i + 7];
    }
    end = clock();
    time_unroll = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Unrolled loop: %.6f giây, sum=%lld\n", time_unroll, sum);

    free(arr);
    return 0;
}
// Normal loop:   0.087768 giây, sum=100000000
// Unrolled loop: 0.031261 giây, sum=100000000