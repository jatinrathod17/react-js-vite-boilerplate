import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Loader = ({ height = '300px' }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('common.loading')}</span>
      </Spinner>
    </div>
  );
};

Loader.propTypes = {
  height: PropTypes.string,
};

export default Loader;
