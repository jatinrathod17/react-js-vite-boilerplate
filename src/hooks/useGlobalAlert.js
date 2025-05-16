import { hideAlert, showAlert } from '@store/slices/alertSlice';
import { useDispatch } from 'react-redux';

let confirmCallback = () => {};
let cancelCallback = () => {};
let dismissTimeout;

const useGlobalAlert = () => {
  const dispatch = useDispatch();

  const triggerAlert = ({
    onConfirm,
    onCancel,
    autoClose = false,
    autoCloseDelay = 3000,
    ...rest
  }) => {
    confirmCallback = onConfirm || (() => {});
    cancelCallback = onCancel || (() => {});

    dispatch(showAlert({ ...rest, show: true }));

    if (autoClose) {
      clearTimeout(dismissTimeout);
      dismissTimeout = setTimeout(() => {
        dispatch(hideAlert());
      }, autoCloseDelay);
    }
  };

  const closeAlert = () => {
    clearTimeout(dismissTimeout);
    dispatch(hideAlert());
  };

  return { triggerAlert, closeAlert };
};

export default useGlobalAlert;
