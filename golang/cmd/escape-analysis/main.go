package main

import (
	"fmt"
	"math/rand"
)

func inc(x *int) {
	*x++
}

func escape() *int {
	t := 4
	return &t
}

func large() {
	bigArray := make([]int, 10000000)
	bigArray[0] = 1
}
func unknownSize() {
	size := rand.Intn(100)
	data := make([]int, size)
	data[0] = 100
}

// gây "Escape to heap"
func ReadBad() []byte {
	data := make([]byte, 32)
	// Change data here...
	return data
}

func ReadGood(p []byte) int {
	for i := 0; i < len(p); i++ {
		p[i] = byte(i)
	}
	return len(p)
}

func main() {
	// Stay on stack
	n := 4
	inc(&n)
	fmt.Printf("n = %d\n", n)
	// ./main.go:5:10: x does not escape
	// ./main.go:30:25: n escapes to heap: Printf nhận input là interface{}
	// => Go không chắc chắn về kiểu dữ liệu thực sự và dùng làm gì

	// Escape to heap - Sharing Up
	escape := escape()
	fmt.Printf("escape = %d\n", *escape/2)
	// ./main.go:10:2: moved to heap: t

	// Escape to heap - Size is too large
	large()
	// ./main.go:15:18: make([]int, 10000000) escapes to heap

	// Escape to heap - Unknown size
	unknownSize()

	for i := 0; i < 100; i++ {
		_ = ReadBad()
	}

	buf := make([]byte, 32)
	for i := 0; i < 100; i++ {
		// Đưa cho hàm mượn, không phát sinh mới trên Heap
		n := ReadGood(buf)
		fmt.Printf("Read %d bytes\n", n)
	}
}

// go build -gcflags "-m" //: print optimization decisions
