export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      alert(error);
    }
    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : 'Something went wrong';
      const error = new Error(message);
      if (res.status === 401) {
        alert(data.message);
        return;
      }
    }
    return data;
  }
}
