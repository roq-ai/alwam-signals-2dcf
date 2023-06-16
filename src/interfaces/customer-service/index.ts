import { CloudServiceInterface } from 'interfaces/cloud-service';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerServiceInterface {
  id?: string;
  cloud_service_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  cloud_service?: CloudServiceInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CustomerServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  cloud_service_id?: string;
  user_id?: string;
}
