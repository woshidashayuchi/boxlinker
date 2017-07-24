package dataModel





type RabbitSerivce struct {
	Queue   string `yaml:"queue,omitempty"`
	Service string `yaml:"service,omitempty"`
	Port    string `yaml:"port,omitempty"`
}
