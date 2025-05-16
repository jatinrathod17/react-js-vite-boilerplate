import { tWithErrorFallback } from '@hooks/useTranslationWithFallback';
import axios from 'axios';
import { CONFIG } from '../constants/config';
import LocalStorageService from './authentication';

// Configuration constants
export const AXIOS_BASE_CONFIG = {
  baseURL: CONFIG.API_BASE,
  headers: { 'Content-Type': 'application/json' },
};

export const CLIENT_TYPES = {
  ADMIN: 'admin',
  LOGGED_IN: 'logged_in',
  NON_LOGGED_IN: 'non_logged_in',
};

// Store management
let storeInstance = null;

export const injectStore = (store) => {
  storeInstance = store;
};

export const handleErrorResponseOld = async (error) => {
  if (error?.response) {
    const { status, config } = error.response;

    if (status === 401 && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      return axios(config);
    } else {
      handleOtherErrors(error.response);
    }
  } else if (error?.request) {
    handleNetworkError();
  } else {
    handleRequestSetupError();
  }

  return Promise.reject(error);
};

// Error handling
const handleErrorAlert = (errorKey) => {
  if (!storeInstance) {
    console.error('Store not initialized');
    return;
  }

  const errorMessage = tWithErrorFallback(errorKey);

  console.log('errorKey', errorKey, errorMessage);
  // storeInstance.dispatch(
  //   showAlertMessage({
  //     type: 'error',
  //     text: errorMessage,
  //   }),
  // );
};

const handleOtherErrors = (response) => {
  const key = response?.data?.messageKey ?? response?.data?.message;
  const messageKey = `apiErrorMessages.${key}`;

  const statusToErrorKey = {
    400: messageKey || 'apiErrorMessages.BAD_REQUEST',
    401: 'apiErrorMessages.UNAUTHORIZED',
    403: messageKey || 'apiErrorMessages.FORBIDDEN',
    404: messageKey || 'apiErrorMessages.NOT_FOUND',
    409: messageKey || 'apiErrorMessages.CONFLICT',
    422: messageKey || 'apiErrorMessages.UNPROCESSABLE_ENTITY',
    429: messageKey || 'apiErrorMessages.TOO_MANY_REQUESTS',
    500: messageKey || 'apiErrorMessages.INTERNAL_SERVER_ERROR',
    502: messageKey || 'apiErrorMessages.BAD_GATEWAY',
    503: messageKey || 'apiErrorMessages.SERVICE_UNAVAILABLE',
  };

  const errorKey = statusToErrorKey[response.status];
  handleErrorAlert(errorKey);
};

const handleNetworkError = () => {
  console.error('Network Error:');
};

const handleRequestSetupError = () => {
  console.error('Error in setting up the request');
};

const handleErrorResponse = async (error) => {
  if (error?.response) {
    handleOtherErrors(error.response);
  } else if (error?.request) {
    handleNetworkError();
  } else {
    handleRequestSetupError();
  }

  return Promise.reject(error);
};

// Authentication handlers
const getAuthHeader = (clientType) => {
  switch (clientType) {
    case CLIENT_TYPES.ADMIN: {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('authToken');
      return token ? `Bearer ${token}` : null;
    }
    case CLIENT_TYPES.LOGGED_IN: {
      return `Bearer ${LocalStorageService.getToken()}`;
    }
    case CLIENT_TYPES.NON_LOGGED_IN:
      return null;
    default:
      return null;
  }
};

// Create API client factory
const createApiClient = (clientType) => {
  const instance = axios.create(AXIOS_BASE_CONFIG);

  // Add request interceptor if authentication is needed
  if (clientType !== CLIENT_TYPES.NON_LOGGED_IN) {
    instance.interceptors.request.use(async (config) => {
      const authHeader = getAuthHeader(clientType);
      if (authHeader) {
        config.headers.Authorization = authHeader;
      }
      return config;
    });
  }

  // Add response interceptor for error handling
  instance.interceptors.response.use((response) => response, handleErrorResponse);

  return instance;
};

// Export pre-configured instances
export const adminApiClient = createApiClient(CLIENT_TYPES.ADMIN);
export const apiClient = createApiClient(CLIENT_TYPES.LOGGED_IN);
export const nonLoggedInApiClient = createApiClient(CLIENT_TYPES.NON_LOGGED_IN);

// Default export for backward compatibility
export default apiClient;
