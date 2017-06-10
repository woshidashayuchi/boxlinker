package server

import (
	"net/url"
	"fmt"
	"github.com/livenowhy/dataModel"
)



func NewCallbackActionType(urlstr string) (*dataModel.CallbackActionType, error) {

	u, err := url.Parse(urlstr)

	if err != nil {
		return nil, err
	}

	//要得到字符串中的 k=v 这种格式的查询参数，可以使用 RawQuery 函数。
	// 你也可以将查询参数解析为一个map。
	// 已解析的查询参数 map 以查询字符串为键，对应值字符串切片为值，
	// 所以如何只想得到一个键对应的第一个值，将索引位置设置为 [0] 就行了。
	mp, err := url.ParseQuery(u.RawQuery)
	if err != nil {
		return nil, err
	}

	var actionT dataModel.CallbackActionType
	for k, v := range mp{

		if "Resource_type" == k {
			actionT.Resource_Location.Resource_type = v[0]
		} else if "Resource_uuid" == k {
			actionT.Resource_Location.Resource_uuid = v[0]
		} else if "Team_uuid" == k {
			actionT.Resource_Location.Team_uuid = v[0]
		} else if "Resource_domain" == k {
			actionT.Resource_Location.Resource_domain = v[0]
		} else if "filename" == k {
			actionT.Filename = v[0]
		} else if "size" == k {
			actionT.Size = v[0]
		} else if "mimeType" == k {
			actionT.MimeType = v[0]
		} else if "height" == k {
			actionT.Height = v[0]
		} else if "width" == k {
			actionT.Width = v[0]
		}
		fmt.Println(k, v)
	}

	fmt.Println("%+v", actionT)

	return &actionT, nil
}
