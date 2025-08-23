export const helpHttp = () => {
  const handleErrors = (response) => {
    if (!response.ok) {
      return Promise.reject({
        err: true,
        status: response.status || '00',
        statusText: response.statusText || 'error'
      });
    }
    return response.json();
  };

  const customFetch = async (endpoint, options) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const controller = new AbortController();
    options.signal = controller.signal;
    options.method = options.method || 'GET';

    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...defaultHeaders,
        "Authorization": `Bearer ${token}`
      };
    } else {
      options.headers = defaultHeaders;
    }

    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    const timeout = options.timeout || 5000;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(endpoint, options);
      clearTimeout(timeoutId);
      return await handleErrors(response);
    } catch (err) {
      if (err.name === 'AbortError') {
        return { err: true, status: '408', statusText: 'Request timed out' };
      }
      return { err: true, status: '500', statusText: 'Internal Server Error' };
    }
  };

  const request = (method) => (url, options = {}) => {
    options.method = method;
    return customFetch(url, options);
  };

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    del: request('DELETE'),
  };
};