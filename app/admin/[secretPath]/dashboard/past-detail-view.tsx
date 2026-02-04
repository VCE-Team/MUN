"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { appConfig } from "@/lib/app-config";
import { Skeleton } from "@/components/ui/skeleton";
import type { PastRegistrationDoc } from "@/lib/admin-types";
import { isApiError } from "@/lib/admin-types";
import { getAdminHeaders, formatAdminDate } from "@/lib/admin-utils";
import {
  getCached,
  setCached,
  invalidateAll,
  pastDocKey,
  CACHE_TTL,
} from "@/lib/admin-api-cache";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 py-2 first:pt-0 last:border-0">
      <span className="text-muted-foreground shrink-0 w-44">{label}</span>
      <span className="break-words">{value ?? "—"}</span>
    </div>
  );
}

export function PastDetailView({
  id,
  onBack,
}: {
  id: string;
  onBack: () => void;
}) {
  const router = useRouter();
  const params = useParams();
  const secretPath = params.secretPath as string;
  const [doc, setDoc] = useState<PastRegistrationDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setFetchError(null);

    const cacheKey = pastDocKey(id);
    const cached = getCached<PastRegistrationDoc>(cacheKey);

    if (cached !== undefined) {
      setDoc(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    fetch(`${appConfig.backendUrl}/api/admin/past-registrations/${id}`, {
      headers: getAdminHeaders(),
    })
      .then((r) => {
        if (r.status === 401) {
          invalidateAll();
          if (typeof localStorage !== "undefined")
            localStorage.removeItem("adminToken");
          router.replace(`/admin/${secretPath}`);
          return null;
        }
        return r.json();
      })
      .then((data: unknown) => {
        if (!mountedRef.current) return;
        if (data !== null && !isApiError(data)) {
          setDoc(data as PastRegistrationDoc);
          setCached(cacheKey, data as PastRegistrationDoc, CACHE_TTL.doc);
          setFetchError(null);
        } else {
          setDoc(null);
          setFetchError(
            data && isApiError(data)
              ? (data as { message?: string }).message ?? "Not found"
              : "Not found"
          );
        }
      })
      .catch(() => {
        if (mountedRef.current) {
          setDoc(null);
          setFetchError("Failed to load registration.");
        }
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [id, router, secretPath]);

  if (loading && !doc) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
        <Skeleton className="h-64 w-full rounded-xl border border-white/10" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
        <p className="text-muted-foreground">
          {fetchError ?? "Registration not found."}
        </p>
      </div>
    );
  }

  const countries = [
    doc.firstPreferenceCountry,
    doc.secondPreferenceCountry,
    doc.thirdPreferenceCountry,
  ]
    .filter(Boolean)
    .join(", ") || "—";

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="text-muted-foreground w-full sm:w-auto"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>

      <div className="glass-panel rounded-xl border border-white/10 p-4 sm:p-6 space-y-1">
        <h2 className="text-xl font-semibold text-[var(--logo-gold-yellow)] mb-4">
          {doc.name ?? "—"}
        </h2>
        <DetailRow label="Email" value={doc.email} />
        <DetailRow label="Phone" value={doc.phone} />
        <DetailRow label="Committee" value={doc.committee} />
        <DetailRow label="Country preferences" value={countries} />
        <DetailRow
          label="Institution"
          value={doc.institution ?? doc.otherInstitution}
        />
        <DetailRow label="Roll number" value={doc.rollNumber} />
        <DetailRow label="Transaction ID" value={doc.transactionId} />
        <DetailRow label="Registration type" value={doc.registrationType} />
        <DetailRow
          label="Group registration"
          value={
            doc.isGroupRegistration != null
              ? String(doc.isGroupRegistration)
              : undefined
          }
        />
        <DetailRow label="Group ID" value={doc.groupId} />
        <DetailRow label="QR used" value={doc.qrUsed} />
        <DetailRow label="Role" value={doc.role} />
        <DetailRow label="Prior experiences" value={doc.priorExperiences} />
        <DetailRow
          label="Registered at"
          value={formatAdminDate(doc.registeredAt)}
        />
      </div>
    </div>
  );
}
