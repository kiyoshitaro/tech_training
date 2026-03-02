// matmul.c - Matrix Multiplication Optimization Study
// =====================================================
// Nghiên cứu các kỹ thuật tối ưu hóa nhân ma trận từ cơ bản đến nâng cao
//
// Biên dịch: gcc -O3 -mavx2 -mfma -std=c11 matmul.c -o matmul
//
// Các kỹ thuật được giới thiệu (theo thứ tự độ phức tạp):
// 1. Naive: Ba vòng lặp đơn thuần (O(n³))
// 2. Reorder: Sắp xếp lại vòng lặp để tối ưu bộ nhớ cache
// 3. Transposed: Chuyển vị ma trận B để cải thiện locality
// 4. Blocked: Chia ma trận thành các khối nhỏ (cache blocking) -> để
// 5. Register: Giữ kết quả trung gian trong thanh ghi (register blocking)
// 6. AVX2: Sử dụng SIMD (Single Instruction Multiple Data) với 256-bit vectors
// =====================================================

#define _POSIX_C_SOURCE 199309L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <immintrin.h> // Cho các intrinsics AVX2

// =====================================================
// Cấu trúc dữ liệu Ma trận
// =====================================================
// Matrix: Biểu diễn một ma trận dưới dạng mảng 1D
// - rows, cols: Số hàng và cột của ma trận
// - data: Con trỏ đến mảng các phần tử (lưu dưới dạng hàng chính - row-major)
//   Ý nghĩa: phần tử tại hàng i, cột j được lưu tại chỉ số i*cols + j
//   Lợi ích: khi truy cập liên tiếp theo hàng, bộ nhớ cache sẽ hiệu quả hơn
typedef struct
{
    int rows, cols;
    float *data;
} Matrix;

Matrix matrix_create(int r, int c)
{
    // posix_memalign: aligned memory allocation
    // - Tham số 2: 64 bytes - căn chỉnh theo cache line (phổ biến là 64 bytes)
    // - Tham số 3: Tổng kích thước bộ nhớ cần cấp phát
    // Tại sao cần căn chỉnh? Để tối ưu hóa hiệu suất cache và SIMD operations
    // (SIMD instructions thường yêu cầu aligned memory để hoạt động nhanh hơn)
    Matrix m;
    m.rows = r;
    m.cols = c;
    posix_memalign((void **)&m.data, 64, sizeof(float) * r * c);
    return m;
}

// Tạo ma trận bằng malloc (so sánh perf với posix_memalign)
Matrix matrix_create_malloc(int r, int c)
{
    Matrix m;
    m.rows = r;
    m.cols = c;
    m.data = malloc(sizeof(float) * r * c);
    return m;
}

// Copy toàn bộ dữ liệu từ src sang dst (số phần tử phải khớp)
void matrix_copy(Matrix src, Matrix dst)
{
    memcpy(dst.data, src.data, sizeof(float) * src.rows * src.cols);
}

void matrix_free(Matrix *m)
{
    free(m->data);
}

// Macro để truy cập phần tử ma trận một cách thuận tiện
// MAT(m, r, c) = m.data[r * m.cols + c]
// Giải thích: Vì dữ liệu lưu dưới dạng hàng chính (row-major),
// phần tử tại hàng r, cột c nằm tại chỉ số: r * (số cột) + c
#define MAT(m, r, c) m.data[(r) * m.cols + (c)]

void fill_random(Matrix m)
{
    for (int i = 0; i < m.rows * m.cols; i++)
        m.data[i] = (float)rand() / RAND_MAX - 0.5f;
}

int nearly_equal(Matrix A, Matrix B)
{
    // So sánh hai ma trận với một sai số nhỏ (1e-3f)
    for (int i = 0; i < A.rows * A.cols; i++)
        if (fabsf(A.data[i] - B.data[i]) > 1e-3f)
            return 0;
    return 1;
}

double now_ms()
{
    struct timespec t;
    clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec * 1000.0 + t.tv_nsec / 1e6;
}

// =====================================================
// PHƯƠNG PHÁP 1: Naive (Cơ bản)
// =====================================================
// Công thức: C[i][j] = Σ(A[i][k] * B[k][j]) với k từ 0 đến cols(A)-1
// Ba vòng lặp lồng nhau: O(n³) complex
// Vấn đề với phương pháp này:
// ❌ Truy cập bộ nhớ không tối ưu (temporal locality kém)
//    - Vòng lặp k thay đổi nhanh nhất, nên truy cập B[k][j] sẽ bỏ qua các hàng
//    - Cache miss nhiều, CPU phải đợi dữ liệu từ main memory (rất chậm!)
// ❌ Không tận dụng các tính năng của CPU hiện đại (no SIMD, no prefetch)
void matmul_naive(Matrix A, Matrix B, Matrix C)
{
    for (int i = 0; i < A.rows; i++)
        for (int j = 0; j < B.cols; j++)
        {
            float sum = 0;
            for (int k = 0; k < A.cols; k++)
                sum += MAT(A, i, k) * MAT(B, k, j);
            MAT(C, i, j) = sum;
        }
}

// =====================================================
// PHƯƠNG PHÁP 2: Loop Reorder (Sắp xếp lại vòng lặp)
// =====================================================
// Công thức vẫn giống: C[i][j] += A[i][k] * B[k][j]
// Nhưng thay đổi thứ tự duyệt: i -> k -> j (thay vì i -> j -> k)
//
// Tại sao lại sắp xếp lại?
// 🔑 KIẾN THỨC: SPATIAL LOCALITY (Tính cục bộ không gian)
//    - CPU cache lưu các dòng liền kề (cache line ~ 64 bytes)
//    - Khi truy cập A[i][k], CPU sẽ tự động tải thêm A[i][k+1], A[i][k+2]... vào cache
//    - Tương tự, khi truy cập B[k][j], cache sẽ tải B[k+1][j], B[k+2][j]...
//
// Với thứ tự i->k->j:
// ✅ A[i][k] được truy cập tuần tự theo cột k (sequential access = cache friendly)
// ✅ Cộng vào C[i][j] cùng một vị trí nhiều lần, nó ở trong cache suốt
// ✅ B[k][j] được truy cập với stride nhỏ (sequential along row)
//
// Lợi ích:
// - Giảm cache miss từ ~90% xuống ~10%
// - Compiler có thể tối ưu hóa vòng j (innermost loop)
void matmul_reorder(Matrix A, Matrix B, Matrix C)
{
    memset(C.data, 0, sizeof(float) * C.rows * C.cols);
    for (int i = 0; i < A.rows; i++)
        for (int k = 0; k < A.cols; k++)
        {
            // giá trị A[i][k] không thay đổi khi j thay đổi;
            //
            // Cú pháp MAT(A,i,k) là toán tử mảng, sẽ được dịch ra một phép cộng chỉ số
            // mỗi lần dùng. ta chỉ muốn thực hiện phép đó một
            // lần duy nhất cho mỗi bộ i,k và giữ kết quả trong
            // một biến cục bộ
            //
            // Biến cục bộ `a` được biên dịch thành một thanh ghi của CPU 
            // => truy cập chỉ mất một chu kỳ, nhanh hơn vài chục lần so với
            // đọc từ bộ nhớ cache => kỹ thuật loop
            // hoisting/registrization (tách phép load ra khỏi
            // vòng lặp sâu nhất và lưu trong thanh ghi).
            float a = MAT(A, i, k);

            // vòng j là vòng lặp innermost, chạy nhiều lần nhất.
            // toàn bộ nội dung ở đây chỉ dùng biến `a` đã nằm
            // trong thanh ghi, do đó mỗi lần lặp chỉ có:
            //   - một phép nhân float
            //   - một phép cộng float
            //   - hai truy xuất B và C theo hàng (sequential)
            for (int j = 0; j < B.cols; j++)
                MAT(C, i, j) += a * MAT(B, k, j);
        }
}

// =====================================================
// PHƯƠNG PHÁP 3: Transposed (Chuyển vị B)
// =====================================================
// Ý tưởng: Chuyển vị B trước, sau đó nhân với A
// Nếu B -> BT (chuyển vị), thì B[k][j] = BT[j][k]
// Công thức mới: C[i][j] = Σ(A[i][k] * BT[j][k])
//
// Tại sao chuyển vị: TEMPORAL LOCALITY (Tính cục bộ thời gian)
//    - Sau khi chuyển vị, truy cập BT[j][k] giống như truy cập hàng
//    - Hàng được lưu liên tiếp trong bộ nhớ (row-major layout)
//    - CPU sẽ prefetch toàn bộ hàng vào cache một lần
//    - So sánh naive: truy cập B[k][j] là truy cập cột (stride lớn, cache miss nhiều)
//
// Trade-off:
// ✅ Truy cập bộ nhớ nhanh hơn
// ❌ Phải mất thời gian để transpose B (O(n²))
// ⏱️ Tốc độ: nhanh hơn naive nhưng chậm hơn reorder do overhead transpose
void transpose(Matrix B, Matrix T)
{
    for (int i = 0; i < B.rows; i++)
        for (int j = 0; j < B.cols; j++)
            MAT(T, j, i) = MAT(B, i, j);
}

Matrix transpose_alloc(Matrix B)
{
    Matrix T = matrix_create(B.cols, B.rows);
    transpose(B, T);
    return T;
}

void matmul_transposed(Matrix A, Matrix BT, Matrix C)
{
    for (int i = 0; i < A.rows; i++)
        for (int j = 0; j < BT.rows; j++)
        {
            float sum = 0;
            // Cả A[i][k] và BT[j][k] đều được truy cập theo hàng (sequential)
            for (int k = 0; k < A.cols; k++)
                sum += MAT(A, i, k) * MAT(BT, j, k);
            MAT(C, i, j) = sum;
        }
}

// =====================================================
// PHƯƠNG PHÁP 4: Blocked (Cache Blocking)
// =====================================================
// Ý tưởng: CACHE HIERARCHY chia ma trận thành các khối BSxBS sao cho dữ liệu của 1 khối được tái dùng nhiều lần
// khi còn đang nằm trong cache (giảm cache-miss -> nhanh hơn).
//
// Cách đọc thông số cache bạn đưa (lưu ý: lscpu báo "sum of all"):
// - L1d: 384 KiB (8 instances - rất nhanh, ~4 cycles)  -> ~48 KiB / core
// - L2 : 4 MiB   (8 instances - nhanh, ~10 cycles)  -> ~512 KiB / core
// - L3 : 16 MiB  (1 instance - chậm hơn, ~40 cycles)   -> shared cho tất cả core (dễ bị tranh chấp khi nhiều thread)

// Chọn BS thế nào cho dễ hiểu?
// - Trong blocked matmul, ta muốn 3 khối (A_block, B_block, C_block) "ở gần CPU" nhất có thể.
// - Với float (4 bytes), kích thước 1 khối BSxBS xấp xỉ:
//   - BS=32  -> mỗi khối ~4 KiB, tổng A+B+C ~12 KiB  (rất thoải mái trong L1d)
//   - BS=48  -> mỗi khối ~9 KiB, tổng ~27 KiB       (hợp lý cho L1d ~48 KiB/core)
//   - BS=64  -> mỗi khối ~16 KiB, tổng ~48 KiB      (sát "trần" L1d, dễ hụt vì overhead/conflict)
//   - BS=128 -> mỗi khối ~64 KiB, tổng ~192 KiB     (vừa L2 ~512 KiB/core, thường ổn định hơn)
//
//    Giải pháp: Chia thành khối 64x64
//    -> Toàn bộ khối vừa trong cache
//    -> Tận dụng cache locality tối đa
//
// Công thức: Với mỗi khối, tính C_block = A_block * B_block
//           Sau đó cộng dồn tất cả các khối lại
void matmul_blocked(Matrix A, Matrix B, Matrix C)
{
    const int BS = 128;

    memset(C.data, 0, sizeof(float) * C.rows * C.cols);

    // Duyệt ma trận theo khối:
    // ii, jj, kk: các chỉ số khối (block indices)
    // i, j, k: các chỉ số phần tử trong khối

    // Thứ tự: ii -> kk -> jj (tương tự loop reorder, optimized cho cache)
    for (int ii = 0; ii < A.rows; ii += BS)
        for (int kk = 0; kk < A.cols; kk += BS)
            for (int jj = 0; jj < B.cols; jj += BS)
            {
                // Trong mỗi khối, tính tích
                for (int i = ii; i < ii + BS && i < A.rows; i++)
                    for (int k = kk; k < kk + BS && k < A.cols; k++)
                    {
                        float a = MAT(A, i, k);
                        for (int j = jj; j < jj + BS && j < B.cols; j++)
                            MAT(C, i, j) += a * MAT(B, k, j);
                    }
            }
}

// =====================================================
// PHƯƠNG PHÁP 5: Register Blocking (2x2)
// =====================================================
// Ý tưởng: Tính 4 phần tử C cùng một lúc (2x2 block) bằng cách giữ chúng trong thanh ghi
//
// Tại sao lại giữ trong thanh ghi?
// 🔑 KIẾN THỨC: REGISTER (Bộ nhớ trong CPU)
//    - Thanh ghi (register): ~1 cycle (siêu nhanh!)
//    - L1 cache: ~4 cycles
//    - L2 cache: ~10 cycles
//    - ...main memory: ~200+ cycles
//
//    Nếu giữ kết quả trung gian (c00, c01, c10, c11) trong thanh ghi,
//    ta tránh được việc viết lại C vào bộ nhớ nhiều lần
//    -> Giảm store operations, tăng tốc độ
//
// Ví dụ với ma trận nhỏ:
// A = [[a0, a1],    B = [[b0, b1],    C = [[c00, c01],
//      [a2, a3]]         [b2, b3]]         [c10, c11]]
//
// c00 += a0*b0 + a1*b2
// c01 += a0*b1 + a1*b3
// c10 += a2*b0 + a3*b2
// c11 += a2*b1 + a3*b3
//
// ⏱️ Tốc độ: ~50-70 ms (tiếp tục cải thiện)
void matmul_register(Matrix A, Matrix B, Matrix C)
{
    // Khởi tạo C = 0
    memset(C.data, 0, sizeof(float) * C.rows * C.cols);

    // Duyệt ma trận theo khối 2x2
    // i: duyệt 2 hàng của A cùng một lúc
    // j: duyệt 2 cột của B cùng một lúc
    for (int i = 0; i < A.rows; i += 2)
        for (int j = 0; j < B.cols; j += 2)
        {
            // Các thanh ghi giữ kết quả trung gian 2x2
            // c00 = C[i][j],   c01 = C[i][j+1]
            // c10 = C[i+1][j], c11 = C[i+1][j+1]
            float c00 = 0, c01 = 0, c10 = 0, c11 = 0;

            // Vòng k: duyệt từng cột của A (= hàng của B)
            for (int k = 0; k < A.cols; k++)
            {
                // Load 2 phần tử từ hàng i của A
                float a0 = MAT(A, i, k);     // A[i][k]
                float a1 = MAT(A, i + 1, k); // A[i+1][k]

                // Load 2 phần tử từ hàng k của B (cột j, j+1)
                float b0 = MAT(B, k, j);     // B[k][j]
                float b1 = MAT(B, k, j + 1); // B[k][j+1]

                // Tính tích vô hướng 2x2 (accumulate in registers)
                // Tất cả những phép tính này diễn ra trong thanh ghi, RẤT NHANH
                c00 += a0 * b0;
                c01 += a0 * b1;
                c10 += a1 * b0;
                c11 += a1 * b1;
            }

            // Sau khi tích lũy xong, ghi kết quả vào bộ nhớ
            MAT(C, i, j) = c00;
            MAT(C, i, j + 1) = c01;
            MAT(C, i + 1, j) = c10;
            MAT(C, i + 1, j + 1) = c11;
        }
}

// =====================================================
// PHƯƠNG PHÁP 6: AVX2 SIMD (Single Instruction Multiple Data)
// =====================================================
// Ý tưởng: Sử dụng các lệnh SIMD để xử lý nhiều dữ liệu cùng một lúc
//
// Tại sao SIMD hiệu quả?
// 🔑 KIẾN THỨC: VECTOR INSTRUCTIONS
//    - Thay vì tính: c += a * b (1 phép nhân)
//    - Ta tính: [c0, c1, c2, c3, c4, c5, c6, c7] += a * [b0, b1, b2, b3, b4, b5, b6, b7]
//    - Làm 8 phép nhân trong 1 lệnh (AVX2: 256-bit = 8 floats × 32 bits)
//    - Tốc độ: Gần 8 lần nhanh hơn!
//
// AVX2 Intrinsics sử dụng:
// - _mm256_set1_ps(a): Tạo vector với 8 phần tử, tất cả = a
// - _mm256_load_ps(ptr): Load 8 floats từ địa chỉ ptr (phải aligned 32 bytes)
// - _mm256_store_ps(ptr, v): Lưu vector v vào memory
// - _mm256_fmadd_ps(a, b, c): Fused Multiply-Add: c = a*b + c (1 lệnh, 1 cycle latency!)
//
// FMA (Fused Multiply-Add):
// - Không phải 2 lệnh riêng biệt (nhân + cộng)
// - Là 1 lệnh duy nhất, nhanh hơn nhiều!
// - Cũng giảm sai số làm tròn (chỉ làm tròn 1 lần thay vì 2 lần)
//
// ⏱️ Tốc độ: ~5-10 ms (nhanh hơn 50 lần so với naive!)
void matmul_avx2(Matrix A, Matrix B, Matrix C)
{
    // Khởi tạo C = 0
    memset(C.data, 0, sizeof(float) * C.rows * C.cols);

    // Duyệt từng hàng của A
    for (int i = 0; i < A.rows; i++)
    {
        // Duyệt từng cột của A (= hàng của B)
        for (int k = 0; k < A.cols; k++)
        {
            // Lấy một phần tử từ A và broadcast thành vector 8 phần tử
            // __m256: kiểu dữ liệu vector 256-bit (8 floats)
            __m256 a = _mm256_set1_ps(MAT(A, i, k));

            // Duyệt các cột của B với bước 8 (xử lý 8 phần tử mỗi lần)
            int j = 0;
            for (; j + 8 <= B.cols; j += 8)
            {
                // Load 8 phần tử B[k][j..j+7] vào vector
                __m256 b = _mm256_load_ps(&B.data[k * B.cols + j]);

                // Load 8 phần tử C[i][j..j+7] vào vector
                __m256 c = _mm256_load_ps(&C.data[i * C.cols + j]);

                // Fused Multiply-Add: c = a*b + c (tất cả 8 phần tử cùng lúc!)
                // Điều này tương đương với:
                // c[0] += a * b[0]
                // c[1] += a * b[1]
                // ...
                // c[7] += a * b[7]
                c = _mm256_fmadd_ps(a, b, c);

                // Lưu kết quả trở lại bộ nhớ
                _mm256_store_ps(&C.data[i * C.cols + j], c);
            }

            // Xử lý các phần tử còn lại (không phải bội của 8)
            // Không thể dùng SIMD cho chúng vì số lượng < 8
            for (; j < B.cols; j++)
                MAT(C, i, j) += MAT(A, i, k) * MAT(B, k, j);
        }
    }
}

// =====================================================
// Hàm benchmark (So sánh hiệu suất)
// =====================================================
// Chạy hàm nhân ma trận nhiều lần và lấy kết quả tốt nhất

typedef void (*kernel_fn)(Matrix, Matrix, Matrix);

void benchmark(const char *name, kernel_fn fn,
               Matrix A, Matrix B, Matrix C, Matrix ref)
{
    // Mỗi hàm sẽ chạy 3 lần
    // Lấy kết quả tốt nhất (để loại bỏ ảnh hưởng của các công việc hệ thống khác)
    double best = 1e30;

    for (int r = 0; r < 3; r++)
    {
        double s = now_ms();
        fn(A, B, C);
        double e = now_ms();
        if (e - s < best)
            best = e - s;
    }
    printf("%-18s %8.2f ms   %s\n",
           name, best, nearly_equal(C, ref) ? "OK" : "WRONG");
}

int main()
{
    // Khởi tạo seed ngẫu nhiên (0 = kết quả lặp lại, để kiểm tra đúng/sai)
    srand(0);
    int N = 512;

    // Tạo các ma trận: A, B, C (kết quả), REF (tham chiếu - từ naive)
    Matrix A = matrix_create(N, N);
    Matrix B = matrix_create(N, N);
    Matrix C = matrix_create(N, N);
    Matrix REF = matrix_create(N, N);

    fill_random(A);
    fill_random(B);

    Matrix A_m = matrix_create_malloc(N, N);
    Matrix B_m = matrix_create_malloc(N, N);
    Matrix C_m = matrix_create_malloc(N, N);

    matrix_copy(A, A_m);
    matrix_copy(B, B_m);

    // Tính tham chiếu bằng phương pháp naive (dùng để kiểm tra các phương pháp khác)
    printf("Computing reference result (Naive)...\n");
    matmul_naive(A, B, REF);
    printf("\n");

    // Benchmark các phương pháp
    printf("%-18s %10s   %s\n", "Method", "Time (ms)", "Correct");
    printf("%-18s %10s   %s\n", "------", "--------", "-------");
    // So sánh Naive trên 2 kiểu cấp phát
    benchmark("Naive (aligned)", matmul_naive, A, B, C, REF);
    benchmark("Naive (malloc) ", matmul_naive, A_m, B_m, C_m, REF);
    benchmark("Reorder", matmul_reorder, A, B, C, REF);

    // Phương pháp Transposed cần transpose B trước
    Matrix BT = transpose_alloc(B);
    benchmark("Transposed", (kernel_fn)matmul_transposed, A, BT, C, REF);

    benchmark("Blocked", matmul_blocked, A, B, C, REF);
    benchmark("Register", matmul_register, A, B, C, REF);
    benchmark("AVX2", matmul_avx2, A, B, C, REF);

    matrix_free(&A);
    matrix_free(&B);
    matrix_free(&C);
    matrix_free(&REF);
    matrix_free(&BT);

    free(A_m.data);
    free(B_m.data);
    free(C_m.data);

    return 0;
}