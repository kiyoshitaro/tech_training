#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 50000

int main()
{
    int(*A)[N] = malloc(N * sizeof(*A)); // cấp phát mảng 2D liên tục

    // int** A = malloc(N * sizeof(int*));  // cấp phát mảng con trỏ dòng
    // for (int i = 0; i < N; ++i) {
    //     A[i] = malloc(N * sizeof(int)); // cấp phát từng dòng -> fragmentation
    // }
    clock_t start, end;
    double row_time, col_time;

    // Row-major traversal: i ngoài, j trong
    start = clock();
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            A[i][j] = i + j;
    end = clock();
    row_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Row-major time:    %.6f seconds\n", row_time); // 2.757703 seconds

    // Column-major traversal: j ngoài, i trong
    start = clock();
    for (int j = 0; j < N; ++j)
        for (int i = 0; i < N; ++i)
            A[i][j] = i + j;
    end = clock();
    col_time = (double)(end - start) / CLOCKS_PER_SEC;

    printf("Column-major time: %.6f seconds\n", col_time); // 10.048154 seconds

    // Explanation:
    // CPU xử lý hàng tỷ lệnh/giây + (RAM chậm hơn + độ trễ truy xuất có thể lên tới 100ns)
    // Cache line là đơn vị nhỏ nhất để cache (64 byte)
    // ==> Khi CPU truy xuất địa chỉ X, sẽ tải nguyên cả cache line chứa X vào cache (truy cập A[0], CPU sẽ tải A[0] đến A[15])
    // ==> row-major: cache hit more often than column-major

    free(A);
    return 0;
}
