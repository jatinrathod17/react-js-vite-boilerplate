export const lazyWithRetry = function (componentImport, name) {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      window.localStorage.getItem(`retry-${name}-refreshed`) || 'false'
    );
    // try to import the component
    componentImport()
      .then((component) => {
        window.localStorage.setItem(`retry-${name}-refreshed`, 'false'); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.localStorage.setItem(`retry-${name}-refreshed`, 'true'); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        console.log('Component import failed', error);
        reject(new Error('Component import failed')); // Default error behaviour as already tried refresh
      });
  });
};
