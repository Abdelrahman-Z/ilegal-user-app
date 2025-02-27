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


export type User = {
  id: string;
  userName: string;
  email: string;
  phone: string;
  isActive: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userPermissions: Array<any>; // Adjust type if permissions have a specific structure
  userRole: Array<{ roleId: string }>;
};

export interface Role {
  id: string;
  name: string;
  permissions: {
    id: string;
    name: string;
  }[];
}


export interface Permission {
  id: string;
  name: string;
}

export interface PermissionCategory {
  id: string;
  name: string;
  mainCategoryId: string;
  mainCategoryName: string;
  permissions: Permission[];
}

export interface Template{
    id: string,
    name: string,
    imageUrl: string,
    attachmentUrl?: string,
    attachmentFileUrl?: string,
    createdAt: Date,
    updatedAt: Date,
    tenantId: string,
    language: string,
}
export interface DocumentMetadata {
  id: string;
  documentId: string;
  sourceId: string;
  content: string;
  createdAt: string; 
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  jurisdictionId: string;
  createdAt: string; 
  updatedAt: string;
  isSigned: boolean;
  isValidated: boolean;
  language: string;
  ownerId: string;
  tenantId: string;
  templateId?: string | null;
  preConfiguredTemplateId?: string | null;
  DocumentMetadata: DocumentMetadata[]; 
  contentUrl: string
}

export interface ValidatedDocument {
    id: string;
    name: string;
    language: string;
    validationHash: string;
    isValidated: boolean;
    validatedBy: string;
    validatedAt: string;
    validatedByUser: {
        username: string;
        imageUrl: string;
    };
}


export interface Token {
  id: string;
  keyWord: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignDocuments {
  id: string;
  signName: string;
  documentSignImageUrl: string;
}
