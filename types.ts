export interface Question {
  id: string;
  key: string;
  value: string;
  public: boolean;
}

// Define the structure of the metadata in the response
export interface Metadata {
  currentPage: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

// Define the structure of the entire response
export interface GetQuestionsResponse {
  data: Question[];
  metadata: Metadata;
}

export interface GetQuestionsQueryParams {
  page: number;
  limit: number;
}
