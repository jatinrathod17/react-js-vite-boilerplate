import { t } from 'i18next';

export const tWithSuccessFallback = (key, options) => {
  const translation = t(key, options);
  return translation === key ? t('apiSuccessMessages.FALLBACK_SUCCESS', options) : translation;
};

export const tWithErrorFallback = (key, options) => {
  const translation = t(key, options);
  return translation === key ? t('apiErrorMessages.FALLBACK_ERROR', options) : translation;
};
