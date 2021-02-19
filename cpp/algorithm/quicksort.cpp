#include <iostream>
#include <algorithm>
using namespace std;

int quicksort (int arr[],int left, int right)
{
int select ;
int i = left;
int j = right;
int p = arr[(left+right)/2];
// partition
while (i<j)
{
while (arr[i] < p) {i++;}
while (arr[j] > p) {j--;}
swap (arr[i], arr[j]);
i++; j--;
}
if (left <j)
{ quicksort(arr,left,j);}
if (i < right)
{ quicksort(arr, i,right);}
}

int main()
{
int n, k;
cout << "Nhap vao so so hang: ";
cin >> n;
cout << "Nhap vao so thu tu: " ; cin >> k;
int arr [n];
for (int i = 0; i< n; i++){cout << "Nhap vao so hang thu " << i+1<< ":" ; cin >> arr[i];}
quicksort( arr, 0,n );
for (int i =0; i <n ; i++){cout << arr[i];}
}
