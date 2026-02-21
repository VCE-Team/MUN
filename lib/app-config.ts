/**
 * Single source for app and admin config. Change these values here only.
 * Do not commit sensitive values if this file is tracked; or add to .gitignore.
 */
export const appConfig = {
  /** Backend API base URL (registration + admin APIs) */
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL || 'https://munvcebackend.vercel.app',
  /** Secret path segment for admin login. URL: /admin/<adminSecretPath> */
  adminSecretPath:
    process.env.ADMIN_SECRET_PATH ||
    'admin-path-only-for-vce-mun-adminstrators',
} as const;
