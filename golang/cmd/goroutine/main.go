package main
import ("fmt"
"time"
"math/rand"
)

var dbData = []string{"id1", "id2", "id3", 	"id4"}
func main(){
	t0 := time.Now()
	for i:=0;i<len(dbData);i++{
		// GO for run concurrency
		go func(j int){
			var delay float32 = rand.Float32()*2000
			time.Sleep(time.Duration(delay))
			fmt.Printf("Result: %s\n", dbData[j])
		}(i)
	}
	fmt.Println(time.Since(t0))
}