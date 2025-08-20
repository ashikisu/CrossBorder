import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TrustCategory } from '../types';
import { DataService } from '../services/dataService';

interface AddressFormProps {
  onSubmit: (address: string, category: TrustCategory, note?: string) => void;
  editingAddress?: { address: string; category: TrustCategory; note?: string };
  onCancel?: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  editingAddress,
  onCancel,
}) => {
  const [address, setAddress] = useState(editingAddress?.address || '');
  const [category, setCategory] = useState<TrustCategory>(editingAddress?.category || 'A');
  const [note, setNote] = useState(editingAddress?.note || '');
  const [errors, setErrors] = useState<{ address?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!address.trim()) {
      setErrors({ address: 'Address is required' });
      return;
    }

    onSubmit(address.trim(), category, note.trim() || undefined);
    
    if (!editingAddress) {
      setAddress('');
      setNote('');
      setCategory('A');
    }
  };

  const categoryOptions: { value: TrustCategory; label: string }[] = [
    { value: 'A', label: 'A - Trustworthy (80-100)' },
    { value: 'B', label: 'B - Good (60-80)' },
    { value: 'C', label: 'C - Suspicious (40-60)' },
    { value: 'D', label: 'D - Not Safe (0-40)' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <div className="flex items-center mb-4">
        <Plus className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </h3>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter cryptocurrency address..."
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Trust Category *
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TrustCategory)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Note (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any relevant notes..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3 pt-4">
        {editingAddress && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingAddress ? 'Update Address' : 'Add Address'}
        </button>
      </div>
    </form>
  );
};