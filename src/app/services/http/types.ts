export class HttpError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Skip Bearer token even if one is stored */
  skipAuth?: boolean;
  /** Query string params for GET (and optional others) */
  params?: Record<string, string | number | boolean | undefined | null>;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type UserDetails = {
    email: string;
    name: string;
    alias: string;
}

export type CreateDefaultAccountRequest = {
  email: string;
  alias: string;
  clientName: string;
  /** Used as metadata for client / tenant provisioning */
  rootPassword: string;
  metadata?: Record<string, string>;
};

export type CreateDefaultAccountResponse = {
  token?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
  };
  message?: string;
};
