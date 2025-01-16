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

export interface Jurisdiction {
  id: string;
  name: string;
  imageUrl: string;
  referenceUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface GetJurisdictionsResponse {
  data: Jurisdiction[];
  metaData: Metadata;
}

export interface GetJurisdictionsQueryParams {
  page: number;
  limit: number;
}