export type Theme = 'light' | 'dark';

export interface QueryParam {
  key: string;
  value: string;
}

export interface FormDataItem {
  key: string;
  value: string;
  type: 'text' | 'file';
  file?: File | null;
}

export interface RequestData {
  id: string;
  name: string;
  method: string;
  url: string;
  queryParams: QueryParam[];
  headers: QueryParam[];
  body: string;
  contentType: string;
  formData?: FormDataItem[];
}

export interface ResponseData {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data?: any;
  error?: string;
  executionTime?: number;
}

export interface TabData {
  id: string;
  name: string;
  request: RequestData;
  response: ResponseData | null;
} 