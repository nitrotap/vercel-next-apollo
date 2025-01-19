import { jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken()!);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error("Error decoding token:", err);
      return false;
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  login(idToken: string): void {
    sessionStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    sessionStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

const auth = new AuthService();
export default auth;
