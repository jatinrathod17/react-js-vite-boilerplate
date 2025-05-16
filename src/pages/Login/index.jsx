import AlertModal from '@components/common/AlertModal';
import useGlobalAlert from '@hooks/useGlobalAlert';
import { useState } from 'react';

const Login = () => {
  console.log('Login Page');
  const { triggerAlert } = useGlobalAlert();
  const [show, setShow] = useState(true);

  // const handleDelete = () => {
  //   triggerAlert({
  //     title: 'Delete Confirmation',
  //     message: 'Are you sure you want to delete this?',
  //     icon: 'delete',
  //     confirmText: 'Yes, delete it',
  //     cancelText: 'Cancel',
  //     onConfirm: () => {
  //       console.log('Deleted!');
  //     },
  //     onCancel: () => {
  //       console.log('Cancelled!');
  //     },
  // autoClose: true,
  // autoCloseDelay: 2500,
  //   });
  // };

  const handleDelete = () => {
    triggerAlert({
      message: 'Form updated successfully.',
      icon: 'success',
      autoClose: true,
      autoCloseDelay: 2500,
    });
  };

  return (
    <h2>
      Login<button onClick={handleDelete}>Delete Item</button>
      <AlertModal
        show={show}
        onClose={() => setShow(false)}
        title="Success"
        message="Form updated successfully."
        icon="success"
        confirmText="Confirm"
        cancel="Cancel"
      />
    </h2>
  );
};

export default Login;
