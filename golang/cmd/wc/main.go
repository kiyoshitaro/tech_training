package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"runtime"
	"sync"

	"golang.org/x/exp/mmap"

	// "runtime/pprof"
	"unicode"

	"github.com/pkg/profile"
)

func readbyte0(f io.Reader) (rune, error) {
	var buff [1]byte
	_, err := f.Read(buff[:])
	return rune(buff[0]), err
}

func wc0(filePath string) int {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("could not open file %q: %v", filePath, err)
	}
	defer f.Close()
	words := 0
	inword := false
	for {
		r, err := readbyte0(f)
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("could not read file %q: %v", filePath, err)
		}
		if unicode.IsSpace(r) && inword {
			words++
			inword = false
		}
		if unicode.IsLetter(r) {
			inword = true
		}
	}
	return words
}

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

func wc1(filePath string) int {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("could not open file %q: %v", filePath, err)
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
		// r, err := readbyte0(b)
		r, err := readbyte(b)
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("could not read file %q: %v", filePath, err)
		}
		if unicode.IsSpace(r) && inword {
			words++
			inword = false
		}
		if unicode.IsLetter(r) {
			inword = true
		}
	}
	return words
}

func wc2(filePath string) int {
	// Dùng mmap để ánh xạ toàn bộ file vào không gian địa chỉ bộ nhớ của tiến trình -> truy cập file như truy cập mảng trong RAM
	// CPU Không cần syscall đọc file liên tục -> Không cần copy từ kernel sang user,
	// vì file đã được ánh xạ trực tiếp vào bộ nhớ của tiến trình (zero copy)
	// & chỉ những phần truy cập mới thực sự được nạp vào RAM (do cơ chế demand paging).
	f, err := mmap.Open(filePath)
	if err != nil {
		log.Fatalf("could not open file %q: %v", filePath, err)
	}
	defer f.Close()
	words := 0
	inword := false
	for i := 0; i < int(f.Len()); i++ {
		r := rune(f.At(i))
		if unicode.IsSpace(r) && inword {
			words++
			inword = false
		}
		if unicode.IsLetter(r) {
			inword = true
		}
	}
	return words
}

func wc3(filePath string) int {
	f, err := mmap.Open(filePath)
	if err != nil {
		log.Fatalf("could not open file %q: %v", filePath, err)
	}
	defer f.Close()

	numCores := runtime.NumCPU()
	fileSize := f.Len()
	chunkSize := fileSize / numCores

	// Chuyển mmap.ReaderAt thành []byte để thực hiện song song hóa
	data := make([]byte, fileSize)
	_, err = f.ReadAt(data, 0)
	if err != nil && err.Error() != "EOF" {
		log.Fatalf("could not read file: %v", err)
	}

	// WaitGroup để đợi tất cả goroutine hoàn thành
	var wg sync.WaitGroup
	results := make([]int, numCores)

	for i := 0; i < numCores; i++ {
		wg.Add(1)
		go func(coreID int) {
			defer wg.Done()
			start := coreID * chunkSize
			end := start + chunkSize
			if coreID == numCores-1 {
				end = fileSize
			}
			// Xử lý ranh giới: nếu không phải phần đầu, bỏ qua từ không hoàn chỉnh ở đầu
			if coreID > 0 {
				// Tìm vị trí space gần nhất để tránh cắt từ giữa chừng
				for start < fileSize && unicode.IsLetter(rune(data[start-1])) {
					start++
				}
			}
			words := 0
			inword := false

			for i := start; i < end; i++ {
				r := rune(data[i])
				if unicode.IsSpace(r) && inword {
					words++
					inword = false
				}
				if unicode.IsLetter(r) {
					inword = true
				}
			}
			results[coreID] = words
		}(i)
	}
	wg.Wait()
	totalWords := 0
	for _, count := range results {
		totalWords += count
	}
	return totalWords
}

func main() {
	// Kích hoạt CPU pprof, OS sẽ thiết lập một interrupt (~100 tps) và lấy sample các call stack đang hoạt động->overhead,
	// hàm nào xuất hiện nhiều nhất trong các sample đó là những hàm đang tiêu tốn nhiều CPU nhất.
	// defer profile.Start(profile.CPUProfile, profile.ProfilePath(".")).Stop()

	// Do chính Go Runtime tự ghi lại. Mỗi khi chương trình yêu cầu allocation,
	// Go Runtime sẽ lưu lại stack trace => overhead thấp hơn.
	defer profile.Start(profile.MemProfile, profile.MemProfileRate(1), profile.ProfilePath(".")).Stop()

	// trace ghi lại mọi sự kiện xảy ra trong Runtime: khi nào Goroutine chạy, khi nào dừng, chạy trên CPU nào, phân phối biến động thế nào
	// defer profile.Start(profile.TraceProfile,  profile.ProfilePath(".")).Stop()

	// total := wc0(os.Args[1])
	// total := wc1(os.Args[1])
	// total := wc2(os.Args[1])
	total := wc3(os.Args[1])
	fmt.Printf("%q: %d words\n", os.Args[1], total)
}

// go build
// time ./wc big.txt
// go tool pprof -http=:8080 mem.pprof
// -> CPU Profiler (detect syscall slow -> buffer)
// -> Memory Profiler(detect memloc consumes mem -> heap escape -> global var)
// -> Trace Profiler (detect single thread, goroutine scatter -> group task, goroutine not stable in thread -> worker pool, ...)
