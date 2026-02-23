// mandelbrot example code adapted from Francesc Campoy's mandelbrot package.
// https://github.com/campoy/mandelbrot
package main

import (
	"flag"
	"image"
	"image/color"
	"image/png"
	"log"
	"os"
	"sync"

	"github.com/pkg/profile"
)

// tag::mandelbrot[]

func main() {
	defer profile.Start(profile.TraceProfile, profile.ProfilePath(".")).Stop()
	// end::mandelbrot[]

	var (
		height  = flag.Int("h", 1024, "height of the output image in pixels")
		width   = flag.Int("w", 1024, "width of the output image in pixels")
		mode    = flag.String("mode", "seq", "mode: seq, px, row, workers")
		workers = flag.Int("workers", 1, "number of workers to use")
	)
	flag.Parse()

	const output = "mandelbrot.png"

	// open a new file
	f, err := os.Create(output)
	if err != nil {
		log.Fatal(err)
	}

	// create the image
	c := make([][]color.RGBA, *height)
	for i := range c {
		c[i] = make([]color.RGBA, *width)
	}

	img := &img{
		h: *height,
		w: *width,
		m: c,
	}

	switch *mode {
	case "seq":
		seqFillImg(img)
	case "px":
		oneToOneFillImg(img)
	case "row":
		onePerRowFillImg(img)
	case "workers":
		nWorkersFillImg(img, *workers)
	default:
		panic("unknown mode")
	}

	// and encoding it
	if err := png.Encode(f, img); err != nil {
		log.Fatal(err)
	}
}

type img struct {
	h, w int
	m    [][]color.RGBA
}

func (m *img) At(x, y int) color.Color { return m.m[x][y] }
func (m *img) ColorModel() color.Model { return color.RGBAModel }
func (m *img) Bounds() image.Rectangle { return image.Rect(0, 0, m.h, m.w) }

// tag::seqfillimg[]
func seqFillImg(m *img) {
	for i, row := range m.m {
		for j := range row {
			fillPixel(m, i, j)
		}
	}
}

// end::seqfillimg[]

func oneToOneFillImg(m *img) {
	var wg sync.WaitGroup
	wg.Add(m.h * m.w)
	for i, row := range m.m {
		for j := range row {
			go func(i, j int) {
				fillPixel(m, i, j)
				wg.Done()
			}(i, j)
		}
	}
	wg.Wait()
}

func onePerRowFillImg(m *img) {
	var wg sync.WaitGroup
	wg.Add(m.h)
	for i := range m.m {
		go func(i int) {
			for j := range m.m[i] {
				fillPixel(m, i, j)
			}
			wg.Done()
		}(i)
	}
	wg.Wait()
}

func nWorkersFillImg(m *img, workers int) {
	c := make(chan int, 1024)
	var wg sync.WaitGroup
	wg.Add(workers)
	for i := 0; i < workers; i++ {
		go func() {
			for i := range c {
				for j := range m.m[i] {
					fillPixel(m, i, j)
				}
			}
			wg.Done()
		}()
	}

	for i := range m.m {
		c <- i
	}
	close(c)
	wg.Wait()
}

func fillPixel(m *img, x, y int) {
	const n = 1000
	const Limit = 2.0
	Zr, Zi, Tr, Ti := 0.0, 0.0, 0.0, 0.0
	Cr := (2*float64(x)/float64(n) - 1.5)
	Ci := (2*float64(y)/float64(n) - 1.0)

	for i := 0; i < n && (Tr+Ti <= Limit*Limit); i++ {
		Zi = 2*Zr*Zi + Ci
		Zr = Tr - Ti + Cr
		Tr = Zr * Zr
		Ti = Zi * Zi
	}
	paint(&m.m[x][y], Tr, Ti)
}

func paint(c *color.RGBA, x, y float64) {
	n := byte(x * y * 2)
	c.R, c.G, c.B, c.A = n, n, n, 255
}

// CPU Profile chỉ cho biết "code nào chạy nhiều nhất", nhưng nếu dòng code đó là tính toán bắt buộc,
// sẽ không thể làm gì thêm ở mức độ code đơn lẻ => dùng trace ghi lại mọi sự kiện xảy ra trong Runtime:
// khi nào Goroutine chạy, khi nào nó dừng, nó chạy trên CPU nào
// go build

// nhiều CPU Core, nhưng biểu đồ chỉ hiện duy nhất một đường màu xanh lá cây chạy trên một CPU => đang single thread
// ./mandelbrot

// Song song hóa quá mức làm chtrinh lag và chậm đi
// Công việc tính 1 pixel là quá nhỏ so với chi phí để Go Runtime tạo ra, lập lịch và quản lý 1 Goroutine.
// ./mandelbrot -mode px

// nhanh gấp 4 lần do mỗi Goroutine đã làm một lượng việc vừa đủ lớn (tính 1000 pixel một lúc).
// ./mandelbrot -mode row

// Worker Pool: Tạo ra đúng 8 Worker (tương ứng 8 CPU). Các Worker này lắng nghe trên một Buffered Channel. 
// Luồng chính đẩy tọa độ các hàng vào Channel đó 
// => các Worker (Goroutine số 10, 11,...) bám trụ rất lâu trên một CPU, xử lý hết hàng này đến hàng khác mà không bị switch. 
// Giúp tận dụng CPU Cache tốt hơn một chút nhưng không tạo ra sự khác biệt quá lớn về tổng thời gian. Do Go Scheduler 
// được thiết kế cực tốt để quản lý việc tạo và hủy Goroutine
// ./mandelbrot -mode workers -workers 8
// go tool trace trace.out
