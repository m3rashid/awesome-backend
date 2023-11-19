package auth

import "github.com/m3rashid/awesome/modules"

var LoginTests = []modules.TestRoute{
	{
		Method:             "POST",
		Description:        "Login with valid credentials",
		ExpectedStatusCode: 400,
		ExpectedBody:       nil,
		RequestBody:        nil,
	},
}

var RegisterTests = []modules.TestRoute{}

var AuthTestTests = []modules.TestRoute{}

var GetAllUsersTests = []modules.TestRoute{}
