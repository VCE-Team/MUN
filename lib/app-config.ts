/**
 * Single source for app and admin config. Change these values here only.
 * Do not commit sensitive values if this file is tracked; or add to .gitignore.
 */
export const appConfig = {
  /** Backend API base URL (registration + admin APIs) */
  backendUrl: "https://munvcebackend.vercel.app",
  /** Secret path segment for admin login. URL: /admin/<adminSecretPath> */
  adminSecretPath: "admin-path-only-for-vce-mun-adminstrators",
} as const;
