package util

import (
	"bytes"
	"fmt"
	"os/exec"
)

// 执行 shell 命令
func ExecCommand(name string, arg ...string) (err error) {
	// output, 是否输出结果
	cmd := exec.Command(name, arg...)

	var stderr bytes.Buffer
	var stdout bytes.Buffer
	cmd.Stderr = &stderr
	cmd.Stdout = &stdout
	err = cmd.Run()
	if err != nil {
		fmt.Println("exec command is error: " + stderr.String())
		fmt.Println(err.Error())
		return
	}
	cmd.Wait()
	fmt.Println(stdout.String())
	fmt.Println(stderr.String())

	return err
}


func ExecCommandOut(name string, arg ...string) (stderr, stdout bytes.Buffer, err error) {
	/* 执行 shell 命令, 返回输出 */
	cmd := exec.Command(name, arg...)
	cmd.Stderr = &stderr
	cmd.Stdout = &stdout
	err = cmd.Run()
	if err != nil {
		return
	}
	cmd.Wait()
	return
}