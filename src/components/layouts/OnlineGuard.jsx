import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const OnlineGuard = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">{t('onlineGuard.title')}</h2>
          <p className="mt-2 text-gray-600">{t('onlineGuard.message')}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

OnlineGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
