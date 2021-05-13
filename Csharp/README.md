Console.WriteLine(i);
const bool i =true; (ko khởi tạo hằng bằng gt của biến)
var i = 12;
digit separator: int x = 123_45; // tách các chữ số cho dễ đọc
float, double, var tự hiểu double
char: var x = 'a' (nháy đơn)
string path = "C:\\ss\\"
string path = @"C:\ss\" @ để tắt escape sequence
string path = $"{x}" - string interpolation
a = 123.2;
a.ToString();
Kiểu tham chiếu: obj, str. chỉ lưu địa chỉ trong stack còn giá trị trong heap

Kiểu giá trị: lưu trực tiếp giá trị trong stack

Casting: (string) obj1; (float) x; x as float; (as chỉ áp dụng với kiểu tham chiếu)
"abc".GetType()

int[] arr = {1,2,3,4};
int[,] arr = {{1,2},{3,4}}
arr[0,1]

String:
Property: Length
Instance: Contains(), EndsWith(), Equals(), ToUpper(), Trim(),IndexOf(), Replace(,), Split(new[] {' '})
Static method: string.Compare(), Concat(), Join("sep", str1,str2,..)

OOP: biến thành viên (field), thuộc tính (property), pt (method), skien (delegate)

1. field:
   Mặc định là private
   Tên biến public và protected nên bắt đầu bằng chữ cái in hoa và tuân theo cách viết PascalCase;
   Tên biến private nên bắt đầu bằng ký tự gạch chân và tuân theo cách viết camelCase;

hạn chế sử dụng biến thành viên public
Hằng được xem là một thành viên tĩnh (static) của class --> sd readonly

2. method
   có thể sử dụng truyền tham chiếu ref
   truyền tham số out để return nhiều giá trị trong hàm
   tham số tùy chọn phải đặt cuối

3. pROPERTY: là dạng viết gộp của get và set
