"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { appConfig } from "@/lib/app-config";
import { Skeleton } from "@/components/ui/skeleton";

type PastDoc = {
  _id?: unknown;
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
  [key: string]: unknown;
};

function getAdminHeaders(): HeadersInit {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDate(val: string | { $date: string } | undefined): string {
  if (!val) return "—";
  const d = typeof val === "string" ? val : (val as { $date?: string })?.$date;
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
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
  const [doc, setDoc] = useState<PastDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${appConfig.backendUrl}/api/admin/past-registrations/${id}`, {
      headers: getAdminHeaders(),
    })
      .then((r) => {
        if (r.status === 401) return null;
        return r.json();
      })
      .then((data) => {
        if (data && !data.message) setDoc(data);
        else setDoc(null);
      })
      .catch(() => setDoc(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
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
        <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
        <p className="text-muted-foreground">Registration not found.</p>
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
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to list
      </Button>

      <div className="glass-panel rounded-xl border border-white/10 p-6 space-y-1">
        <h2 className="text-xl font-semibold text-[var(--logo-gold-yellow)] mb-4">
          {doc.name ?? "—"}
        </h2>
        <DetailRow label="Email" value={doc.email} />
        <DetailRow label="Phone" value={doc.phone} />
        <DetailRow label="Committee" value={doc.committee} />
        <DetailRow label="Country preferences" value={countries} />
        <DetailRow label="Institution" value={doc.institution ?? doc.otherInstitution} />
        <DetailRow label="Roll number" value={doc.rollNumber} />
        <DetailRow label="Transaction ID" value={doc.transactionId} />
        <DetailRow label="Registration type" value={doc.registrationType} />
        <DetailRow label="Group registration" value={doc.isGroupRegistration != null ? String(doc.isGroupRegistration) : undefined} />
        <DetailRow label="Group ID" value={doc.groupId} />
        <DetailRow label="QR used" value={doc.qrUsed} />
        <DetailRow label="Role" value={doc.role} />
        <DetailRow label="Prior experiences" value={doc.priorExperiences} />
        <DetailRow label="Registered at" value={formatDate(doc.registeredAt)} />
      </div>
    </div>
  );
}
