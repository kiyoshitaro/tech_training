// #define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
#include <stdint.h>
#include <time.h>

// Timer tiện dụng (ns)
static inline long long ns_since(struct timespec t0, struct timespec t1) {
    return (t1.tv_sec - t0.tv_sec) * 1000000000LL + (t1.tv_nsec - t0.tv_nsec);
}

typedef struct {
    char   c;   // 1 byte
    int    x;   // 4 bytes (likely needs 4-byte alignment)
    double d;   // 8 bytes (needs 8-byte alignment)
    // Padding sẽ được chèn để đảm bảo alignment
} BadOrder;

typedef struct {
    double d;   // 8 bytes
    int    x;   // 4 bytes
    char   c;   // 1 byte
    // Ít padding hơn nhờ sắp xếp theo độ lớn/align giảm dần
} GoodOrder;

#pragma pack(push, 1)
typedef struct {
    char   c;
    int    x;
    double d;
    // Không có padding (packed). Truy cập có thể chậm hơn hoặc không an toàn trên vài kiến trúc.
} PackedTight;
#pragma pack(pop)

typedef struct {
    double d;
    int    x;
    char   c;
    // AoS: Array of Structs
} ParticleAoS;

typedef struct {
    double *d;
    int    *x;
    char   *c;
    // SoA: Structure of Arrays
} ParticleSoA;

int main(void) {
    // 1) Minh họa sizeof, padding, offset
    printf("sizeof(BadOrder)  = %zu\n", sizeof(BadOrder));
    printf("  offsets: c=%zu, x=%zu, d=%zu\n",
           offsetof(BadOrder, c), offsetof(BadOrder, x), offsetof(BadOrder, d));

    printf("sizeof(GoodOrder) = %zu\n", sizeof(GoodOrder));
    printf("  offsets: d=%zu, x=%zu, c=%zu\n",
           offsetof(GoodOrder, d), offsetof(GoodOrder, x), offsetof(GoodOrder, c));

    printf("sizeof(PackedTight,@packed(1)) = %zu  (no padding, but possible misalignment)\n",
           sizeof(PackedTight));

    // 2) AoS vs SoA: khi chỉ dùng 1-2 field trong hot loop,
    //    SoA tận dụng locality tốt hơn (ít kéo dữ liệu không cần thiết vào cache).
    const size_t N = 3000000; // ~3 triệu phần tử (~vừa phải)
    struct timespec t0, t1;

    // AoS allocation
    ParticleAoS *aos = malloc(N * sizeof(*aos));
    if (!aos) { perror("malloc aos"); return 1; }

    // SoA allocation
    ParticleSoA soa = {
        .d = malloc(N * sizeof(*soa.d)),
        .x = malloc(N * sizeof(*soa.x)),
        .c = malloc(N * sizeof(*soa.c))
    };
    if (!soa.d || !soa.x || !soa.c) {
        perror("malloc soa");
        free(aos);
        free(soa.d); free(soa.x); free(soa.c);
        return 1;
    }

    // Init dữ liệu (tuần tự để warm cache hợp lý)
    for (size_t i = 0; i < N; ++i) {
        aos[i].d = (double)i * 0.5;
        aos[i].x = (int)i;
        aos[i].c = (char)(i & 0x7F);

        soa.d[i] = (double)i * 0.5;
        soa.x[i] = (int)i;
        soa.c[i] = (char)(i & 0x7F);
    }

    // 2.a) Trường hợp chỉ dùng 1 field: sum d
    volatile double sumA = 0.0, sumS = 0.0; // volatile để tránh tối ưu hóa bỏ vòng lặp

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < N; ++i) {
        sumA += aos[i].d; // AoS kéo cả struct vào cache line
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long long aos_only_d_ns = ns_since(t0, t1);

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < N; ++i) {
        sumS += soa.d[i]; // SoA chỉ kéo mảng d
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long long soa_only_d_ns = ns_since(t0, t1);

    // 2.b) Trường hợp dùng 2 field: d và x (phổ biến trong tính toán)
    volatile double sumA2 = 0.0, sumS2 = 0.0;

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < N; ++i) {
        sumA2 += aos[i].d * (double)aos[i].x;
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long long aos_dx_ns = ns_since(t0, t1);

    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (size_t i = 0; i < N; ++i) {
        sumS2 += soa.d[i] * (double)soa.x[i];
    }
    clock_gettime(CLOCK_MONOTONIC, &t1);
    long long soa_dx_ns = ns_since(t0, t1);

    // In kết quả
    printf("\nAoS vs SoA (N=%zu)\n", N);
    printf("Sum only d   | AoS: %.3f ms, SoA: %.3f ms  (sumA=%.3f, sumS=%.3f)\n",
           aos_only_d_ns / 1e6, soa_only_d_ns / 1e6, sumA, sumS);
    printf("Sum d & x    | AoS: %.3f ms, SoA: %.3f ms  (sumA2=%.3f, sumS2=%.3f)\n",
           aos_dx_ns / 1e6, soa_dx_ns / 1e6, sumA2, sumS2);

    // Dọn dẹp
    free(aos);
    free(soa.d); free(soa.x); free(soa.c);

    // Gợi ý:
    // - Thứ tự field: sắp xếp theo kích thước/align giảm dần để giảm padding.
    // - Packed chỉ dùng cho I/O/serialize; tránh trong hot path vì misalignment có thể chậm/không an toàn.
    // - AoS thân thiện khi luôn dùng hầu hết field cùng lúc.
    // - SoA tốt khi chỉ truy cập một/vài field trong hot loop, giúp giảm băng thông bộ nhớ và tăng cache hit.
    return 0;
}