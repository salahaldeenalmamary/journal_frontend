
import { useEffect } from 'react';

const onPopState = (callback) => {
  useEffect(() => {
    const handlePopState = () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};

export default onPopState;
