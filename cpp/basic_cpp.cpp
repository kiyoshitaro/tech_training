#include <iostream>
#include<cstdio>
#include <ctime>
#include <cstring>
#include <string>   
#include<math.h>


using namespace std;

void hello(){
    cout << "Hello World !\n" ;
    // cin.get(); // wait to press a key
}

void writeToFile(FILE *file){
    
    // // int fputc(int c, FILE *f);
    // int c = fputc('S', file);
    // cout << c; // in ra ma ascii cua S la 83
    
    // // int fputs(const char *str, FILE *f);
    // int c = fputs("Study", file); // write in new line
    // cout << c; 

    // // int fprintf(FILE *f, const char *format, ...);
    // // Hàm printf tương đương với cách sử dụng fprintf(stdout, format, ...).
    // for (int i = 1; i <= 5; i++)
	// 	fprintf(file, "This is an example line %d\n", i);
}
void readFromFile(FILE *file){
    // // int fgetc(FILE *f);
    // cout << (char)fgetc(file);

    // // char* fgets(char *buf, int n, FILE *f);
    // char str[255];
    // while (fgets(str, 255, file) != NULL)
	// {
	// 	cout << str;
	// }

    // // int fscanf(FILE *f, const char *format, ...);
    // // doc file duoi 1 dinh dang
    // char str[255];
	// fscanf(file, "%[^\n]", str);
	// cout << str << endl;

}

// namespace để phân biệt các hàm cùng tên 
namespace first{
    void ham(){
        cout << "Goi ham thu nhat" <<endl;
    }
    namespace first{
        void ham(){
            cout << "first of first" << endl;
        }
    }
}
namespace second{
    void ham(){
        cout << "Goi ham thu 2"<<endl;
    }
}


// // TEMPLATE --> viết hàm với kiểu dữ liệu tùy ý
template<class T, class X>// same type í ok
void Swap (T &x, X &y){
    T tmp = x;
    x = y;
    y = tmp;
}

template<typename T>
T Square (T x){
    return x * x;
}

template<int val>
void addVal(int i){
    cout << i + val;
}


struct Date{
    int year;
    int month;
    int day;
};
struct Vector2D
{
	float x;
	float y;
    Date date;

    // Có thể khái báo function (đang ở dạng trừu tượng )
    void normalize(){
        float length = sqrt(x * x + y * y);
        x = x / length;
        y = y / length;
    }

};

Vector2D sumVect(Vector2D vec_1, Vector2D vec_2){
    Vector2D sum;
    sum.x = vec_1.x + vec_2.x;
    sum.y = vec_1.y + vec_2.y;
    return sum;
}

int main()
{ 
    // basic
    // const short l = 100;
    // bool key = false;
    // char c = 'h';
    // long x = 1110;
    // long y = 10;
    // hello();
    // cout << square(1.2);

    // // array
    //     int myArray[20] = {12,23,12};
    //     int arr[2][3];
    //     arr[1][2] = 3;
    //     myArray[9] = 12;
    // int *p = new int;
    // p[1] = 2;

    // // string
    //     // in C  #include <cstring>
    //     char string_1[10] = "Hello";
    //     char string_2[10] = "Tuan Hung";
    //     char string_3[10];
    //     int len;
    //     // sao chep
    //     strcpy(string_3, string_1);
    //     cout << string_3 << endl;

    //     // nối
    //     strcat(string_1, string_2);
    //     cout << string_1 << endl;

    //     cout << strlen(string_2);

    //     // in C++ #include <string>
    //     string str_1 = "Hello";
    //     string str_2 = "Tuan Hung";
    //     string str_3;

    //     str_3 = str_1;
    //     cout << str_3 << endl;
    //     cout << str_1 + str_2;
    //     cout << str_2.size();




    // string s1 = "Goodbye";
    // cout << s1.front();
    // cout << s1.back() << endl;
    // s1.push_back('k');
    // cout << s1<<endl;
    // s1.pop_back();
    // // Like vector string doesnot have push_front & pop_front because it is expensive
    // cout << *s1.begin() << endl;
    // cout << s1[10] << endl << s1.at(10); //--> underfine vs exception


    // // I/O  import<cstdio>

    //     const char *path = "./test.txt";
    //     FILE *file;

    //     file = fopen(path, "a"); // r, w, a (writing append va neu chua co se tao moi )
    //     if(!file){
    //         cout << "cannot open file " << endl;
    //     }
    //     else{
    //         cout << "File is opened" << endl;
    //     }
    //     writeToFile(file);
    //     readFromFile(file);

    // //TIME
    // time_t now = time(0);
    // char *dt = ctime(&now);
    // cout << dt ;  //Sun Oct 28 15:08:54 2018
    // // tm_struct
    // tm *ltm = localtime(&now);
    // cout << "Nam: "<< 1900 + ltm->tm_year << endl;
    // cout << "Thang: "<< 1 + ltm->tm_mon<< endl;
    // cout << "Ngay: "<<  ltm->tm_mday << endl;
    // cout << "Thoi gian: "<< 1 + ltm->tm_hour << ":";
    // cout << 1 + ltm->tm_min << ":";
    // cout << 1 + ltm->tm_sec << endl;


    // // namespace :: --> resolution operator
    // first::ham();
    // second::ham();
    // first::first::ham();

    // // TEMPLATE --> viết hàm với kiểu dữ liệu tùy ý
    //     int x = 10;
    //     long y = 12;
    //     Swap(x, y);
    //     cout << x;

    // cout << Square(3) << endl;
    // cout << Square<double>(4.2) << endl; // cả hai cách đều được

    // // với kiểu dl là giá trị 
    // addVal<4>(3);
    // int x = 4;
    // // addVal<x>(3); // not work  --> use functor
    // AddVal(x, 3);


    // FUNTOR
    // Built-in functor
    // less, greater, greater_equal, not_equal_to
    // logical_and , logical_not ,
    // multiplies, minus , divide, modulus, negate

    // int x = [4](int y) { return y; };
    // cout << x;




    // // STRUCT  nhóm kiểu dữ liệu xây dựng sẵn để tạo ra một tập hợp các biến thuộc cùng nhóm
    // Vector2D vect_1 = { 1, 3 }; //age = 0, year_of_exp = 0 by default
    // cout << vect_1.x ;  // 1
    // vect_1.y = 10;
    // Vector2D vect_2 = {2,3};
    // Vector2D sum = sumVect(vect_1, vect_2);

    // // Pointer to struct
    // Vector2D *ptr = &vect_1;
    // *ptr = {1, 2 , {2011,7,4}}; // true
    // // Vector2D *ptr = {1, 2}; error


    // cout << vect_1.x;  //1
    // cout << ptr->date.year;    // 1



return 0;
}


