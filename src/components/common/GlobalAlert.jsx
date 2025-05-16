import { useAppDispatch, useAppSelector } from '@store/index';
import { hideAlert } from '@store/slices/alertSlice';
import { t } from 'i18next';

import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle,
  QuestionCircle,
  Trash,
} from 'react-bootstrap-icons';
import CustomModal from './CustomModal';

// Define icon color mapping
const iconColorMap = {
  warning: '#ffc107',
  error: '#dc3545',
  success: '#198754',
  info: '#0dcaf0',
  question: '#6c757d',
  delete: '#c04c0b',
};

const GlobalAlert = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);

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

  const renderIcon = () => {
    if (!alert.icon || alert.icon === 'none') return null;

    const iconProps = {
      color: iconColorMap[alert.icon],
      size: alert.iconSize || 48,
    };

    const icons = {
      warning: <ExclamationTriangle {...iconProps} />,
      error: <ExclamationCircle {...iconProps} />,
      success: <CheckCircle {...iconProps} />,
      info: <InfoCircle {...iconProps} />,
      question: <QuestionCircle {...iconProps} />,
      delete: <Trash {...iconProps} />,
    };

    return icons[alert.icon] || null;
  };

  return (
    <CustomModal
      show={alert.show}
      onClose={handleClose}
      scrollable={true}
      title={alert.title}
      onConfirm={handleConfirm}
      bodyClassName="d-flex justify-content-center flex-column text-center"
      footerClassName="justify-content-center"
      confirmText={t('common.yes')}
      closeText={t('common.no')}
    >
      {alert.icon !== 'none' && <div className="icon-wrapper">{renderIcon()}</div>}
      <p className="modal-message">{alert.message}</p>
    </CustomModal>
  );
};

export default GlobalAlert;
