const ENV = import.meta.env;

const getBaseUrl = () => {
  switch (ENV.MODE) {
    case 'development':
      return ENV.VITE_API_BASE;
    case 'staging':
      return ENV.VITE_API_BASE;
    case 'production':
      return ENV.VITE_API_BASE;
    default:
      return ENV.VITE_API_BASE;
  }
};

export const CONFIG = {
  API_BASE: getBaseUrl(),
  APP_NAME: ENV.VITE_APP_NAME || 'MyApp',
  DEBUG_MODE: ENV.VITE_DEBUG === 'true',
};

console.log(`Running in ${ENV.MODE} mode`);
