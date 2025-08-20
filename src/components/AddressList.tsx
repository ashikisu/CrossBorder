import React from 'react';
import { Edit, Trash2, Clock } from 'lucide-react';
import { AddressEntry } from '../types';
import { CategoryBadge } from './CategoryBadge';

interface AddressListProps {
  addresses: AddressEntry[];
  onEdit: (address: AddressEntry) => void;
  onDelete: (address: string) => void;
}

export const AddressList: React.FC<AddressListProps> = ({
  addresses,
  onEdit,
  onDelete,
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (addresses.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">No addresses added yet. Add your first trusted address above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Managed Addresses ({addresses.length})
        </h3>
      </div>
      
      <div className="divide-y">
        {addresses.map((entry) => (
          <div key={entry.address} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800 break-all">
                    {entry.address}
                  </code>
                  <CategoryBadge category={entry.category} />
                </div>
                
                {entry.note && (
                  <p className="text-sm text-gray-600 mb-2">{entry.note}</p>
                )}
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Added {formatDate(entry.createdAt)}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(entry)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit address"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(entry.address)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};