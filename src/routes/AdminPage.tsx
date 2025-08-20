import React, { useState, useEffect } from 'react';
import { Trash2, LogOut, Shield } from 'lucide-react';
import { AddressEntry, TrustCategory } from '../types';
import { DataService } from '../services/dataService';
import { AddressForm } from '../components/AddressForm';
import { AddressList } from '../components/AddressList';
import { AdminLogin } from '../components/AdminLogin';
import { Snackbar, SnackbarType } from '../components/Snackbar';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [addresses, setAddresses] = useState<AddressEntry[]>([]);
  const [editingAddress, setEditingAddress] = useState<AddressEntry | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: SnackbarType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const checkAuthentication = () => {
    setIsAuthenticated(DataService.isAdminAuthenticated());
  };

  const loadAddresses = () => {
    setAddresses(DataService.getAllAddresses());
  };

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type, isVisible: true });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    showSnackbar('Successfully logged in to admin panel', 'success');
  };

  const handleLogout = () => {
    DataService.logoutAdmin();
    setIsAuthenticated(false);
    setEditingAddress(null);
    showSnackbar('Successfully logged out', 'success');
  };

  const handleAddAddress = (address: string, category: TrustCategory, note?: string) => {
    try {
      DataService.addAddress(address, category, note);
      loadAddresses();
      setEditingAddress(null);
      showSnackbar(
        editingAddress ? 'Address updated successfully!' : 'Address added successfully!',
        'success'
      );
    } catch (error) {
      console.error('Failed to save address:', error);
      showSnackbar('Failed to save address. Please try again.', 'error');
    }
  };

  const handleEditAddress = (address: AddressEntry) => {
    setEditingAddress(address);
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
  };

  const handleDeleteAddress = (address: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        DataService.removeAddress(address);
        loadAddresses();
        showSnackbar('Address deleted successfully!', 'success');
      } catch (error) {
        console.error('Failed to delete address:', error);
        showSnackbar('Failed to delete address. Please try again.', 'error');
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear ALL data? This action cannot be undone.')) {
      try {
        DataService.clearAllData();
        loadAddresses();
        showSnackbar('All data cleared successfully!', 'success');
      } catch (error) {
        console.error('Failed to clear data:', error);
        showSnackbar('Failed to clear data. Please try again.', 'error');
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
    DataService.initializeDemoData();
    loadAddresses();
  }, []);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <AdminLogin onLogin={handleLogin} />
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          isVisible={snackbar.isVisible}
          onClose={hideSnackbar}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Trust Score Administration</h2>
        </div>
        <div className="flex items-center gap-3">
          {addresses.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </button>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <AddressForm
        onSubmit={handleAddAddress}
        editingAddress={editingAddress || undefined}
        onCancel={editingAddress ? handleCancelEdit : undefined}
      />

      <AddressList
        addresses={addresses}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
      />

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
      />
    </div>
  );
};