import React, { useState } from 'react';
import { Shield, Send, Settings, Lock } from 'lucide-react';
import { SendPage } from './routes/SendPage';
import { AdminPage } from './routes/AdminPage';
import { DataService } from './services/dataService';
import clsx from 'clsx';

type Tab = 'send' | 'admin';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('send');
  const isAdminAuthenticated = DataService.isAdminAuthenticated();

  const tabs = [
    { id: 'send' as Tab, label: 'Send Payment', icon: Send },
    { 
      id: 'admin' as Tab, 
      label: isAdminAuthenticated ? 'Admin' : 'Admin Login', 
      icon: isAdminAuthenticated ? Settings : Lock 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  CrossPay Trust
                </h1>
                <p className="text-sm text-gray-600">
                  Secure Cross-Border Payment Platform
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Demo Mode
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'send' && <SendPage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            CrossPay Trust Demo - Client-side only payment simulator with trust scoring
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;