import type { AxiosInstance } from "axios";
import { useAuthStore } from "../store/authStore";

/**
 * React hook: returns the authenticated Axios instance managed by React Kit.
 * Throws if ApiService is not initialized yet.
 */
export function useAxiosInstance(): AxiosInstance {
  const service = useAuthStore((s) => s.apiService);
  if (!service) {
    throw new Error(
      "ApiService is not initialized. Ensure AppShell is mounted with authConfig.",
    );
  }
  return service.getAxios();
}

/**
 * Non-hook helper for non-React code paths. Returns null if not initialized yet.
 */
export function getAxiosInstance(): AxiosInstance | null {
  const service = useAuthStore.getState().apiService;
  return service ? service.getAxios() : null;
}
