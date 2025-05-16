import { useAppDispatch, useAppSelector } from '@store/index';
import { hideToast } from '@store/slices/toastSlice';
import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle,
  Star,
} from 'react-bootstrap-icons';

// Icon map based on toast type
const iconMap = {
  success: <CheckCircle className="me-2" />,
  danger: <ExclamationCircle className="me-2" />,
  warning: <ExclamationTriangle className="me-2" />,
  info: <InfoCircle className="me-2" />,
  primary: <Star className="me-2" />,
  secondary: <Star className="me-2" />,
};

const GlobalToaster = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);

  useEffect(() => {
    let timer;
    if (toast.show && toast.autoHide) {
      timer = setTimeout(() => {
        dispatch(hideToast());
      }, toast.delay || 3000); // Fallback delay
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toast.show, toast.autoHide, toast.delay, dispatch]);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <ToastContainer position="top-end">
      <Toast
        bg={toast.type}
        onClose={handleClose}
        show={toast.show}
        delay={toast.delay}
        autohide={toast.autoHide}>
        <Toast.Header>
          {toast.icon !== false && iconMap[toast.type]}
          <strong className="me-auto">{toast.title || ''}</strong>
        </Toast.Header>
        {toast.message && (
          <Toast.Body
            className={['danger', 'success', 'primary'].includes(toast.type) ? 'text-white' : ''}>
            {toast.message}
          </Toast.Body>
        )}
      </Toast>
    </ToastContainer>
  );
};

export default GlobalToaster;
