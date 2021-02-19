// Example program
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int distribute (int a[],int n, int MAX)
{
int count[MAX];
for (int i=0; i<MAX ;i++){count[i]=0;}
  for (int i=0; i<n; i++) {cin >> a[i];}
  for (int i=0; i<n ; i++){count[a[i]]++;}
  for (int i=0; i< MAX; i++){for (int j =0; j <count[i];j++){cout << i << " ";}}
}
int main()
{
  long long n , MAX; cin >> n; cin >> MAX;
  int a[n] ;
  distribute(a, n,MAX);
}

