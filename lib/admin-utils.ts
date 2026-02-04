/**
 * Shared admin dashboard utilities: auth headers and date formatting.
 */

export function getAdminHeaders(): HeadersInit {
  if (typeof localStorage === "undefined") return {};
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function formatAdminDate(
  val: string | { $date: string } | undefined
): string {
  if (!val) return "—";
  const d = typeof val === "string" ? val : (val as { $date?: string })?.$date;
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}
