package main
import "fmt"
import ("errors"
"time"
"strings"
)
// import "unicode/utf8"
func main(){
	fmt.Println("Hello World!");

	var num int64 = 123 + 1
	fmt.Println(num)

	var float float64 = 1.23
	fmt.Println(float)

	var res float64 = float * float64(num)
	fmt.Println(res)

	var num1 int64 = 2
	fmt.Println(num/num1,num%num1)

	var myString string = `Hello
	World`;
	fmt.Println(len(myString),myString)
	
	var num2 int;
	fmt.Println(num2) // 0
	

	var myVar = "text"
	myVar1, myvar2 := "text1", 2
	fmt.Println(myVar, myVar1, myvar2)

	var _res, rem, err = intDivision(10, 0)
	if(err!=nil){
		fmt.Println(err)
	}else{
		fmt.Println(_res, rem)
	}

	var myArr [3]int32 = [3]int32{1, 2, 3}
	myArr1 := [...]int32{1, 2, 3}
	fmt.Println(myArr[0:3])
	fmt.Println(&myArr1[0])

	// SLICE
	var intSlice []int = []int{1, 2, 3}
	intSlice = append(intSlice, 4)
	fmt.Println(intSlice, len(intSlice), cap(intSlice)) //==> 4, 6
	intSlice2 := []int{5,6}
	intSlice = append(intSlice, intSlice2...)
	fmt.Println(intSlice, len(intSlice), cap(intSlice)) //==> 6, 6

	var myMap map[string]uint8 = map[string]uint8{"a": 1, "b": 2}

	// MAP
	var _x, ok = myMap["c"]
	fmt.Println(_x, ok)
	if(ok){
		fmt.Println(_x)
	} else {
		fmt.Println("key not found")
	}

	// LOOP
	for _x, _y := range myMap {
		fmt.Println(_x, _y)
	}
	for _i, val := range intSlice {
		fmt.Println(_i, val)
	}
	i := 0
	for {
		if i > 10 {
			break
		}
		fmt.Println(i)
		i++
	}

	for i:=0; i<10; i++ {
		fmt.Println(i)
	}

	// TIME ALLOCATION
	var _n = 1000000
	var testSlice = []int{}
	var testSlice1 = make([]int, 0, _n)

	fmt.Printf("time without preallocation: %v\n", timeLoop(testSlice, _n))
	fmt.Printf("time with preallocation: %v\n", timeLoop(testSlice1, _n))

	// STRING RUNE BYTE
	var testString = "résumé"
	var testString1 = []rune("résumé")
	fmt.Println(len(testString), len(testString1)) // 8, 6
	var _ind = testString[0] 
	fmt.Printf("%v, %T\n", _ind, _ind) // 114, uint8

	for i, v := range testString {
		fmt.Println(i,v) // skip é
	}
	var strSlice = []string{"a", "b", "c"} 
	var strBuilder strings.Builder
	for i:= range strSlice {
		strBuilder.WriteString(strSlice[i])
	}
	fmt.Println(strBuilder.String()) // abc

	// STRUCT 
	var myEngine gasEngine = gasEngine{20, 10}
	// var myEngine electricEngine = electricEngine{20, 10}
	fmt.Println( myEngine.milesLeft())
	canMakeIt(myEngine, 190)

	// POINTER 
	var p *int32 = new(int32)
	var _i int32
	fmt.Printf("%v%v", *p, _i)
	p = &_i
	*p = 1
	fmt.Printf("%v%v", *p, _i)
}

type engine interface{
	milesLeft() uint8
}
type gasEngine struct{
	mpg uint8
	gallons uint8
}
type electricEngine struct{
	kwh uint8
	mpkwh uint8
}

func (e gasEngine) milesLeft() uint8{
	return e.mpg * e.gallons
}
func (e electricEngine) milesLeft() uint8{
	return e.kwh * e.mpkwh
}


func canMakeIt(e engine, miles uint8){
	if(miles < e.milesLeft()){
		fmt.Println("can make it")
	} else {
		fmt.Println("can't make it")
	}
}

func timeLoop(slice []int, n int) time.Duration{
	var t0 = time.Now()
	for len(slice)<n{
		slice = append(slice, 1)
	}
	return time.Since(t0)
}


func intDivision(num int, den int) (int, int, error){
	var err error
	if den == 0 {
		err = errors.New("denominator cannot be zero")
		return 0, 0, err
	}
	var res int = num / den
	var rem int = num % den
	return res, rem, err
}