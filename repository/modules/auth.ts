import HttpFactory from '@/repository/factory';

interface ILoginCredentials {
  email: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthModule extends HttpFactory {
  private resource = "/auth";

  async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('POST', `${this.resource}/login`, credentials);
  }

  async refresh(refreshToken: string): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('POST', `${this.resource}/refresh`, { refreshToken });
  }

  async logout(): Promise<void> {
    return await this.call<void>('POST', `${this.resource}/logout`);
  }

  async register(credentials: ILoginCredentials): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('POST', `${this.resource}/register`, credentials);
  }

  async getUser(): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('GET', `${this.resource}/user`);
  }

  async getUserById(id: string): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('GET', `${this.resource}/user/${id}`);
  }

  async getUserByEmail(email: string): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('GET', `${this.resource}/user/email/${email}`);
  }

  async getUserByUsername(username: string): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('GET', `${this.resource}/user/username/${username}`);
  }

  async getUserByToken(token: string): Promise<ILoginResponse> {
    return await this.call<ILoginResponse>('GET', `${this.resource}/user/token/${token}`);
  }
}

export default AuthModule
