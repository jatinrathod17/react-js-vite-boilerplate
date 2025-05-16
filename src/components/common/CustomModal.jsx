import { useAppSelector } from '@store/index';
import Style from '@styles/CssGlobal.module.scss';
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
  closeText = 'Close',
  scrollable = false,
  bodyClassName,
  footerClassName,
  asForm = false,
  onSubmit,
}) => {
  const status = useAppSelector((state) => state.emailTemplates.status);

  const modalContent = (
    <>
      <Modal.Body className={bodyClassName}>{children}</Modal.Body>
      <Modal.Footer className={footerClassName}>
        <CustomButton variant="link" onClick={onClose}>
          {closeText}
        </CustomButton>
        {onConfirm && (
          <CustomButton
            variant="secondary"
            onClick={onConfirm}
            loading={status.state === 'loading'}
          >
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
      keyboard={false}
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {asForm ? (
        <Form onSubmit={onSubmit} className={Style.formScrollable}>
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
  closeText: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  scrollable: PropTypes.bool,
  asForm: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default CustomModal;
