import axios from 'axios';
import queryString from 'query-string';
import { CustomerServiceInterface, CustomerServiceGetQueryInterface } from 'interfaces/customer-service';
import { GetQueryInterface } from '../../interfaces';

export const getCustomerServices = async (query?: CustomerServiceGetQueryInterface) => {
  const response = await axios.get(`/api/customer-services${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomerService = async (customerService: CustomerServiceInterface) => {
  const response = await axios.post('/api/customer-services', customerService);
  return response.data;
};

export const updateCustomerServiceById = async (id: string, customerService: CustomerServiceInterface) => {
  const response = await axios.put(`/api/customer-services/${id}`, customerService);
  return response.data;
};

export const getCustomerServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerServiceById = async (id: string) => {
  const response = await axios.delete(`/api/customer-services/${id}`);
  return response.data;
};
