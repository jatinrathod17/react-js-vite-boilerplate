import { hideAlert } from '@store/slices/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from './AlertModal';

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    if (alert.onCancel) {
      alert.onCancel();
    }
    dispatch(hideAlert());
  };

  const handleConfirm = () => {
    if (alert.onConfirm) {
      alert.onConfirm();
    }
    dispatch(hideAlert());
  };

  return (
    <AlertModal
      show={alert.show}
      onClose={handleClose}
      onConfirm={alert.confirmText ? handleConfirm : undefined}
      title={alert.title}
      message={alert.message}
      icon={alert.icon}
      confirmText={alert.confirmText}
      cancelText={alert.cancelText}
      isGlobal={true}
    />
  );
};

export default GlobalAlert;
