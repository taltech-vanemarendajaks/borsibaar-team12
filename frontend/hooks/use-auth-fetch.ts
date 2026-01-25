/**
 * React hook for authentication-aware fetch operations with client-side navigation
 * Uses Next.js router for smoother UX compared to hard page reloads
 */

"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

type AuthFetchOptions = RequestInit & {
  skipAuthRedirect?: boolean;
};

/**
 * Hook that provides auth-fetch utilities with Next.js router navigation
 *
 * @returns Object with authFetch and helper methods
 */
export function useAuthFetch() {
  const router = useRouter();

  /**
   * Auth-aware fetch with client-side navigation on auth errors
   */
  const authFetch = useCallback(
    async (url: string, options?: AuthFetchOptions): Promise<Response> => {
      const { skipAuthRedirect = false, ...fetchOptions } = options || {};

      const response = await fetch(url, fetchOptions);

      // Handle auth errors with router instead of hard redirect
      if (
        !skipAuthRedirect &&
        (response.status === 401 || response.status === 403)
      ) {
        router.push("/login?expired=true");
      }

      return response;
    },
    [router],
  );

  /**
   * JSON fetch helper
   */
  const authFetchJSON = useCallback(
    async <T = any>(url: string, options?: AuthFetchOptions): Promise<T> => {
      const response = await authFetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [authFetch],
  );

  /**
   * POST helper
   */
  const authPost = useCallback(
    async <T = any>(
      url: string,
      data?: any,
      options?: AuthFetchOptions,
    ): Promise<T> => {
      return authFetchJSON<T>(url, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [authFetchJSON],
  );

  /**
   * PUT helper
   */
  const authPut = useCallback(
    async <T = any>(
      url: string,
      data?: any,
      options?: AuthFetchOptions,
    ): Promise<T> => {
      return authFetchJSON<T>(url, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    [authFetchJSON],
  );

  /**
   * DELETE helper
   */
  const authDelete = useCallback(
    async <T = any>(url: string, options?: AuthFetchOptions): Promise<T> => {
      return authFetchJSON<T>(url, {
        ...options,
        method: "DELETE",
      });
    },
    [authFetchJSON],
  );

  /**
   * GET helper
   */
  const authGet = useCallback(
    async <T = any>(url: string, options?: AuthFetchOptions): Promise<T> => {
      return authFetchJSON<T>(url, {
        ...options,
        method: "GET",
      });
    },
    [authFetchJSON],
  );

  return {
    authFetch,
    authFetchJSON,
    authPost,
    authPut,
    authDelete,
    authGet,
  };
}
