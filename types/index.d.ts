/**
 * Common Types
 * Shared across the application
 */

// Paginated Response Type
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Sort Direction
export type SortDirection = 'ASC' | 'DESC';

// API Error Response
export interface ApiError {
  message: string;
  status: number;
  timestamp: string;
  path?: string;
}
