import { AddressEntry, TxRecord } from '../types';

const STORAGE_KEYS = {
  ADDRESSES: 'trust_demo_addresses_v1',
  TRANSACTIONS: 'trust_demo_txs_v1',
  ADMIN_SESSION: 'trust_demo_admin_session_v1',
} as const;

export class StorageService {
  static getAddresses(): AddressEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading addresses:', error);
      return [];
    }
  }

  static saveAddresses(addresses: AddressEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses));
    } catch (error) {
      console.error('Error saving addresses:', error);
      throw new Error('Failed to save addresses');
    }
  }

  static getTransactions(): TxRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  }

  static saveTransactions(transactions: TxRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
      throw new Error('Failed to save transactions');
    }
  }

  static clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADDRESSES);
      localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }

  static getAdminSession(): { isAuthenticated: boolean; expiresAt?: number } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (!data) return { isAuthenticated: false };
      
      const session = JSON.parse(data);
      const now = Date.now();
      
      // Check if session is expired (24 hours)
      if (session.expiresAt && now > session.expiresAt) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        return { isAuthenticated: false };
      }
      
      return session;
    } catch (error) {
      console.error('Error loading admin session:', error);
      return { isAuthenticated: false };
    }
  }

  static saveAdminSession(): void {
    try {
      const now = Date.now();
      const session = {
        isAuthenticated: true,
        loginTime: now,
        expiresAt: now + (24 * 60 * 60 * 1000), // 24 hours
      };
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving admin session:', error);
      throw new Error('Failed to save admin session');
    }
  }

  static clearAdminSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch (error) {
      console.error('Error clearing admin session:', error);
    }
  }
}