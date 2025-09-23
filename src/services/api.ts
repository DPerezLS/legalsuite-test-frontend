import { Demand, Filters } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export class ApiService {
  private async fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  }

  async getAllDemands(): Promise<Demand[]> {
    return this.fetchData<Demand[]>('/demands');
  }

  async getFilteredDemands(filters: Partial<Filters>): Promise<Demand[]> {
    const queryParams = new URLSearchParams();

    if (filters.demandTypes && filters.demandTypes.length > 0) {
      queryParams.append('demandType', filters.demandTypes[0]);
    }

    if (filters.statuses && filters.statuses.length > 0) {
      queryParams.append('status', filters.statuses[0]);
    }

    if (filters.clients && filters.clients.length > 0) {
      queryParams.append('client', filters.clients[0]);
    }

    const endpoint = queryParams.toString()
      ? `/demands?${queryParams.toString()}`
      : '/demands';

    return this.fetchData<Demand[]>(endpoint);
  }

  async getAvailableFilters() {
    const [demandTypesResponse, statusesResponse, clientsResponse] = await Promise.all([
      this.fetchData<Array<{id: number, name: string}>>('/available_demand_types'),
      this.fetchData<Array<{id: number, name: string}>>('/available_statuses'),
      this.fetchData<Array<{id: number, name: string}>>('/available_clients')
    ]);

    return {
      demandTypes: demandTypesResponse.map(item => item.name),
      statuses: statusesResponse.map(item => item.name),
      clients: clientsResponse.map(item => item.name)
    };
  }
}

export const apiService = new ApiService();