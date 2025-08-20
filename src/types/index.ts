export type TrustCategory = 'A' | 'B' | 'C' | 'D';

export interface AddressEntry {
  address: string;
  category: TrustCategory;
  note?: string;
  createdAt: number;
}

export interface TxRecord {
  txId: string;
  toAddress: string;
  amount: number;
  timestamp: number;
}

export interface AdminSession {
  isAuthenticated: boolean;
  loginTime: number;
  expiresAt: number;
}

export interface CategoryInfo {
  label: string;
  trustRange: string;
  color: string;
  bgColor: string;
  textColor: string;
  advice: string;
}

export type CategoryMap = Record<TrustCategory, CategoryInfo>;