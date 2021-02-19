// Example program
#include <iostream>
#include <string>
using namespace std;

void insertionsort (int a[] ,int n )
{
int j;
  for (int i = 0 ; i<n ; i++)
     {
       j = i;
       while (a[j] < a[j-1] && j > 0)
       {
           swap (a[j] , a[j-1]);
           j--;
       }
    }
}
int main()
{
  int n; cin >> n;
  int a[n];
  for (int i =0; i<n; i++){cin >> a[i];}
  insertionsort(a,n);
  for (int i =0; i<n ;i++){cout << a[i];}
  }
