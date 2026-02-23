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

func readbyte(f io.Reader) (rune, error) {
	var buff [1]byte
	_, err := f.Read(buff[:])
	return rune(buff[0]), err
}

func main() {
	// defer profile.Start(profile.CPUProfile, profile.ProfilePath(".")).Stop()
	defer profile.Start(profile.MemProfile, profile.MemProfileRate(1), profile.ProfilePath(".")).Stop()

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
