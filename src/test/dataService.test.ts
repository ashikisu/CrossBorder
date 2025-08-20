import { describe, it, expect, beforeEach } from 'vitest';
import { DataService } from '../services/dataService';
import { StorageService } from '../services/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('DataService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Address Management', () => {
    it('should add a new address', () => {
      DataService.addAddress('test-address', 'A', 'Test note');
      const addresses = DataService.getAllAddresses();
      
      expect(addresses).toHaveLength(1);
      expect(addresses[0]).toMatchObject({
        address: 'test-address',
        category: 'A',
        note: 'Test note',
      });
      expect(addresses[0].createdAt).toBeTypeOf('number');
    });

    it('should update existing address', () => {
      DataService.addAddress('test-address', 'A', 'Original note');
      DataService.addAddress('test-address', 'B', 'Updated note');
      
      const addresses = DataService.getAllAddresses();
      expect(addresses).toHaveLength(1);
      expect(addresses[0]).toMatchObject({
        address: 'test-address',
        category: 'B',
        note: 'Updated note',
      });
    });

    it('should find address case-insensitively', () => {
      DataService.addAddress('Test-Address', 'A');
      
      const found = DataService.findAddress('test-address');
      expect(found).toBeTruthy();
      expect(found?.address).toBe('Test-Address');
    });

    it('should remove address', () => {
      DataService.addAddress('test-address', 'A');
      DataService.removeAddress('test-address');
      
      const addresses = DataService.getAllAddresses();
      expect(addresses).toHaveLength(0);
    });
  });

  describe('Transaction Management', () => {
    it('should add transaction', () => {
      const tx = DataService.addTransaction('recipient-address', 100.50);
      
      expect(tx).toMatchObject({
        toAddress: 'recipient-address',
        amount: 100.50,
      });
      expect(tx.txId).toMatch(/^tx_\d+_[a-z0-9]+$/);
      expect(tx.timestamp).toBeTypeOf('number');
    });

    it('should limit transactions to 200', () => {
      // Add 201 transactions
      for (let i = 0; i < 201; i++) {
        DataService.addTransaction(`address-${i}`, i);
      }
      
      const transactions = DataService.getAllTransactions();
      expect(transactions).toHaveLength(200);
      
      // Should keep the latest ones (higher indices)
      expect(transactions[0].toAddress).toBe('address-200');
      expect(transactions[199].toAddress).toBe('address-1');
    });
  });

  describe('Category Information', () => {
    it('should return correct category info', () => {
      const categoryA = DataService.getCategoryInfo('A');
      expect(categoryA.label).toBe('Trustworthy');
      expect(categoryA.trustRange).toBe('80-100');
      expect(categoryA.color).toBe('green');

      const categoryD = DataService.getCategoryInfo('D');
      expect(categoryD.label).toBe('Not Safe');
      expect(categoryD.trustRange).toBe('0-40');
      expect(categoryD.color).toBe('red');
    });
  });

  describe('Data Initialization', () => {
    it('should initialize demo data when storage is empty', () => {
      DataService.initializeDemoData();
      const addresses = DataService.getAllAddresses();
      
      expect(addresses.length).toBeGreaterThan(0);
      expect(addresses.some(addr => addr.category === 'A')).toBe(true);
      expect(addresses.some(addr => addr.category === 'D')).toBe(true);
    });

    it('should not overwrite existing data', () => {
      DataService.addAddress('existing-address', 'B');
      DataService.initializeDemoData();
      
      const addresses = DataService.getAllAddresses();
      const existing = addresses.find(addr => addr.address === 'existing-address');
      expect(existing).toBeTruthy();
    });
  });

  describe('Admin Authentication', () => {
    beforeEach(() => {
      DataService.logoutAdmin();
    });

    it('should authenticate with correct credentials', () => {
      const credentials = DataService.getDemoCredentials();
      const result = DataService.authenticateAdmin(credentials.username, credentials.password);
      
      expect(result).toBe(true);
      expect(DataService.isAdminAuthenticated()).toBe(true);
    });

    it('should reject incorrect credentials', () => {
      const result = DataService.authenticateAdmin('wrong', 'credentials');
      
      expect(result).toBe(false);
      expect(DataService.isAdminAuthenticated()).toBe(false);
    });

    it('should logout admin', () => {
      const credentials = DataService.getDemoCredentials();
      DataService.authenticateAdmin(credentials.username, credentials.password);
      expect(DataService.isAdminAuthenticated()).toBe(true);
      
      DataService.logoutAdmin();
      expect(DataService.isAdminAuthenticated()).toBe(false);
    });

    it('should provide demo credentials', () => {
      const credentials = DataService.getDemoCredentials();
      expect(credentials.username).toBeTruthy();
      expect(credentials.password).toBeTruthy();
    });
  });
});