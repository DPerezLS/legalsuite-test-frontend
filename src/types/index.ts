export interface Document {
  id: number | string;
  name: string;
  type?: string;
  url?: string;
}

export interface Demand {
  id: number | string;
  name: string;
  client: string;
  description: string;
  demandType: string;
  status: 'abierta' | 'cerrada';
  documents: Document[];
}

export interface Filters {
  demandTypes: string[];
  clients: string[];
  statuses: string[];
}

export interface FilterOptions {
  demandTypes: string[];
  clients: string[];
  statuses: string[];
}

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}