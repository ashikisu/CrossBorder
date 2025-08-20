import React, { useState, useEffect } from 'react';
import { TrustCategory } from '../types';
import { DataService } from '../services/dataService';
import { SendForm } from '../components/SendForm';
import { TxHistory } from '../components/TxHistory';
import { ConfirmModal } from '../components/ConfirmModal';
import { Snackbar, SnackbarType } from '../components/Snackbar';

export const SendPage: React.FC = () => {
  const [transactions, setTransactions] = useState(DataService.getAllTransactions());
  const [confirmModal, setConfirmModal] = useState<{
    address: string;
    amount: number;
    category: TrustCategory;
    note?: string;
  } | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: SnackbarType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({ message, type, isVisible: true });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  const handleSend = (address: string, amount: number, category: TrustCategory) => {
    const addressEntry = DataService.findAddress(address);
    
    // Show confirmation modal for risky categories (C, D) or unknown addresses
    if (category === 'C' || category === 'D') {
      setConfirmModal({
        address,
        amount,
        category,
        note: addressEntry?.note,
      });
    } else {
      // Safe to proceed immediately for A and B categories
      executeSend(address, amount);
    }
  };

  const executeSend = (address: string, amount: number) => {
    try {
      const txRecord = DataService.addTransaction(address, amount);
      setTransactions(DataService.getAllTransactions());
      setConfirmModal(null);
      showSnackbar(
        `Payment of $${amount.toFixed(2)} sent successfully! TX: ${txRecord.txId}`,
        'success'
      );
    } catch (error) {
      console.error('Transaction failed:', error);
      showSnackbar('Transaction failed. Please try again.', 'error');
    }
  };

  const handleConfirmSend = () => {
    if (confirmModal) {
      executeSend(confirmModal.address, confirmModal.amount);
    }
  };

  useEffect(() => {
    // Initialize demo data if needed
    DataService.initializeDemoData();
  }, []);

  return (
    <div className="space-y-6">
      <SendForm onSend={handleSend} />
      <TxHistory transactions={transactions} />

      <ConfirmModal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        onConfirm={handleConfirmSend}
        address={confirmModal?.address || ''}
        amount={confirmModal?.amount || 0}
        category={confirmModal?.category || 'D'}
        note={confirmModal?.note}
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