package main

import (
	"fmt"
	"sync"
	"time"
)

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum
}

// Channel
func demo1() {
	s := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c
	fmt.Println(x, y)
}

func demo2() {
	c := make(chan int)
	go func() {
		for i := 1; i <= 100; i++ {
			// time.Sleep(time.Second * 1)
			c <- i
			fmt.Println("Sent", i)
		}
	}()
	// speed out/in is the same
	for i := 1; i <= 100; i++ {
		// time.Sleep(time.Second * 1)
		fmt.Println("Received", <-c)
	}
}

// Buffered channel
func demo3() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}

// Range and close
func demo4() {
	c := make(chan int)
	go func() {
		for i := 1; i <= 10; i++ {
			c <- i
			fmt.Println("Sent", i)
		}
		// dont usually need to close, need close when to told nomore value like in range loop
		close(c)
	}()
	// for {
	// 	v, ok := <- c
	// 	if !ok {
	// 		break
	// 	}
	// 	fmt.Println("Received", v)
	// }
	for v := range c {
		fmt.Println("Received", v)
	}
}

// Select
func demo5() {
	c1 := make(chan int)
	c2 := make(chan int)
	go func() {
		time.Sleep(time.Second * 2)
		c1 <- 1
	}()
	go func() {
		time.Sleep(time.Second * 1)
		c2 <- 2
	}()

	// // Received at sametime after 2s (c1 block)
	// fmt.Println("Received", <-c1)
	// fmt.Println("Received", <-c2)

	for i := 0; i < 2; i++ {
		select {
		case v1 := <-c1:
			fmt.Println("Received", v1)
		case v2 := <-c2:
			fmt.Println("Received", v2)
		}
	}
}

// Mutex & WaitGroup
func demo6() {
	lock := new(sync.Mutex)
	wg := new(sync.WaitGroup)
	count := 0
	for i := 0; i < 5; i++ {
		// +1
		wg.Add(1)
		go func() {
			for j := 0; j < 10000; j++ {
				lock.Lock()
				count += 1
				fmt.Println("Received", count)
				lock.Unlock()
			}
			// -1
			wg.Done()
		}()
	}
	// wail counter -> 0 
	wg.Wait()
	// time.Sleep(time.Second * 3)
}

// Main is a routine
func main() {
	// demo1()
	// demo2()
	// demo3()
	// demo4()
	// demo5()
	demo6()
}
