const LocalStorageService = {
  getToken: () => localStorage.getItem('MATHWORK_APIToken'),

  setToken: (data) => localStorage.setItem('MATHWORK_APIToken', data),

  isLogin: () => !!localStorage.getItem('MATHWORK_APIToken'),

  clearLocalStorage: () => localStorage.removeItem('MATHWORK_APIToken'),

  getTenantId: () => localStorage.getItem('TenantID'),
};

export default LocalStorageService;
