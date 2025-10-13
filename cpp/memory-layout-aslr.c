#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>

// .data
int global_data = 100;

// .bss
int global_bss[1000]; // chưa khởi tạo

// .rodata
const char* rodata_str = "This is rodata";

// .text
void sample_function() {}

int main() {
    // Stack: biến cục bộ
    int a = 1;
    int b = 2;
    int c = 3;

    // Mảng tĩnh (stack)
    int static_array[3] = {1, 2, 3};

    // Mảng động (heap)
    int* dynamic_array = malloc(3 * sizeof(int));
    dynamic_array[0] = 10;
    dynamic_array[1] = 20;
    dynamic_array[2] = 30;

    // Biến cấp phát động (heap)
    int* heap_var = malloc(sizeof(int));
    *heap_var = 999;

    // Mmap: vùng ánh xạ thủ công
    void* mmap_region = mmap(NULL, 4096, PROT_READ | PROT_WRITE,
                             MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);

    // In sơ đồ địa chỉ
    printf("\nHigher addresses\n");
    printf("┌────────────────────────────────────────────┐\n");
    printf("│ Stack (grow ↓) — R/W + guard               │\n");
    printf("│   &a:             %p\n", &a);
    printf("│   &b:             %p\n", &b);
    printf("│   &c:             %p\n", &c);
    for (int i = 0; i < 3; i++) {
        printf("│   &static_array[%d] = %p → %d\n", i, &static_array[i], static_array[i]);
    }
    printf("├────────────────────────────────────────────┤\n");
    printf("│ Mapped regions (mmap, so)                  │\n");
    printf("│   mmap_region:     %p\n", mmap_region);
    printf("├────────────────────────────────────────────┤\n");
    printf("│ Heap (grow ↑) — R/W                        │\n");
    for (int i = 0; i < 3; i++) {
        printf("│   &dynamic_array[%d] = %p → %d\n", i, &dynamic_array[i], dynamic_array[i]);
    }
    printf("│   heap_var = %p → %d\n", heap_var, *heap_var);
    printf("├────────────────────────────────────────────┤\n");
    printf("│ .bss / .data — R/W                         │\n");
    printf("│   &global_bss:     %p\n", &global_bss);
    printf("│   &global_data:    %p\n", &global_data);
    printf("├────────────────────────────────────────────┤\n");
    printf("│ .rodata — R                                │\n");
    printf("│   rodata_str:     %p\n", rodata_str);
    printf("├────────────────────────────────────────────┤\n");
    printf("│ .text — R/X                                 │\n");
    printf("│   sample_function: %p\n", sample_function);
    printf("└────────────────────────────────────────────┘\n");
    printf("Lower addresses\n");

    // printf("\nProgram is running... PID: %d\n", getpid());
    // while (1) {
    //     sleep(1);
    // }

    free(dynamic_array);
    free(heap_var);
    return 0;
}
