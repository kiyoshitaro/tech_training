package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"

	// "runtime"
	// "runtime/pprof"
	"unicode"

	"github.com/pkg/profile"
)

var buff [1]byte
func readbyte(f io.Reader) (rune, error) {
	// (do params truyền vào gắn với buff là interface (io.Reader), 
	// interface trong Go có thể trỏ đến bất kỳ kiểu nào (file, buffer,..). compiler và runtime không biết 
	// chắc bên trong Reader sẽ làm gì với dữ liệu bạn đưa nên buff sẽ 
	// được heap allocated cẩn thận theo escape analysis (sẽ đưa hết cả file lên heap) -> GC phải dọn
	// )   => khai báo global để tái sử dụng một buffer duy nhất
	// var buff [1]byte
	_, err := f.Read(buff[:])
	return rune(buff[0]), err
}

func main() {
	// Kích hoạt CPU pprof, OS sẽ thiết lập một interrupt (~100 tps) và lấy sample các call stack đang hoạt động->overhead, 
	// hàm nào xuất hiện nhiều nhất trong các sample đó là những hàm đang tiêu tốn nhiều CPU nhất.
	// defer profile.Start(profile.CPUProfile, profile.ProfilePath(".")).Stop()
	// Do chính Go Runtime tự ghi lại. Mỗi khi chương trình yêu cầu allocation, 
	// Go Runtime sẽ lưu lại stack trace => overhead thấp hơn.
	// defer profile.Start(profile.MemProfile, profile.MemProfileRate(1), profile.ProfilePath(".")).Stop()
	defer profile.Start(profile.TraceProfile,  profile.ProfilePath(".")).Stop()

	// fcpu, _ := os.Create("cpu.pprof")
	// pprof.StartCPUProfile(fcpu)
	// defer pprof.StopCPUProfile()
	// runtime.MemProfileRate = 1 * 1024 // Mỗi 64KB allocated sẽ ghi lại một sample vào memory profile
	// fmem, _ := os.Create("mem.pprof")
	// defer func() {
	// 	pprof.WriteHeapProfile(fmem)
	// 	fmem.Close()
	// }()

	f, err := os.Open(os.Args[1])
	if err != nil {
		log.Fatalf("could not open file %q: %v", os.Args[1], err)
	}
	defer f.Close()

	words := 0
	inword := false
	// cpu profiler thấy lượng lớn CPU time nằm ở hàm syscall, nhưng syscall không chậm, do chương trình đang gọi quá nhiều lần
	// Trong Go, các thao tác read/write mặc định là unbuffered. 
	// 1. Nếu đọc 1 file lớn từng byte một, mỗi byte sẽ tạo ra một syscall và chuyển user-kernel liên tục -> overhead lớn
	// 2. Goroutine thực hiện syscall mà không xong sớm, Runtime sẽ handoff gây thêm đổi luồng liên tục
	b := bufio.NewReader(f)
	for {
		r, err := readbyte(b)
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("could not read file %q: %v", os.Args[1], err)
		}
		if unicode.IsSpace(r) && inword {
			words++
			inword = false
		}
		if unicode.IsLetter(r) {
			inword = true
		}
	}
	fmt.Printf("%q: %d words\n", os.Args[1], words)
}
// go build
// time ./wc big.txt
// go tool pprof -http=:8080 mem.pprof
// -> CPU Profiler (detect syscall slow -> buffer) 
// -> Memory Profiler(detect memloc consumes mem -> heap escape -> global var) 
// -> Trace Profiler (detect single thread, goroutine scatter -> group task, goroutine not stable in thread -> worker pool, ...)