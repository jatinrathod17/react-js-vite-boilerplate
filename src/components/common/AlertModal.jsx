import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle,
  QuestionCircle,
  Trash,
} from 'react-bootstrap-icons';
import CustomButton from './CustomButton';

const iconColorMap = {
  success: '#198754',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  question: '#6c757d',
  delete: '#c04c0b',
};

const iconMap = {
  success: CheckCircle,
  error: ExclamationCircle,
  warning: ExclamationTriangle,
  info: InfoCircle,
  question: QuestionCircle,
  delete: Trash,
};

const AlertModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  icon = 'none',
  iconSize = 48,
  confirmText,
  cancelText,
  isGlobal = false,
}) => {
  const IconComponent = icon !== 'none' ? iconMap[icon] : null;

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      {title && (
        <Modal.Header
          closeButton
          className={`${isGlobal ? 'justify-content-center text-center' : ''}`}>
          <Modal.Title className={isGlobal ? 'w-100 fw-bold' : ''}>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body className="d-flex flex-column justify-content-center align-items-center text-center">
        {IconComponent && (
          <IconComponent color={iconColorMap[icon]} size={iconSize} className="mb-3" />
        )}
        <p className={`mb-0 ${isGlobal ? 'fw-bold fs-5' : ''}`}>{message}</p>
      </Modal.Body>

      {(confirmText || cancelText) && (
        <Modal.Footer
          className={`${isGlobal ? 'border-0 justify-content-center' : 'justify-content-center'}`}>
          {cancelText && (
            <CustomButton variant={isGlobal ? 'primary' : 'secondary'} onClick={onClose}>
              {cancelText}
            </CustomButton>
          )}
          {confirmText && (
            <CustomButton variant="secondary" onClick={onConfirm}>
              {confirmText}
            </CustomButton>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

AlertModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(['success', 'error', 'warning', 'info', 'question', 'delete', 'none']),
  iconSize: PropTypes.number,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isGlobal: PropTypes.bool,
};

export default AlertModal;
