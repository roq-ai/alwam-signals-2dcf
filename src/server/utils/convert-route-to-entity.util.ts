const mapping: Record<string, string> = {
  'cloud-services': 'cloud_service',
  companies: 'company',
  'customer-services': 'customer_service',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
