#include<iostream>
#include<string>

using namespace std;

// struct have no or few basic function 
// use as data container 
struct dog{
    int age; // public default
    string name;
}
// struct compare to class
class dog
{
    int age;  // private default 
    string name;
    mutable int weight;
    int *arr = new int;
    

  public:
    dog()
    {
        age = 3;
        name = "bobby";
        weight = 12;
    }
    ~dog(){
        cout << "destroy";
    } // destructor

    // const params
    // void setAge(const int a) { age = a; } // const is useless 
    void setAge(int a) { age = a; } //are the same
    // nên chuyển thành tham trị
    void setAge(const int &a) { age = a; }

    // const return value
    const string &getName() { return name; }
    // const string getName() { return name; } // useless because function return a copy of const  
    

    // const function (cannot change anything in class)
        void printDogName() const {
            // getName();// not allow - only call const function
            // age++; // not allow
            weight++; // allow because mutable
            const_cast<dog *>(this)->age++; //allow - casting shouldnot use 
            *(arr + 3) = 12; // allow because it maintain bitwise constantness
            // cout << getName();  not allow cause just call const function 
            cout << name << "const function"<<endl;
        } // when overload just call with const object
        void printDogName(){
            cout << "Not const function" << endl;
        } // overload with const function
};

class Yellowdog : public Dog{
    virtual Yellowdog *clone() { return (new Yellowdog(*this)); }
};
void foo(Dog* d){ // d is yellowdog
    Dog *c = new Dog(*d); // c is dog
    Dog *e = d->clone(); // e is yellowdog
}

int main(){
    // const int c = 9;
    // const int *pt = &c;
    // // *pt = 9;// not allow
    // pt++; //allow

    // int i=9;
    // int const *pt2 = &i; //data is not, point is const
    // // const int *const pt3; //both is const

    // const_cast<int &>(c) = 6;
    // static_cast<const int &>(i);
    // i = 8;
    // cout << c << i;

    dog d;
    const dog e;
    e.printDogName();
    d.printDogName();
    const string &n = d.getName();
    cout << n << endl;
    // n = "test"; // cannot do 
    return 0;
}