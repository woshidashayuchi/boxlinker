package main

import (
	"github.com/livenowhy/goTools/util"
	"github.com/livenowhy/goTools/tokentools"
)
import (
	"fmt"
	"time"
)

func PushImage(sourceImage, targetImage string) (err error) {

	// tag
	err = util.ExecCommand("docker", "tag", sourceImage, targetImage)

	if err != nil {
		return
	}

	// push
	err = util.ExecCommand("docker", "push", targetImage)
	if err != nil {
		return
	}

	// rmi
	err = util.ExecCommand("docker", "rmi", targetImage)
	if err != nil {
		return
	}

	return nil
}

func doTest() {

	sourceImage := "index.boxlinker.com/liuzhangpei/pause"
	sourceImageName := "index.boxlinker.com/liutest/"
	rand_str := tokentools.GetRandomStringNoNumber(9)

	targetImage := sourceImageName + rand_str

	fmt.Printf("sourceImage: %s \n", sourceImage)
	fmt.Printf("targetImage: %s \n", targetImage)

	err := PushImage(sourceImage, targetImage)

	if err != nil {
		fmt.Printf("PushImage is error: %s \n", err.Error())
	}
}

func main() {



	for i:=1; i < 200; i++ {
		time.Sleep(time.Millisecond * 600)
		doTest()
	}

}
