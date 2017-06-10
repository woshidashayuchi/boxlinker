package dataModel

type ResourceQuery struct {
	QueryParameter []ResourceLocation `json:"queryparameter"`
}


type SetFileUrl struct {
	FileUrl string `json:"file_url"`
}

type ResourceLocation struct {
	// 资源位置
	Team_uuid string `json:"team_uuid" db:"team_uuid"`  // 组织 uuid 区分不同用户
	Resource_type   string `json:"resource_type" db:"resource_type"`     // 资源类型, (用户头像,镜像头像)
	Resource_uuid   string `json:"resource_uuid" db:"resource_uuid"`     // 资源的 uuid (用户头像采用用户组织的UUID, 镜像图像采用镜像的uuid)
	Resource_domain string `json:"resource_domain" db:"resource_domain"` // 资料所属的域(前端预定即可)
}

type CallbackActionType struct {
	Resource_Location ResourceLocation
	Filename          string `json:"filename"` // 文件名
	Size              string `json:"size"`
	MimeType          string `json:"mimeType"`
	Height            string `json:"height"`
	Width             string `json:"width"`
	ImageUrl          string `json:"imageurl"`
}


// storage_uuid  team_uuid resource_type resource_uuid resource_domain storage_url   create_time  update_time