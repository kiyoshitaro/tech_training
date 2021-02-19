#include<iostream>
using namespace std;


class Ogre{
    private:
    int health;
    int strength;
    public:
    void increaseHealth(){
        health++;
    }
    void decreaseHealth(){
        health--;
    }
    int getHealth(){
        return health;
    }

    void attack(){
        cout << "Attaaaaaacking \n";
    };
};

class Clan{
    int y;
    Ogre k;
};

// class sodier(){
//     public :
//         sodier(int startStrength, int startHealth)
//             strength(startStrength);
//             health(startHealth);
            
//         void attack(){
//             cout << "Attaaaaaaack ";
//         }
// };
class shape{
    protected:
       float length;
       float width;
       float S; 

    public:
    // contructor
      shape(float width, float length):S(0) // Khai báo S
      {
        //   this ở đây là con trỏ nên dùng toán tử -> 
          this->width = width;
          this->length = length;
      };
      void setLength(float tmp_length)
      {
          length = tmp_length;
        }
        void setWidth( float width){
            this->width = width;
        }
        float getLength(){
            return length ;
        }
        float getS(){
            return S;
        }
        //   do cha có hàm solveS rồi nên để gọi ở con
        //   ta cầ n thêm virtual
        virtual void solveS(){
            cout << "Chua tinh duoc" << endl;
        }
};

class rectangle : public shape{
    public:
    // constructor
       rectangle(float width = 0, float length = 0) : shape(width, length){}
       void solveS()
        {
            cout << width * length << endl;
        }
};

int main()
{

    // Ogre t;
    // t.attack();
    // t.health = 12;
    // cout << t.health;


    // c1
    rectangle rec(10,11.1);
    cout << rec.getLength() << endl << rec.getS() << endl << &rec;
    rec.setLength(12.2);
    rec.setWidth(10);
    rec.solveS() ;

    // c2
    shape *sp ;
    sp = &rec;
    cout << sp->getLength() << endl ;
    // Tính đa hình
    sp->solveS();  
    // in ra hàm của cha 
    // Để tính hàm theo con ta sử dụng virtual --> tính đa hình 
    

    return 0;
}