package auth

type AuthRequired struct {
}

func NewAuthRequired() *AuthRequired {
	return &AuthRequired{}
}
