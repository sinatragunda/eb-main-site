import { HttpError, type RequestOptions } from "./types";

const EB_AUTH_TOKEN_KEY = "eb_auth_token";

function getBaseUrl(): string {
  const base = import.meta.env.VITE_EB_MARKET_PLACE_BASE_URL as string | undefined;
  return (base ?? "").replace(/\/$/, "");
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const base = getBaseUrl();
  const normalized = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  if (!params) return normalized;

  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    qs.set(key, String(value));
  }
  const query = qs.toString();
  return query ? `${normalized}?${query}` : normalized;
}

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(EB_AUTH_TOKEN_KEY);
  } catch(error) {
      alert(JSON.stringify(error));
    return null;
  }
}

export function setAuthToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(EB_AUTH_TOKEN_KEY, token);
    else localStorage.removeItem(EB_AUTH_TOKEN_KEY);
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function errorMessage(status: number, body: unknown): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (typeof record.message === "string") return record.message;
    if (typeof record.error === "string") return record.error;
  }
  if (typeof body === "string" && body.trim()) return body;
  return `Request failed with status ${status}`;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...options.headers,
  };

  if (body !== undefined) {
    headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
  }

  alert(JSON.stringify(options));

  if (!options.skipAuth) {
    const token = getAuthToken();
    alert("not skip auth "+token);
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path, options.params), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: options.signal,
  });

  const parsed = await parseBody(response);

  if (!response.ok) {
    throw new HttpError(errorMessage(response.status, parsed), response.status, parsed);
  }

  return parsed as T;
}

/** Generic HTTP helpers — use from anywhere in the app */
export const http = {
  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>("GET", path, undefined, options);
  },

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>("POST", path, body, options);
  },

  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>("PUT", path, body, options);
  },

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>("PATCH", path, body, options);
  },

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>("DELETE", path, undefined, options);
  },
};
