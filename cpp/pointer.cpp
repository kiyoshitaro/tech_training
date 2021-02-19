#include <iostream>
using namespace std;


int ham(int &x) 
{ 
    return x; 
} 
// int * createInteger(int value = 0){
//     int num = value;
//     return & num;
// } // ham tra ve con tro     su dung : int *pInt = ....(4);

int main(){

    // int  a, * p;
    // a = 9;
    // p = &a; // toán tử & 1 ngôi, là toán tử lấy địa chỉ của 1 biến
    // cout << *p << endl ; // = a
    // cout << p << endl;  // addr a

    // p = (int *)0x7ffd9ed6de4c; // addr da biet
    // cout << *p << endl;

    // *p = a; // khong duoc viet

    // int nums[2][3]  =  { {16, 18, 20}, {25, 26, 27} };
    // cout << *(*(nums + 1) + 1); // = 26




    // // con tro ham ( callback function)
    // int (*q)(int &) ;
    // q = ham;
    // cout << q << endl;
    // int a = 2;
    // // goi ham qua con tro 
    // cout << q(a);
    // cout << ham <<" " << &a;




    // ALLOCATION FUNCTION AND OPERATOR 
    // có thể cấp phát vùng nhớ lớn
    // xác định được số lượng ô nhớ cần thiết khi code
    // Có thể tái sử dụng vùng nhớ sau khi được huỷ
    // use allocation function in C
    // void *y = malloc(sizeof(int)); // malloc tra ve kieu void
    // int *p = (int *)malloc(sizeof(int)); 
    // //t luu o stack va gia tri cua t là địa chỉ ở heap
    // *p = 10; // 10 lưu ở heap
    // free(p); // xóa giá trị ở heap
    // cout << y;
    // p = (int *)malloc(5 * sizeof(int));
    // for (int i = 0; i < 5; i++)
    // {
    //     cout << p[i] ; 
    // }
    // cout << endl;

    // p = (int *)calloc(5, sizeof(int));
    // for (int i = 0; i < 5; i++)
    // {
    //     cout << p[i] ;
    // }
    // p = (int *)calloc(5, sizeof(int));
    // for (int i = 0; i < 5; i++)
    // {
    //     p[i] = i;
    //     cout << p[i];
    // }
    // cout << endl;
    // int *q = (int *)realloc(p, 6 * sizeof(int)); 
    // // mở rộng A , khi đó q = p
    // for (int i = 0; i < 6; i++)
    // {
    //     cout << q[i] ;
    // }
    // cout <<endl<< q << endl << p;


    // // use operator with C++
    // int *p;
    // p = new int;
    // *p = 10;
    // delete p;
    // p = new int[20];
    // delete[] p;
    // // Nếu không huỷ vùng nhớ này trước khi chương trình kết thúc sẽ dẫn đến lỗi Memory Leak 





    // // so sánh 2 con trỏ 
    // (int)p==(int)x;
    // p==(int *)x;
    // (double*)p==x;
    // (void*)p==(void*)x;
    // p==(void*)x;
    // (float*)p==(float*)x;

    // //so sánh con trỏ với số nguyên
    // p==(int*)9999;
    // int(p)==9999;

    // // phần nâng cao và thâm thúy về con trỏ   
    // (int)p==int(main);
    // p==(int*)main;
    // (int(*)())p==main;
    // p==(void*)main;
    // // bình tĩnh tự tin theo hết tut này bạn sẽ hiểu được cái gì đang xảy ra ở 4 dòng code này

    return 0;
}