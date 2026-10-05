export type PendingClientSetup = {
  email: string;
  /** Tenant / environment alias */
  alias: string;
  /** Display / legal client name */
  clientName: string;
  /** Initial root password for the tenant */
  rootPassword: string;
};

const STORAGE_KEY = "eb_pending_client_setup";

export function savePendingClientSetup(data: PendingClientSetup): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage failures
  }
}

export function getPendingClientSetup(): PendingClientSetup | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PendingClientSetup;
  } catch {
    return null;
  }
}

export function clearPendingClientSetup(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
