package helpers

import (
	"fmt"
	"path/filepath"

	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"github.com/m3rashid/awesome/db"
)

type Casbin struct {
	Enforcer *casbin.CachedEnforcer
}

func InitCasbin() *Casbin {
	permissionsFile, err := filepath.Abs("modules/helpers/permission.conf")
	if err != nil {
		fmt.Println("casbin init error, config file not found")
		panic(err)
	}

	enforcer, err := casbin.NewCachedEnforcer(permissionsFile)
	if err != nil {
		fmt.Println("casbin init error, cannot create enforcer")
		panic(err)
	}

	gormadapter.NewAdapterByDB(db.GetDb())
	enforcer.LoadPolicy()
	return &Casbin{Enforcer: enforcer}
}

func (c *Casbin) AddPolicy(sub, obj, act string) error {
	_, err := c.Enforcer.AddPolicy(sub, obj, act)
	if err != nil {
		return err
	}
	return c.Enforcer.InvalidateCache()
}

func (c *Casbin) RemovePolicy(sub, obj, act string) error {
	_, err := c.Enforcer.RemovePolicy(sub, obj, act)
	if err != nil {
		return err
	}
	return c.Enforcer.InvalidateCache()
}

func (c *Casbin) AddPolicies(rules []struct{ sub, obj, act string }) error {
	for _, policy := range rules {
		_, err := c.Enforcer.AddPolicy(policy.sub, policy.obj, policy.act)
		if err != nil {
			return err
		}
	}
	return c.Enforcer.InvalidateCache()
}

func (c *Casbin) RemovePolicies(rules []struct{ sub, obj, act string }) error {
	for _, policy := range rules {
		_, err := c.Enforcer.RemovePolicy(policy.sub, policy.obj, policy.act)
		if err != nil {
			return err
		}
	}
	return c.Enforcer.InvalidateCache()
}

func (c *Casbin) SeedDefaultPermissions() error {
	rules := []struct{ sub, obj, act string }{
		{"1", "admin", "view"},
		{"2", "/", "edit"},
		{"3", "/", "view"},
	}
	return c.AddPolicies(rules)
}
