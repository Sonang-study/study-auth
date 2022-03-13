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
        Accept: 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }
    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.error ? data.error.message : 'Something went wrong';
      console.log('Throw Error');
      throw new Error(message);
      // if (res.status === 401) {
      //   console.error(data.message);
      //   return;
      // }
    }
    return data;
  }
}
