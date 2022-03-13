const TOKEN = 'token';
const USERID = "userId";


export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
    sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    const token = localStorage.getItem(TOKEN)
      ? localStorage.getItem(TOKEN)
      : sessionStorage.getItem(TOKEN);
    return token;
  }

  clearToken() {
    localStorage.removeItem(TOKEN);
    sessionStorage.removeItem(TOKEN);
  }
}
