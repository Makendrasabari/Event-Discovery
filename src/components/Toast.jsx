import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" aria-live="assertive">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let badgeClass = 'toast-success';
        if (toast.type === 'error' || toast.type === 'warning') {
          Icon = AlertCircle;
          badgeClass = 'toast-warning';
        } else if (toast.type === 'info') {
          Icon = Info;
          badgeClass = 'toast-info';
        }

        return (
          <div key={toast.id} className={`toast-card ${badgeClass}`}>
            <div className="toast-icon-wrapper">
              <Icon size={20} />
            </div>
            <div className="toast-text-wrapper">
              <h5 className="toast-title">{toast.title}</h5>
              <p className="toast-message">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close-btn"
              aria-label="Dismiss toast"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
