/**
 * Shared types for admin API responses and document ids.
 * Used by admin dashboard list/detail views and cache layer.
 */

/** MongoDB _id as returned by API (object with $oid or string) */
export type DocId = string | { $oid?: string };

/** Normalize _id to string for API params and keys */
export function normalizeId(id: DocId | null | undefined): string {
  if (id == null) return "";
  if (typeof id === "string") return id;
  return (id as { $oid?: string }).$oid ?? "";
}

/** Committee preference allocation (priority registration) */
export interface CommitteeAllocation {
  type: string;
  first?: string;
  second?: string;
  third?: string;
  ipRole?: string;
}

/** Single committee preference entry */
export interface CommitteePreferenceItem {
  rank: number;
  committee: string;
  allocation?: CommitteeAllocation;
}

/** Priority registration list item (same shape as API list response item) */
export interface PriorityRegistrationListItem {
  _id?: DocId;
  targetAudience?: string;
  name?: string;
  email?: string;
  phone?: string;
  institution?: string;
  otherInstitution?: string | null;
  rollNumber?: string | null;
  committeePreferences?: CommitteePreferenceItem[];
  firstPreferenceCommittee?: string;
  secondPreferenceCommittee?: string;
  thirdPreferenceCommittee?: string;
  priorMUNExperience?: string;
  transportationRequired?: string;
  foodPreference?: string;
  transactionId?: string;
  registrationFee?: number;
  registeredAt?: string | { $date: string };
}

/** Full priority registration doc (by-id response; no paymentScreenshotUrl) */
export type PriorityRegistrationDoc = PriorityRegistrationListItem;

/** Past registration list item */
export interface PastRegistrationListItem {
  _id?: DocId;
  name?: string;
  email?: string;
  phone?: string;
  committee?: string;
  firstPreferenceCountry?: string;
  secondPreferenceCountry?: string;
  thirdPreferenceCountry?: string;
  institution?: string;
  otherInstitution?: string | null;
  rollNumber?: string | null;
  transactionId?: string;
  registeredAt?: string | { $date: string };
  registrationType?: string;
  isGroupRegistration?: boolean;
  groupId?: string;
  qrUsed?: string;
  role?: string | null;
  priorExperiences?: string;
}

/** Full past registration doc (by-id response) */
export type PastRegistrationDoc = PastRegistrationListItem;

/** API error response shape */
export interface ApiError {
  success?: boolean;
  message?: string;
}

/** Screenshot endpoint response */
export interface ScreenshotResponse {
  paymentScreenshotUrl: string | null;
}

/** Type guard: is API response an error (has message and not array) */
export function isApiError(
  data: unknown
): data is ApiError {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    !Array.isArray(data)
  );
}

/** Type guard: priority list response is array */
export function isPriorityListResponse(
  data: unknown
): data is PriorityRegistrationListItem[] {
  return Array.isArray(data);
}

/** Type guard: past list response is array */
export function isPastListResponse(
  data: unknown
): data is PastRegistrationListItem[] {
  return Array.isArray(data);
}
