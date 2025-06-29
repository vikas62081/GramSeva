export interface Pagination<T> {
  data: T;
  page: number;
  limit: number;
  total_pages: number;
  total_count: number;
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
  status_code: number;
}

export interface PaginationRequest {
  page?: number;
  limit?: number;
  search?: string;
}
