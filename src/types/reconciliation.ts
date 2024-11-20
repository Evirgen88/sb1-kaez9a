export interface ReconciliationTransaction {
  id: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerNumber: string;
  transactionDate: string;
  status: 'matched' | 'unmatched';
  mismatchReason?: string;
  bankReference?: string;
  bankAmount?: number;
  bankDate?: string;
}

export interface FTPSettings {
  id: string;
  bankName: string;
  accountName: string;
  host: string;
  port: number;
  username: string;
  password: string;
  remotePath: string;
  filePattern: string;
  isActive: boolean;
  lastSync?: string;
}

export interface UploadedFile {
  id: string;
  bankName: string;
  fileName: string;
  uploadDate: string;
  status: 'processing' | 'completed' | 'failed';
  totalRecords?: number;
  matchedRecords?: number;
  unmatchedRecords?: number;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  fileFormat: 'excel' | 'csv' | 'txt';
  delimiter?: string;
  encoding?: string;
  hasHeader?: boolean;
  fieldMappings: {
    orderNumber: string;
    amount: string;
    currency: string;
    customerNumber: string;
    transactionDate: string;
    bankReference: string;
  };
}