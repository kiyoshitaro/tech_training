package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

var dbData = []string{"id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9", "id10"}

func simpleGoRoutine() {
	// Write me example using goroutine for concurrency to make heavy work more efficient
	for i := 0; i < len(dbData); i++ {
		// GO for run concurrency
		go func(j int) {
			var delay float32 = rand.Float32() * 2000
			time.Sleep(time.Duration(delay))
			fmt.Printf("Result: %s\n", dbData[j])
		}(i)
	}

}

// Function to multiply two matrices without concurrency
func multiplyMatrices(a, b [][]int) [][]int {
	size := len(a)                // Get the size of the matrix
	result := make([][]int, size) // Create a result matrix with the same size
	for i := range result {
		result[i] = make([]int, size) // Initialize each row of the result matrix
	}

	for i := 0; i < size; i++ {
		for j := 0; j < size; j++ {
			sum := 0
			for k := 0; k < size; k++ {
				sum += a[i][k] * b[k][j] // Perform the multiplication and sum up the results
			}
			result[i][j] = sum // Store the result in the result matrix
		}
	}
	return result // Return the result matrix
}

// Function to multiply two matrices concurrently
func multiplyMatricesConcurrent(a, b [][]int, result [][]int, row int, wg *sync.WaitGroup) {
	defer wg.Done() // Decrement the WaitGroup counter when the goroutine completes
	size := len(a)  // Get the size of the matrix
	for j := 0; j < size; j++ {
		sum := 0
		for k := 0; k < size; k++ {
			sum += a[row][k] * b[k][j] // Perform the multiplication and sum up the results
		}
		result[row][j] = sum // Store the result in the result matrix
	}
}
func main() {
	// t0 := time.Now()
	// simpleGoRoutine()
	// fmt.Println(time.Since(t0))

	size := 500              // Define the size of the matrices
	a := make([][]int, size) // Create matrix a
	b := make([][]int, size) // Create matrix b
	for i := range a {
		a[i] = make([]int, size) // Initialize each row of matrix a
		b[i] = make([]int, size) // Initialize each row of matrix b
		for j := range a[i] {
			a[i][j] = rand.Intn(100) // Fill matrix a with random integers
			b[i][j] = rand.Intn(100) // Fill matrix b with random integers
		}
	}

	// Measure time for non-concurrent execution
	start := time.Now()                                         // Record the start time
	multiplyMatrices(a, b)                                      // Perform matrix multiplication without concurrency
	duration := time.Since(start)                               // Calculate the duration
	fmt.Printf("Time taken without goroutines: %v\n", duration) // Print the duration

	// Measure time for concurrent execution
	start = time.Now()            // Record the start time
	result := make([][]int, size) // Create a result matrix
	for i := range result {
		result[i] = make([]int, size) // Initialize each row of the result matrix
	}

	var wg sync.WaitGroup // Create a WaitGroup to wait for all goroutines to finish
	for i := 0; i < size; i++ {
		wg.Add(1)                                           // Increment the WaitGroup counter
		go multiplyMatricesConcurrent(a, b, result, i, &wg) // Start a goroutine for each row
	}
	wg.Wait()                                                // Wait for all goroutines to finish
	duration = time.Since(start)                             // Calculate the duration
	fmt.Printf("Time taken with goroutines: %v\n", duration) // Print the duration
}
