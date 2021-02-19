#include <iostream>
#include <string>
using namespace std;

void selectionsort (int a[],int n)
{
  int min ,j , t = 0;
  for (int i = 0 ; i<n ; i++)
     {
        min = i;
        j = i+1;
        while (j <n)
        {
            if (a[min] > a[j] ) {swap (a[min] , a[j]);}
            j ++;
            t ++;
        }
        a[i] = a[min];
    }
}
int main()
{
  int n;
  cin >>n;
  int a[n];
  for (int  i=0; i<n; i++) {cin >> a[i];}
  selectionsort( a ,n);
  for (int  i=0; i<n; i++) {cout<< a[i];}
}
