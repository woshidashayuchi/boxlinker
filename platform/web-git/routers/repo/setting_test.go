package repo

import (
	"fmt"
	"testing"
)

func TestCheckUser(t *testing.T) {
	token := "77370210-7790-40c7-868f-70d57e66f51f"
	username := "zhangsai"
	fmt.Println(CheckUser(token, username))
}
