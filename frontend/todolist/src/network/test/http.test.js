import HttpClient from '../http';
const request = require('supertest');

describe('http', () => {
  let http;
  const baseURL = process.env.REACT_APP_BASE_URL;
  beforeEach(() => {
    http = new HttpClient(baseURL);
  });
  it('POST successfully by fetch URL', () => {
      
    const url = `/tasks/1/task-day`;
    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer token` },
      body: JSON.stringify({
        dayPlan: 'running',
      }),
    };
    request(http.fetch(url, options)).get("/task/1/task-day").expect("Content-Type","application/json")
  });
});
