package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)
var loop = 100000000
var counter1 int64 = 0

func handleRequest() {
	counter1++  // Không an toàn: read -> increment -> write có thể bị chen ngang
}

func count1(){
	var wg sync.WaitGroup

	for i := 0; i < loop; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			handleRequest()
		}()
	}

	wg.Wait()
	fmt.Println("Total requests:", counter1)  // Thường in ra <loop, ví dụ 987 do race
	// go run -race main.go
}

var counter2 int64 = 0
var mu sync.Mutex
func handleRequest2() {
	mu.Lock()
	counter2++ 
	mu.Unlock()
}

func count2() {
	var wg sync.WaitGroup
	for i := 0; i < loop; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			handleRequest2()
		}()
	}

	wg.Wait()
	fmt.Println("Total requests:", counter2)
}

var counter3 int64 = 0

func handleRequest3() {
	atomic.AddInt64(&counter3, 1)  // Atomic: read + increment + write liền mạch
}

func count3() {
	var wg sync.WaitGroup

	for i := 0; i < loop; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			handleRequest3()
		}()
	}
	wg.Wait()
	fmt.Println("Total requests:", atomic.LoadInt64(&counter3))  // Đọc atomic để an toàn
}

func measure(name string, fn func()) {
    start := time.Now()
    fn()
    elapsed := time.Since(start)
    fmt.Printf("%s took %v\n", name, elapsed)
}
func main() {
    measure("count1 (race)", count1)
    measure("count2 (mutex)", count2)
    measure("count3 (atomic)", count3)
}