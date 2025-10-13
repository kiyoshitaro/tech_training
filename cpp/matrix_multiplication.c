#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define N 512         // Kích thước ma trận vuông
#define BLOCK 64      // Kích thước khối cho block multiplication

// ==========================
// 1. Naive Matrix Multiplication
// ==========================
// Kiến trúc máy tính:
// - Truy cập A[i][k] theo hàng → tốt cho cache (row-major).
// - Truy cập B[k][j] theo cột → cache miss vì không liên tục trong bộ nhớ.
// - CPU cache line thường là 64 byte → nếu truy cập không tuần tự, cache không hiệu quả.
//
// Hệ điều hành:
// - Mỗi lần cache miss → CPU phải truy xuất từ RAM (qua MMU).
// - Nếu bộ nhớ bị phân mảnh hoặc paging → hiệu năng càng tệ.
void matmul_naive(int A[N][N], int B[N][N], int C[N][N]) {
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) {
            int sum = 0;
            for (int k = 0; k < N; k++)
                sum += A[i][k] * B[k][j];  // Truy cập B theo cột → locality kém
            C[i][j] = sum;
        }
}

// ==========================
// 2. Transpose B để cải thiện locality
// ==========================
// Kiến trúc máy tính:
// - Transpose B → biến truy cập cột thành truy cập hàng.
// - Truy cập BT[j][k] → liên tục trong bộ nhớ → tận dụng cache tốt hơn.
// - Giảm cache miss → tăng hiệu năng.
//
// Hệ điều hành:
// - Transpose tốn thêm RAM, nhưng nếu cấp phát liên tục → OS giúp prefetch hiệu quả.
// - Không cần syscall hay context switch → hoạt động hoàn toàn trong user space.
void transpose(int B[N][N], int BT[N][N]) {
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            BT[j][i] = B[i][j];  // Chuyển cột thành hàng
}

void matmul_transposed(int A[N][N], int B[N][N], int C[N][N]) {
    int BT[N][N];
    transpose(B, BT);

    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) {
            int sum = 0;
            for (int k = 0; k < N; k++)
                sum += A[i][k] * BT[j][k];  // Truy cập tuần tự cả A và BT
            C[i][j] = sum;
        }
}

// ==========================
// 3. Block Matrix Multiplication (Tiling)
// ==========================
// Kiến trúc máy tính:
// - Chia ma trận thành khối nhỏ → mỗi khối vừa với cache L1/L2.
// - Truy cập dữ liệu trong khối → locality cực tốt.
// - Giảm cache miss, tăng hit rate → hiệu năng cao.
//
// Hệ điều hành:
// - OS cấp phát vùng nhớ liên tục cho khối → giảm page fault.
// - Không cần context switch, nhưng nếu chạy đa luồng → cần pin CPU để tránh migration.
void matmul_blocked(int A[N][N], int B[N][N], int C[N][N]) {
    memset(C, 0, sizeof(int) * N * N);  // Khởi tạo C = 0

    for (int ii = 0; ii < N; ii += BLOCK)
        for (int jj = 0; jj < N; jj += BLOCK)
            for (int kk = 0; kk < N; kk += BLOCK)
                for (int i = ii; i < ii + BLOCK && i < N; i++)
                    for (int j = jj; j < jj + BLOCK && j < N; j++) {
                        int sum = C[i][j];
                        for (int k = kk; k < kk + BLOCK && k < N; k++)
                            sum += A[i][k] * B[k][j];  // Truy cập trong khối → cache locality tốt
                        C[i][j] = sum;
                    }
}

// ==========================
// Utility: In ma trận (giới hạn kích thước nhỏ)
// ==========================
void print_matrix(int M[N][N]) {
    for (int i = 0; i < (N < 8 ? N : 8); i++) {
        for (int j = 0; j < (N < 8 ? N : 8); j++)
            printf("%4d ", M[i][j]);
        printf("\n");
    }
    printf("...\n");
}

// ==========================
// Benchmark thời gian chạy
// ==========================
void benchmark(void (*func)(int[N][N], int[N][N], int[N][N]), const char *label, int A[N][N], int B[N][N]) {
    int C[N][N];
    clock_t start = clock();
    func(A, B, C);
    clock_t end = clock();
    double time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("%s: %.3f seconds\n", label, time);
    print_matrix(C);
}

// ==========================
// Main: So sánh 3 phương pháp
// ==========================
int main() {
    int A[N][N], B[N][N];

    // Khởi tạo A và B với giá trị đơn giản
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) {
            A[i][j] = i + j;
            B[i][j] = i - j;
        }

    benchmark(matmul_naive,      "Naive Multiplication",      A, B);
    benchmark(matmul_transposed, "Transposed Multiplication", A, B);
    benchmark(matmul_blocked,    "Blocked Multiplication",    A, B);

    return 0;
}
