import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import clsx from 'clsx';

export type SnackbarType = 'success' | 'warning' | 'error';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-orange-50 text-orange-800 border-orange-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000,
}) => {
  const Icon = icons[type];

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={clsx(
          'flex items-center p-4 rounded-lg shadow-lg border min-w-80 max-w-md',
          typeStyles[type]
        )}
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};