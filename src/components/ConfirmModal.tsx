import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { TrustCategory } from '../types';
import { DataService } from '../services/dataService';
import { CategoryBadge } from './CategoryBadge';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  address: string;
  amount: number;
  category: TrustCategory;
  note?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  address,
  amount,
  category,
  note,
}) => {
  const categoryInfo = DataService.getCategoryInfo(category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Security Warning</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 font-medium mb-2">
              You are about to send funds to a risky address.
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Address:</span> {address}
              </div>
              <div>
                <span className="font-medium">Amount:</span> ${amount.toFixed(2)}
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Trust Score:</span>
                <CategoryBadge category={category} showRange />
              </div>
              {note && (
                <div>
                  <span className="font-medium">Note:</span> {note}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Recommendation:</span> {categoryInfo.advice}
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Please review the transaction details carefully. Are you sure you want to proceed?
          </p>
        </div>

        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Proceed Anyway
          </button>
        </div>
      </div>
    </div>
  );
};