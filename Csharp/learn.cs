// csc learn.cs

using System;
class Hello
{





    // OOP: biến thành viên (field), thuộc tính (property), pt (method), skien (delegate)

    // 1. field:
    // Mặc định là private
    // Tên biến public và protected nên bắt đầu bằng chữ cái in hoa và tuân theo cách viết PascalCase;
    // Tên biến private nên bắt đầu bằng ký tự gạch chân và tuân theo cách viết camelCase;

    // hạn chế sử dụng biến thành viên public
    // Hằng được xem là một thành viên tĩnh (static) của class --> sd readonly

    // 2. method
    // có thể sử dụng truyền tham chiếu ref cho pheeps kiểu value giữ lại gt khi thay đổi
    // truyền tham số out để return nhiều giá trị trong hàm
    // tham số tùy chọn phải đặt cuối

    // 3. pROPERTY: là dạng viết gộp của get và set
    internal  class Wheel {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    class Car{
        // field
        string _name;
        int _yearOfProduct;
        public int number = 5;
        public readonly int x = 4;
        public void Nothing(ref int x, ref Wheel k){
            s = new Wheel();
            x += 1;
            s.Id = x;
            k.Id += 1;
        }

        
        // Use: 
        // int sum, div;
        // res = Domath(a,b,out sum, out div)
        private static bool Domath(int a, int b, out int sum, out int div){

            sum = a + b;
            if(div == 0){
                return false;
                div = float.NaN;
            }
            div = a/b;
            return true;
        }
    }


//    <summary> 
//     This is document 
//    </summary> 

 static void Main(string[] args)
 {
    const bool i =true; (ko khởi tạo const hằng bằng gt của biến)
    var i = 12; // var tự hiểu double
    int x = 123_45; // tách các chữ số cho dễ đọc
    float x = 1.234f ;// f: float literal
    char x = 'a' ; // (nháy đơn)

    var c = (char) 65;
    var c = x.ToString();
    var c = "abc".GetType();    



    // String:
    // Property: Length
    // Instance: Contains(), EndsWith(), Equals(), ToUpper(), Trim(),IndexOf(), Replace(,), Split(new[] {' '})
    // Static method: string.Compare(), Concat(), Join("sep", str1,str2,..)

    string path = "C:\\ss\\"
    string path = @"C:\ss\"  // @ để tắt escape sequence
    string path = $"{x}"  // - string interpolation

    // Kiểu tham chiếu: obj, str. chỉ lưu địa chỉ trong stack còn giá trị trong heap
    //  Kiểu giá trị (còn lại ): lưu trực tiếp giá trị trong stack
    
    
    // Giá trị null : chỉ cho biến reference khi chưa trỏ vào gt nào 
    // Do sql cho phép nhận gt null nên Từ C# 2.0 để biến value nhận null bằng cách thêm modifier ?: 
    int? count = null;


    // Array : 
    // Property: Length
    int[] arr = {1,2,3,4}; // khởi tạo kiểu này ko được sử dụng var
    string[] names = new string[10]; // khơi tạo 10 gt mặc định t/ư mỗi kiểu dl, kiểu string là null 

    int[,] arr = {{1,2},{3,4}};
    int x = arr[0,1];
    foreach (var i in arr){
        continue;
    }
    for (int i =0 ; i < arr.GetLength(0); i++){
        for (int j =0 ; j < arr.GetLength(1); j++){
            break;
        }
    }
    
    Console.WriteLine("Ứng dụng C# đầu tiên phiên bản sử dụng công cụ CSC");
    Console.ReadKey();
 }
}
