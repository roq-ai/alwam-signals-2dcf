import axios from 'axios';
import queryString from 'query-string';
import { CloudServiceInterface, CloudServiceGetQueryInterface } from 'interfaces/cloud-service';
import { GetQueryInterface } from '../../interfaces';

export const getCloudServices = async (query?: CloudServiceGetQueryInterface) => {
  const response = await axios.get(`/api/cloud-services${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCloudService = async (cloudService: CloudServiceInterface) => {
  const response = await axios.post('/api/cloud-services', cloudService);
  return response.data;
};

export const updateCloudServiceById = async (id: string, cloudService: CloudServiceInterface) => {
  const response = await axios.put(`/api/cloud-services/${id}`, cloudService);
  return response.data;
};

export const getCloudServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cloud-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCloudServiceById = async (id: string) => {
  const response = await axios.delete(`/api/cloud-services/${id}`);
  return response.data;
};
