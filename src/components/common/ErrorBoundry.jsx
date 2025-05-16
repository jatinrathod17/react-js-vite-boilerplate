import { t } from 'i18next';
import PropTypes from 'prop-types';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="error-boundary-container">
          <h2>{t('errorBoundary.errorMessage')}</h2>
          <details>
            <summary>{t('errorBoundary.details')}</summary>
            <pre>{error?.toString()}</pre>
          </details>
          <button onClick={this.resetErrorBoundary} className="error-boundary-reset-button">
            {t('errorBoundary.tryAgain')}
          </button>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onError: PropTypes.func,
};

// Higher-Order Component
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const ComponentWithErrorBoundary = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
};

export default ErrorBoundary;
