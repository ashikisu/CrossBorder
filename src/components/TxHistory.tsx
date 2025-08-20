import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { TxRecord } from '../types';

interface TxHistoryProps {
  transactions: TxRecord[];
}

export const TxHistory: React.FC<TxHistoryProps> = ({ transactions }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">No transactions yet. Send your first payment to see history here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Transaction History ({transactions.length})
        </h3>
      </div>

      <div className="divide-y max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div key={tx.txId} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    ${tx.amount.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">to</span>
                  <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {formatAddress(tx.toAddress)}
                  </code>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(tx.timestamp)}
                </div>

                <div className="flex items-center text-xs">
                  <span className="text-gray-500 mr-1">TX ID:</span>
                  <code className="font-mono text-gray-600 mr-2">{tx.txId}</code>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              <div className="ml-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};