import { AddressEntry, TxRecord, TrustCategory, CategoryMap } from '../types';
import { StorageService } from './storage';

// Demo credentials - in production, this would be handled securely
const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'demo123',
};

export const CATEGORY_MAP: CategoryMap = {
  A: {
    label: 'Trustworthy',
    trustRange: '80-100',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    advice: 'This address is highly trusted. Safe to proceed.',
  },
  B: {
    label: 'Good',
    trustRange: '60-80',
    color: 'light-green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    advice: 'This address has a good reputation. Generally safe to proceed.',
  },
  C: {
    label: 'Suspicious',
    trustRange: '40-60',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    advice: 'This address has mixed reviews. Proceed with caution.',
  },
  D: {
    label: 'Not Safe',
    trustRange: '0-40',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    advice: 'This address is flagged as risky. Not recommended for transactions.',
  },
};

export class DataService {
  static getAllAddresses(): AddressEntry[] {
    return StorageService.getAddresses().sort((a, b) => b.createdAt - a.createdAt);
  }

  static addAddress(address: string, category: TrustCategory, note?: string): void {
    const addresses = StorageService.getAddresses();
    const existingIndex = addresses.findIndex(
      (entry) => entry.address.toLowerCase() === address.toLowerCase()
    );

    const newEntry: AddressEntry = {
      address: address.trim(),
      category,
      note: note?.trim() || undefined,
      createdAt: Date.now(),
    };

    if (existingIndex >= 0) {
      addresses[existingIndex] = newEntry;
    } else {
      addresses.push(newEntry);
    }

    StorageService.saveAddresses(addresses);
  }

  static removeAddress(address: string): void {
    const addresses = StorageService.getAddresses();
    const filtered = addresses.filter(
      (entry) => entry.address.toLowerCase() !== address.toLowerCase()
    );
    StorageService.saveAddresses(filtered);
  }

  static findAddress(address: string): AddressEntry | null {
    const addresses = StorageService.getAddresses();
    return addresses.find(
      (entry) => entry.address.toLowerCase() === address.toLowerCase()
    ) || null;
  }

  static getAllTransactions(): TxRecord[] {
    return StorageService.getTransactions().sort((a, b) => b.timestamp - a.timestamp);
  }

  static addTransaction(toAddress: string, amount: number): TxRecord {
    const transactions = StorageService.getTransactions();
    const txRecord: TxRecord = {
      txId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      toAddress: toAddress.trim(),
      amount,
      timestamp: Date.now(),
    };

    transactions.unshift(txRecord);
    
    // Keep only latest 200 transactions
    if (transactions.length > 200) {
      transactions.splice(200);
    }

    StorageService.saveTransactions(transactions);
    return txRecord;
  }

  static clearAllData(): void {
    StorageService.clearAllData();
  }

  static getCategoryInfo(category: TrustCategory): CategoryInfo {
    return CATEGORY_MAP[category];
  }

  static initializeDemoData(): void {
    const existingAddresses = StorageService.getAddresses();
    if (existingAddresses.length === 0) {
      const demoAddresses: AddressEntry[] = [
        {
          address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
          category: 'A',
          note: 'Major exchange wallet',
          createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 1 week ago
        },
        {
          address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
          category: 'B',
          note: 'Verified merchant',
          createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
        },
        {
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          category: 'C',
          note: 'Mixed transaction history',
          createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        },
        {
          address: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
          category: 'D',
          note: 'Flagged for suspicious activity',
          createdAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        },
      ];
      
      StorageService.saveAddresses(demoAddresses);
    }
  }

  static authenticateAdmin(username: string, password: string): boolean {
    // Simple demo authentication - in production, use proper hashing and secure storage
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      StorageService.saveAdminSession();
      return true;
    }
    return false;
  }

  static isAdminAuthenticated(): boolean {
    const session = StorageService.getAdminSession();
    return session.isAuthenticated;
  }

  static logoutAdmin(): void {
    StorageService.clearAdminSession();
  }

  static getDemoCredentials(): { username: string; password: string } {
    return DEMO_CREDENTIALS;
  }
}