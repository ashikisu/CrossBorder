import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { TrustCategory } from '../types';
import { DataService } from '../services/dataService';
import { CategoryBadge } from './CategoryBadge';

interface SendFormProps {
  onSend: (address: string, amount: number, category: TrustCategory) => void;
}

export const SendForm: React.FC<SendFormProps> = ({ onSend }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [lookup, setLookup] = useState<{
    address: string;
    category: TrustCategory;
    note?: string;
    found: boolean;
  } | null>(null);
  const [errors, setErrors] = useState<{ address?: string; amount?: string }>({});

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (value.trim()) {
      const found = DataService.findAddress(value.trim());
      if (found) {
        setLookup({
          address: found.address,
          category: found.category,
          note: found.note,
          found: true,
        });
      } else {
        setLookup({
          address: value.trim(),
          category: 'D', // Unknown addresses are treated as Not Safe
          found: false,
        });
      }
    } else {
      setLookup(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const addressValue = address.trim();
    const amountValue = parseFloat(amount);

    let hasErrors = false;
    const newErrors: typeof errors = {};

    if (!addressValue) {
      newErrors.address = 'Recipient address is required';
      hasErrors = true;
    }

    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const category = lookup?.category || 'D';
    onSend(addressValue, amountValue, category);
  };

  const categoryInfo = lookup ? DataService.getCategoryInfo(lookup.category) : null;
  const isRisky = lookup && (lookup.category === 'C' || lookup.category === 'D');

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
        <div className="flex items-center mb-4">
          <Send className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Send Payment</h3>
        </div>

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address *
          </label>
          <input
            type="text"
            id="recipient"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="Enter recipient address..."
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (USD) *
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Payment
        </button>
      </form>

      {/* Trust Score Panel */}
      {lookup && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            {isRisky ? (
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            )}
            Trust Score Analysis
          </h4>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="mt-1">
                <CategoryBadge category={lookup.category} showRange />
              </div>
            </div>

            {!lookup.found && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>Unknown Address:</strong> This address is not in our trusted database and 
                  will be treated as high-risk.
                </p>
              </div>
            )}

            {lookup.note && (
              <div>
                <span className="text-sm font-medium text-gray-700">Note:</span>
                <p className="text-sm text-gray-600 mt-1">{lookup.note}</p>
              </div>
            )}

            {categoryInfo && (
              <div className={`rounded-lg p-3 ${categoryInfo.bgColor}`}>
                <p className={`text-sm ${categoryInfo.textColor}`}>
                  <strong>Recommendation:</strong> {categoryInfo.advice}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};