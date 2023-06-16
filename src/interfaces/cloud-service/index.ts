import { CustomerServiceInterface } from 'interfaces/customer-service';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CloudServiceInterface {
  id?: string;
  name: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  customer_service?: CustomerServiceInterface[];
  company?: CompanyInterface;
  _count?: {
    customer_service?: number;
  };
}

export interface CloudServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
}
