import PropTypes from 'prop-types';
import { Form, Modal } from 'react-bootstrap';
import CustomButton from './CustomButton';

const CustomModal = ({
  show,
  onClose,
  title,
  size,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Close',
  scrollable = false,
  bodyClassName,
  footerClassName,
  asForm = false,
  onSubmit,
}) => {
  const modalContent = (
    <>
      <Modal.Body className={bodyClassName}>{children}</Modal.Body>
      <Modal.Footer className={footerClassName}>
        <CustomButton variant="link" onClick={onClose}>
          {cancelText}
        </CustomButton>
        {onConfirm && (
          <CustomButton variant="secondary" onClick={onConfirm} loading={false}>
            {confirmText}
          </CustomButton>
        )}
      </Modal.Footer>
    </>
  );

  return (
    <Modal
      show={show}
      size={size}
      onHide={onClose}
      centered
      scrollable={scrollable}
      backdrop="static"
      keyboard={false}>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {asForm ? (
        <Form onSubmit={onSubmit} className="formScrollable">
          {modalContent}
        </Form>
      ) : (
        modalContent
      )}
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  children: PropTypes.node.isRequired,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  scrollable: PropTypes.bool,
  asForm: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default CustomModal;
