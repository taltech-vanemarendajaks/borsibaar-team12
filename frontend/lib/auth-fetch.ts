/**
 * Centralized authentication-aware fetch wrapper
 * Automatically handles session expiry and redirects to login
 */

type AuthFetchOptions = RequestInit & {
  skipAuthRedirect?: boolean; // Option to disable auto-redirect for specific calls
};

/**
 * Wrapper around native fetch that handles authentication errors
 * Intercepts 401/403 responses and redirects to login page
 *
 * @param url - The URL to fetch
 * @param options - Fetch options with optional skipAuthRedirect flag
 * @returns Promise with the response
 */
export async function authFetch(
  url: string,
  options?: AuthFetchOptions,
): Promise<Response> {
  const { skipAuthRedirect = false, ...fetchOptions } = options || {};

  try {
    const response = await fetch(url, fetchOptions);

    // Check for authentication errors
    if (
      !skipAuthRedirect &&
      (response.status === 401 || response.status === 403)
    ) {
      handleAuthError();
      // Return the response anyway in case the caller wants to handle it
      return response;
    }

    return response;
  } catch (error) {
    // Re-throw network errors
    throw error;
  }
}

/**
 * Handles authentication errors by redirecting to login
 * Auth state is managed via HttpOnly cookies, no client-side cleanup needed
 */
function handleAuthError(): void {
  // Redirect to login with expired session parameter
  // Only redirect if we're not already on the login page
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.startsWith("/login")
  ) {
    window.location.href = "/login?expired=true";
  }
}

/**
 * Convenience wrapper for JSON API calls
 * Automatically parses JSON and handles auth errors
 *
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise with parsed JSON data
 */
export async function authFetchJSON<T = any>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  const response = await authFetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // For non-auth errors, throw with response details
    const error = new Error(`HTTP error! status: ${response.status}`);
    throw error;
  }

  return response.json();
}

/**
 * POST request helper with JSON body
 */
export async function authPost<T = any>(
  url: string,
  data?: any,
  options?: AuthFetchOptions,
): Promise<T> {
  return authFetchJSON<T>(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper with JSON body
 */
export async function authPut<T = any>(
  url: string,
  data?: any,
  options?: AuthFetchOptions,
): Promise<T> {
  return authFetchJSON<T>(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function authDelete<T = any>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  return authFetchJSON<T>(url, {
    ...options,
    method: "DELETE",
  });
}

/**
 * GET request helper
 */
export async function authGet<T = any>(
  url: string,
  options?: AuthFetchOptions,
): Promise<T> {
  return authFetchJSON<T>(url, {
    ...options,
    method: "GET",
  });
}
