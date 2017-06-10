package main

import (
	"github.com/livenowhy/dbModel/oauth"
	"fmt"
)

func main() {

	d, rp, err := oauth.RepoList("000b91c9936b6be5252c925c566be6a4e1ac3718")

	if err != nil {
		fmt.Printf("is error: %s\n", err.Error())
	}

	fmt.Printf("%v \n", d)
	fmt.Printf("%v \n", rp)
	fmt.Println(rp.NextPage)
	fmt.Println(rp.PrevPage)
	fmt.Println(rp.FirstPage)
	fmt.Println(rp.LastPage)


}
