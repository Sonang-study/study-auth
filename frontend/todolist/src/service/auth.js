export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(firstName, lastName, email, password) {
    const data = await this.http.fetch(`/auth/siginup`, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role: 'user',
      }),
    });
    this.tokenStorage.saveToken(data.access_token);
    return data;
  }

  async login(email, password) {
    const data = await this.http.fetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    this.tokenStorage.saveToken(data.access_token);
    return data;
  }

  me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch(`/users/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
