import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type = 'success', onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-300 left-1/2 z-50 -translate-x-1/2 rounded px-6 py-3 shadow-lg text-white font-semibold
        ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      role="alert"
    >
      {message}
    </div>
  );
}
