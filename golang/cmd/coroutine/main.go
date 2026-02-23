package main

import (
	"fmt"
	"io"
	"net/http"
	_ "net/http/pprof"
	"os"
	"runtime/trace"
	"sync"
	"time"
)

func fetchCats(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	var baggage [1024]byte // Nhồi Stack
	baggage[0] = byte(id % 255)

	resp, err := http.Get("https://api.thecatapi.com/v1/images/search?limit=1")
	if err != nil {
		return
	}
	defer resp.Body.Close()
	_, _ = io.ReadAll(resp.Body)
}

func main() {
	// 1. Ghi âm lại toàn bộ lịch sử vào file trace.out
	f, _ := os.Create("trace.out")
	trace.Start(f)
	// Lưu ý: Không defer trace.Stop() ngay mà sẽ Stop thủ công sau khi xong việc

	go func() {
		fmt.Println("🌐 Server pprof đang đợi tại: http://localhost:6060/debug/pprof")
		http.ListenAndServe("localhost:6060", nil)
	}()

	var wg sync.WaitGroup
	numRequests := 30
	fmt.Printf("🚀 Đang chạy %d Goroutines...\n", numRequests)

	for i := 0; i < numRequests; i++ {
		wg.Add(1)
		go fetchCats(i, &wg)
	}

	wg.Wait() 
	fmt.Println("✅ Tất cả Goroutines đã chạy xong!")
	
	// 2. Điểm mấu chốt: Dừng ghi trace sau khi kết thúc
	trace.Stop()
	f.Close()

	fmt.Println("📊 Bạn có 30 giây để soi pprof trước khi chương trình đóng hẳn...")
	time.Sleep(30 * time.Second) 
}
