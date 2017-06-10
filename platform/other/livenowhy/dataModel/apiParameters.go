package dataModel

type ContextData struct {
	Token string `json:"token"`
	Resource_uuid string `json:"resource_uuid"`
	Action string `json:"action"`
}

type RpcData struct {
	API  string `json:"api"`
	Context  ContextData `json:"context"`
	Parameters map[string]interface{} `json:"parameters"`
}