import { SqlID, Time } from './base';

export type Tenant = {
  id: SqlID;
  name: string;
  tenantUrl: string;
  createdAt: Time;
  tenantDBConnectionString: string;
  tenantOwnerId: SqlID;
  tenantOwner?: TenantOwner;
};

export type TenantOwner = {
  id: SqlID;
  name: string;
  email: string;
  password: string;
  createdAt: Time;
};
