package permissions

import (
	"awesome/utils"
	"fmt"
	"path/filepath"

	"github.com/casbin/casbin/v2"
	// "github.com/gofiber/contrib/casbin" use this library instead

	gormadapter "github.com/casbin/gorm-adapter/v3"
)

type Casbin struct {
	Enforcer *casbin.Enforcer
}

func InitCasbin() *Casbin {
	modelConfigFile, err := filepath.Abs("modules/permissions/model.conf")
	if err != nil {
		fmt.Println("casbin init error, config file not found")
		panic(err)
	}

	gormAdapter, err := gormadapter.NewAdapterByDB(utils.GetHostDB())
	if err != nil {
		fmt.Println("casbin init error, cannot create adapter")
		panic(err)
	}

	enforcer, err := casbin.NewEnforcer(modelConfigFile, gormAdapter)
	if err != nil {
		fmt.Println("casbin init error, cannot create enforcer")
		panic(err)
	}

	enforcer.LoadPolicy()
	return &Casbin{Enforcer: enforcer}
}

func (c *Casbin) AddPolicy(sub, obj, act string) error {
	_, err := c.Enforcer.AddPolicy(sub, obj, act)
	if err != nil {
		return err
	}
	return c.Enforcer.SavePolicy()
}

func (c *Casbin) RemovePolicy(sub, obj, act string) error {
	_, err := c.Enforcer.RemovePolicy(sub, obj, act)
	if err != nil {
		return err
	}
	return c.Enforcer.SavePolicy()
}

func (c *Casbin) AddPolicies(rules []struct{ sub, obj, act string }) error {
	for _, policy := range rules {
		_, err := c.Enforcer.AddPolicy(policy.sub, policy.obj, policy.act)
		if err != nil {
			return err
		}
	}
	return c.Enforcer.SavePolicy()
}

func (c *Casbin) RemovePolicies(rules []struct{ sub, obj, act string }) error {
	for _, policy := range rules {
		_, err := c.Enforcer.RemovePolicy(policy.sub, policy.obj, policy.act)
		if err != nil {
			return err
		}
	}
	return c.Enforcer.SavePolicy()
}

func (c *Casbin) SeedDefaultPermissions() error {
	rules := []struct{ sub, obj, act string }{
		{"1", "admin", "view"},
		{"2", "/", "edit"},
		{"3", "/", "view"},
	}
	return c.AddPolicies(rules)
}
