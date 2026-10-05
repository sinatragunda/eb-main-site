import { http, getAuthToken, setAuthToken } from "./httpClient";
import type {
  LoginRequest,
  LoginResponse,
  CreateDefaultAccountRequest,
  CreateDefaultAccountResponse,
} from "./types";

const AUTH_PATHS = {
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/users/me",
  createDefaultAccount: "/accounts",
} as const;

export const AuthService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const data = await http.post<LoginResponse>(AUTH_PATHS.login, credentials, {
      skipAuth: true,
    });

    if (data?.access_token) setAuthToken(data.access_token);
    return data;
  },

  /**
   * Creates a default client account from checkout contact details (email).
   * Called when the user completes checkout without an existing session.
   */
  async createDefaultAccount(
    payload: CreateDefaultAccountRequest
  ): Promise<CreateDefaultAccountResponse> {
    const data = await http.post<CreateDefaultAccountResponse>(
      AUTH_PATHS.createDefaultAccount,
      {
        email: payload.email,
        alias: payload.alias,
        clientName: payload.clientName,
        metadata: {
          rootPassword: payload.rootPassword,
          ...(payload.metadata ?? {}),
        },
      },
      { skipAuth: true }
    );

    if (data?.token) setAuthToken(data.token);
    return data;
  },

  async logout(): Promise<void> {
    try {
      if (getAuthToken()) {
        await http.post(AUTH_PATHS.logout);
      }
    } finally {
      setAuthToken(null);
    }
  },

  async me<T = unknown>(): Promise<T> {
    return http.get<T>(AUTH_PATHS.me ,{skipAuth : false});
  },

  isAuthenticated(): boolean {
    return Boolean(this.me());
  },

  getToken(): string | null {
    return getAuthToken();
  },
};
