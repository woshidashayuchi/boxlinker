
package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/julienschmidt/httprouter"
)


func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, "Not protected!\n")
}



func main() {

    router := httprouter.New()
    router.GET("/hello/:name", Index)
    log.Fatal(http.ListenAndServe(":8094", router))
}
