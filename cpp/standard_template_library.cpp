#include <iostream>
//       STL 
#include <vector>
#include <deque>
#include <list>
#include <array>
#include <set>
#include <map>
#include<unordered_set>
#include <unordered_map>
#include <algorithm> 
#include <string>

using namespace std;


bool isOdd(int i){
    return i % 2;
}
int main(){

    //         //  OVERVIEW

    // //  CONTAINER
    // vector<int> vec;
    // vec.push_back(1);
    // vec.push_back(3);
    // vec.push_back(12);
    // vec.push_back(4);
    // vec.push_back(6);


    // // ITERATOR 

    // vector<int>::iterator iter_1 = vec.begin();
    // vector<int>::iterator iter_2 = vec.end();


    // // ALGORITHM
    // sort(iter_1, iter_2);
    // for (vector<int>::iterator iter = iter_1; iter != iter_2; ++iter)
    // {
    //     cout << *iter << endl;
    // }

        // DETAIL

    // CONTAINER : 
        // Sequence : vector, deque, list, array, forward_list
        // Associate : set, multi set, map multi map
        // Unorder : unordered set,....



    // // Common member function api in all container:
    // vector<int> vec;
    // vec = {1, 2, 12,5,6};
    // cout << vec.empty() << endl
    //      << vec.size() << endl;
    // vector<int> vec2(vec); // copy
    // vec.clear();
    // vec2.swap(vec);


	// VECTOR
    // // Tạo vector 2 chiều rỗng
    // vector < vector <int> > v;
    // // khai báo vector 5×10 
    // vector < vector <int> > v (5,  10);
    // //  khai báo 5  vector 1 chiều rỗng 
    // vector < vector <int> >  v (5);
    // //khai báo vector 5*10 với các phần tử khởi tạo giá trị là 1
    // vector < vector <int> >  v (5, vector <int> (10,1));




    // //DEQUE
    // deque<int> deq = {1, 6, 3, 8, 2};
    // deq.push_back(3);
    // deq.push_front(4); // Khac voi vector
    // cout << deq[1];  // 1
    // // Properties: 
    // //     fast insert&remove at begin & end
    // //     slow remove in middle
    // //     slow search

    // // After you remove or insert st in vector or deque  
    // // the pointer that previos point to vector might 
    // // invalidate



    // // LIST
    // list<int> lt = {5,2,9};
    // lt.push_back(6);
    // lt.push_front(4); // {12,1,5,7,2,3}
    // list<int>::iterator ptr = find(lt.begin(), lt.end(), 9); // find lt[2]
    // cout << *ptr; // 9
    // lt.insert(ptr, 8);
    // cout << *--ptr; // 8  
    // lt.erase(ptr);
    // list<int> lt_2 = {1, 2, 4};
    // // lt.splice(ptr, lt_2, lt.begin(), lt.end());  //?? O(1)
    // // for (list<int>::iterator it = lt.begin(); it != lt.end(); it++){
    // //     cout << *it << endl;
    // // }

    // Properties
    //     fast insert and remove anywhere  O(1)
    //     slow search O(n)
    //     no random access , not []

    // // // ARRAY
    // array<int, 5> a = {1, 5, 3, 6, 3}; //size can not be change
    // cout << a.begin() << endl<<  a.end() << endl; //address

    // // cout << a.swap() << endl;
    // cout << a[2] << endl;



    // ASSOCIATIVE ARRAY 
    // Always sorted, no push_back, push_front
 
    // // SET: No duplicate

    // set<int> myset;
    // myset.insert(3);
    // myset.insert(1);
    // myset.insert(7); // O(log(n)) --> {1,3,7}

    // set<int>::iterator it;
    // it = myset.find(7);
    // //*it = 6; // cannot because it is readonly
    // cout << *it; // 7

    // pair<set<int>::iterator, bool> ret;
    // ret = myset.insert(3);
    // cout << *ret.first << endl // 3
    //      << ret.second << endl; // 0    
    // if (ret.second == false){
    //     it = ret.first; // point -> 3
    // }   

    // myset.insert(it , 9);
    //  // "it" is a hint O(logn)->O(1) {1,3,7,9}
    // cout <<*it; // 3
    // myset.erase(it);  // {1,7,9}
    // myset.erase(7); // {1,9}

    // MULTI SET :  like set but allow duplicate
    // Properties:
    // 1. Fast search OLogn
    // 2. Traversing is slow than vector & deque 
    // 3. No [] 





    // // MAP KEY-VALUE
    // map<char, int> mymap = {{'d',400},{'e',500}};
    // mymap.insert(pair<char, int>('a', 100));
    // mymap.insert(make_pair('b', 200));
    // cout << mymap['d'] << endl;
    // mymap['g'] = 600; // not do in vector 
    // map<char, int>::iterator it;
    // it = mymap.find('b');
    // mymap.insert(it, make_pair('c', 300));
    // // show content
    // for (it = mymap.begin(); it != mymap.end();++it){
    //     cout << (*it).first     
    //          << (*it).second << endl;
    // }

    // // MULTIMAP allow duplicate
    // // multimap<char, int> mymap;
    // // map/multi : 
    // //     keys cannot be modify
    // //     type of *p pair<char,int>
    //     // multi not have []








    //    // UNORDER_CONTAINER


    // unordered_set<string> myset = {"red", "green", "blue"};
    // unordered_set<string>::const_iterator it = myset.find("blues"); // O(1)

    // if( it != myset.end()){     // important check if it not in set
    //     cout << *it << endl;
    // }
    // myset.insert("yellow"); // {"red", "green", "blue","yellow""}

    // vector<string> vec = {"purple", "black","red"};
    //  // {"black","red", "green","purple", "blue","yellow""}
    // myset.insert(vec.begin(), vec.end()); 
    // it = myset.find("black");
    // // it = it + 1; // Không chạy
    // // it--; // không chạy
    // it++;
    // cout << *it << endl; // red

    //  // hash
    // cout << myset.load_factor() << endl; // total element/bucket
    // string x = "red";
    // cout << myset.bucket(x) << endl   // 5
    //      << myset.bucket_count() << endl;   // total_bucket = 11 


    // Properties:
    //     Fastest search/insert at any place : O(1)
    //     In Multi the value cannot be change







    // // ITERATOR
    // // 1. Random access iterator: vector, deque, array
    // vector<int> vec = {1,7,4,6,3,7,2,11};
    // vector<int>::iterator it = vec.begin();
    // it = it + 3;  // can add, can  compare iter (it1 < it2)
    // cout << *it;
    // // 2.Bidirectional Iterator: list, set, map , multi
    // list<int> lt = {1, 6, 3, 6, 2, 7, 22};
    // list<int>::iterator it = lt.begin();
    // ++it; // cannnot add & compare 
    // // 3.Forward iterator : forward_list
    // ++it; //not --
    // // 4.Input iterator: read & process value , not write
    // // 5.Output iterator: output value while iterate, can write

    
    // // Every container has a iterator & const_iterator
    // set<int> myset = {1, 7, 3, 8, 3};
    // set<int>::iterator it = myset.begin();
    // advance(it,2);// foward 5 pos
    // distance(it.begin(), it.end()); 
    

    // // INSERT ADAPTER
    // // insert
    // vector<int> vec_1 = {1, 35, 2, 7, 27, 2};
    // vector<int> vec_2 = {1, 4, 6};
    // vector<int>::iterator it = find(vec_1.begin(),vec_1.end(),27);
    // insert_iterator<vector<int>> i_it(vec_1, it);
    // // have back_insert_iterator & front_insert_iterator
    // copy(vec_2.begin(), vec_2.end(), i_it); // vec_1 = {1,35,2,7,1,4,6,27,2}
    // cout << vec_1[4];

    // // 2. stream
    // // 3 Reverse Iter
    // reverse_iterator<vector<int>::iterator> r_it;
    // for (r_it = vec_1.rbegin(); r_it != vec_1.rend();r_it ++){
    //     cout << *r_it << endl;
    // }

    //     // ALGORITHM
    //     vector<int> vec = {13, 6, 24, 7, 2, 4, 9};
    //     vector<int>::iterator it = min_element(vec.begin(), vec.end());
    //     cout << *it;   // 2
    //    //{2,4,9} sort(vec.begin(), it); // {6,7,13,24,2,4,9}
    //     reverse(it ,vec.end());
    //     vector<int> vec_2(3) ;
    //     copy(it, vec.end(), vec_2.begin()); //{2,4,9}
    //     cout << vec_2[1];
    //     vec_2.insert(vec_2.end(),vec.begin(),it); // efficient & safe
    //     cout << vec_2[3];

    //     it = find_if(vec.begin(), vec.end(), isOdd);
    //     cout << *it; // 7

    //     // lambda function
    //     it = find_if(vec.begin(), vec.end(), [](int x) { return x % 2; });
    //     cout << *it; // 7

    //     // algo with native
    //     int arr[4] = {12, 4, 1, 5};
    //     sort(arr, arr + 4); // behave like iter is an iter : here is pointer

    // CATEGORY ALGORITHM

    // vector<int> vec_1 = {43, 12, 1, 5, 7, 3,12 ,23, 4, 7};
    // vector<int> vec_2 = {12, 7, 3, 40};
    // vector<int> vec_3;
    // vector<int>::iterator it_1, it_2;
    // pair<vector<int>::iterator, vector<int>::iterator> pair_of_it;

    // // non-modified ALGO

    // // count , min , max, compare, linearsearch, attribute
    // // 1.Coungting
    // cout<<count(vec_1.begin(), vec_1.end(), 12); //2
    // // define condition
    // cout<<count_if(vec_1.begin(), vec_1.end(), [](int x) { return x % 2; }); //7

    // // 2.Min max
    // it_1 = max_element(vec_1.begin() + 2, vec_1.end());
    // it_1 = max_element(vec_1.begin() + 2, vec_1.end(),
    //                    [](int x, int y) { return (x % 10) < (y % 10); }); // define cmparison
    // cout << *it_1; // 7
    // pair_of_it = minmax_element(vec_1.begin(), vec_1.end());
    // cout << *pair_of_it.second; // 43

    // // 3.Linear search ( for unsorted )
    // it_1 = find(vec_1.begin(), vec_1.end(),222); // 33 ????
    // cout << *it_1;
    // it_1 = find_if(vec_1.begin(), vec_1.end(), [](int x) { return x % 2; });
    // cout << *it_1; // 43
    // it_1 = find_if_not(vec_1.begin(), vec_1.end(), [](int x) { return x % 2; });
    // cout << *it_1; // 12
    // it_1 = search_n(vec_1.begin(), vec_1.end(),2,7); // consecutive
    // cout << *it_1;  // 33 (no have)
    // // .
    // // .
    // // .

    // // 4.Compare
    // if(equal(vec_1.begin(), vec_1.end(),vec_2.begin())){
    //     cout << "vec2 = vec1";
    // }
    // // is_permutation ....
    // pair_of_it = mismatch(vec_1.begin(), vec_1.end(), vec_2.begin());
    // cout<< *pair_of_it.second; // 12 (iter of vec_2)
    // cout << lexicographical_compare(vec_1.begin(), vec_1.end(), vec_2.begin(), vec_2.end()); // 0

    // // 5.Check attribute
    // // is_heap ,is_heap_until, is_sorted, is_sorted_until,...

    // // 6.Any, all,none
    // all_of(vec_1.begin(), vec_1.end(), [](int x) { return x < 20; });
    // // any_of,none_of

    // Modified Algo

    // // I - Change element values
    // // copy, move , transform , swap , fill, replace,remove

    // // 1.Copy
    // copy(vec_1.begin() + 2, vec_1.end() - 3, vec_2.begin());//{1,5,7,3,12}
    // cout << vec_2[2] << endl;
    // copy_if(vec_1.begin(), vec_1.end(), vec_2.begin(),
    //         [](int x) { return x < 10; }); // condition
    // // cout << vec_2.end - vec_2.begin ;
    // copy_n(vec_1.begin(), 1,vec_2.begin()); // cop 1 ptu tu begin 1 thay the begin 2
    // cout << vec_2[1]<<endl;
    // copy_backward(vec.begin(), vec.end(), vec2.end());

    // // 2.Move
    // vec_1.move(vec_1.begin(), vec_1.end(),vec_2.begin());
    // // move_backward

    // // 3.Transform
    // transform(vec_1.begin(), vec_1.end(), vec_2.begin(),
    //             vec_3.begin(),
    //           [](int c, int y) { return x + y };);

    // // 5.Fill
    // fill(vec_1.begin(), vec_1.end(), 9);
    // fill_n(vec_1.begin(), vec_2.end(), 2, 9);//{2 so 9, con lai 0}
    // generate(vec_1.begin(), vec_1.end(), rand);
    // // generate_n..

    // // 6.replace
    // replace(vec_1.begin(), vec_1.end(), 6, 9);
    // replace_if(vec_1.begin(), rec_1.end(), [](int x) { return x > 10; }, 6);
    // replace_copy(vec_1.begin(), vec_1.end(), vec_2.begin(), 6, 9); // vec_1 not change
    // // replace_copy_if...

    // // 7.Remove
    // // remove, remove_if, remove_copy ,remove_copy_if
    // unique(vec_1.begin(), vec_1.end(), less<int>());
    // // remove ele whose previous ele less than itself
    // // unique_copy...

    // // II - Order-change Algo:
    // // reverse, rotate, permute, shuffle

    // // 1.Reverse
    // reverse(vec_1.begin() + 1, vec_1.end() - 1);
    // // reverse_copy..

    // // 2.rotate
    // rotate(vec_1.begin(), vec_1.begin() + 2, vec_1.end());
    // // rotate_copy...

    // // 3.Permute
    // next_permutation(vec_1.begin(), vec_1.end());
    // // lexicographically next greater permu
    // // {1,2,3,5} < {1,2,4,4}
    // // prev_permutation...    smaller ...

    // // 4.Shuffle
    // random_shuffle(vec_1.begin(), vec_1.end(),default_random_engine);

    // //    ACCESS STRING
    // string s1 = "Goodbye";
    // cout << s1[10] << endl << s1.at(10); //--> underfine vs exception

    return 0;
}