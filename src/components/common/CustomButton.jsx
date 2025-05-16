import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const CustomButton = ({
  children,
  variant = 'primary',
  size,
  outline = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  block = false,
  active,
  href,
  iconOnly = false,
  ...props
}) => {
  const buttonVariant = outline ? `outline-${variant}` : variant;

  const isIconOnly =
    iconOnly || (icon && !children) || (!icon && children && React.isValidElement(children));

  const iconOnlyClass = isIconOnly
    ? 'p-2 d-inline-flex align-items-center justify-content-center'
    : '';

  const buttonClasses = [className, iconOnlyClass, block ? 'w-100' : '']
    .filter(Boolean)
    .join(' ');

  const LoadingSpinner = () => (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      className={children && !isIconOnly ? 'me-2' : ''}
    />
  );

  return (
    <Button
      variant={buttonVariant}
      size={size}
      disabled={disabled || loading}
      className={buttonClasses || undefined}
      type={type}
      onClick={onClick}
      active={active}
      href={href}
      {...props}
    >
      {loading && <LoadingSpinner />}

      {isIconOnly && !loading && (
        <>
          {icon || children}
        </>
      )}

      {!isIconOnly && (
        <>
          {!loading && icon && iconPosition === 'left' && <span className="me-2">{icon}</span>}
          {children}
          {!loading && icon && iconPosition === 'right' && <span className="ms-2">{icon}</span>}
        </>
      )}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'danger', 'warning',
    'info', 'dark', 'light', 'link', 'outline',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  block: PropTypes.bool,
  active: PropTypes.bool,
  href: PropTypes.string,
  iconOnly: PropTypes.bool,
};

export default CustomButton;
