import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toast from '../components/Toast';

const initialValue = {
  createToast: () => {},
  deleteToast: () => {}
};

const ToastContext = createContext(initialValue);

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ Children }) {
  const [toasts, setToasts] = useState([]);

  const value = {
    createToast: (options) => {
      const id = uuidv4();
      setToasts((prev) => [...prev, { id, ...options }]);

      // setTimeout(()=>{
      //   setToasts(prev=>prev.filter(toast=>toast.toastId !== id));
      // },3000)
    },
    deleteToast: (toastId) => {
      setToasts((prev) => prev.filter((toast) => toast.toastId !== toastId));
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {Children}
      <ul className="fixed bottom-5 right-5 grid grid-cols-1 gap-y-3">
        {toasts.map(({ toastId, title, content, time }) => (
          <li key={toastId}>
            <Toast title={title} content={content} time={time} />
          </li>
        ))}
      </ul>
    </ToastContext.Provider>
  );
}
