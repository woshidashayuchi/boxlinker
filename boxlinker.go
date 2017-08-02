package boxlinker

import (
	"strconv"
	"net/http"
)

func ParseHTTPQuery(r *http.Request) PageConfig {
	q := r.URL.Query()
	current_pageS := q.Get("current_page")

	current_page, err := strconv.ParseInt(current_pageS, 10, 0)
	if err != nil || current_page <= 0 {
		current_page = 1
	}

	page_countS := q.Get("page_count")

	page_count, err := strconv.ParseInt(page_countS, 10, 0)
	if err != nil || page_count <= 0 {
		page_count = 10
	}
	pc := PageConfig{}
	pc.CurrentPage = int(current_page)
	pc.PageCount = int(page_count)
	return pc
}
