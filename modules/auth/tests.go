package auth

import (
	"bytes"

	"github.com/m3rashid/awesome/modules"
)

var LoginTests = []modules.TestRoute{
	{
		Method:             "POST",
		Description:        "Login with nil credentials",
		ExpectedStatusCode: 400,
		ExpectedBody:       nil,
		RequestBody:        nil,
	},
	{
		Method:             "POST",
		Description:        "Login with empty credentials",
		ExpectedStatusCode: 400,
		ExpectedBody:       bytes.NewBufferString(``),
		RequestBody:        nil,
	},
	{
		Method:             "POST",
		Description:        "Login with empty body credentials",
		ExpectedStatusCode: 400,
		ExpectedBody:       bytes.NewBufferString(`{}`),
		RequestBody:        nil,
	},
	{
		Method:             "POST",
		Description:        "Login with email only",
		ExpectedStatusCode: 400,
		ExpectedBody:       bytes.NewBufferString(`{"email": "m3rashid.hussain@gmail.com"}`),
		RequestBody:        nil,
	},
	{
		Method:             "POST",
		Description:        "Login with email only",
		ExpectedStatusCode: 400,
		ExpectedBody:       bytes.NewBufferString(`{"password": "12345"}`),
		RequestBody:        nil,
	},
	{
		Method:             "POST",
		Description:        "Login with email only",
		ExpectedStatusCode: 400,
		ExpectedBody:       bytes.NewBufferString(`{"email": "m3rashid.hussain@gmail.com", "password": "12345"}`),
		RequestBody:        nil,
	},
}

var RegisterTests = []modules.TestRoute{}

var AuthTestTests = []modules.TestRoute{}

var GetAllUsersTests = []modules.TestRoute{
	{
		Method:             "POST",
		Description:        "Login with email only",
		ExpectedStatusCode: 401,
		ExpectedBody:       nil,
		RequestBody:        nil,
	},
}
