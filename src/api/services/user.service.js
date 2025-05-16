// Create API thunks using the reusable creator
export const fetchEmailTemplates = createApiThunk(
  'emailTemplates/fetchAll',
  {
    url: (type) => `${API_ENDPOINTS.EMAIL_TEMPLATES}/${type}`,
    method: 'GET',
    transformResponse: (response) => {
      return response.data;
    },
  },
);

export const fetchEmailTemplateById = createApiThunk(
  'emailTemplates/fetchById',
  {
    url: (id) => `${API_ENDPOINTS.EMAIL_TEMPLATES}/${id}`,
    method: 'GET',
  },
);

export const createEmailTemplate = createApiThunk(
  'emailTemplates/create',
  {
    url: API_ENDPOINTS.EMAIL_TEMPLATES,
    method: 'POST',
    transformResponse: (response) => {
      return response;
    },
  },
);

export const updateEmailTemplate = createApiThunk(
  'emailTemplates/update',
  {
    url: (data) => `${API_ENDPOINTS.EMAIL_TEMPLATES}/${data.id}`,
    method: 'PUT',
  },
);

export const deleteEmailTemplate = createApiThunk('emailTemplates/delete', {
  url: (id) => `${API_ENDPOINTS.DELETE_EMAIL_TEMPLATE}/${id}`,
  method: 'DELETE',
  transformResponse: () => {
    // Return the ID directly since the response might not include it
    return;
  },
});

export const fetchAllEvents = createApiThunk('emailTemplates/fetchAllEvents', {
  url: `${API_ENDPOINTS.ALL_EVENTS}`,
  method: 'GET',
  transformResponse: (response) => {
    const eventResponse = response.data.templates;

    if (Array.isArray(eventResponse)) {
      return eventResponse.map((event) => ({
        value: event.event_code,
        label: event.name,
      }));
    }
    return [];
  },
});

export const updateCardData = createApiThunk(
  'emailTemplates/updateCardData',
  {
    url: API_ENDPOINTS.UPDATE_CARD_DATA,
    method: 'PATCH',
  },
);

export const fetchAllUserGroups = createApiThunk(
  'emailTemplates/fetchAllUserGroups',
  {
    url: API_ENDPOINTS.GET_ALL_USER_GROUPS,
    method: 'GET',
  },
);