"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { appConfig } from "@/lib/app-config";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type PriorityDoc = {
  _id?: unknown;
  targetAudience?: string;
  name?: string;
  email?: string;
  phone?: string;
  institution?: string;
  otherInstitution?: string | null;
  rollNumber?: string | null;
  committeePreferences?: Array<{
    rank: number;
    committee: string;
    allocation: { type: string; first?: string; second?: string; third?: string; ipRole?: string };
  }>;
  firstPreferenceCommittee?: string;
  secondPreferenceCommittee?: string;
  thirdPreferenceCommittee?: string;
  priorMUNExperience?: string;
  transportationRequired?: string;
  foodPreference?: string;
  transactionId?: string;
  registrationFee?: number;
  registeredAt?: string | { $date: string };
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

export function PriorityDetailView({
  id,
  onBack,
}: {
  id: string;
  onBack: () => void;
}) {
  const [doc, setDoc] = useState<PriorityDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setScreenshotUrl(null);
    setScreenshotError(null);
    fetch(`${appConfig.backendUrl}/api/admin/priority-registrations/${id}`, {
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

  const prefs = doc.committeePreferences
    ? doc.committeePreferences
        .sort((a, b) => a.rank - b.rank)
        .map(
          (p) =>
            `${p.rank}: ${p.committee}` +
            (p.allocation?.type === "countries"
              ? ` (${[p.allocation.first, p.allocation.second, p.allocation.third].filter(Boolean).join(", ")})`
              : p.allocation?.type === "ipRole"
                ? ` (${p.allocation.ipRole})`
                : "")
        )
        .join(" · ")
    : [doc.firstPreferenceCommittee, doc.secondPreferenceCommittee, doc.thirdPreferenceCommittee]
        .filter(Boolean)
        .join(", ");

  const fetchScreenshot = () => {
    setScreenshotLoading(true);
    setScreenshotError(null);
    setScreenshotUrl(null);
    fetch(`${appConfig.backendUrl}/api/admin/priority-registrations/${id}/screenshot`, {
      headers: getAdminHeaders(),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const url = data?.paymentScreenshotUrl;
        if (url && (url.startsWith("data:") || url.startsWith("https:"))) {
          setScreenshotUrl(url);
        } else {
          setScreenshotError("No payment screenshot available.");
        }
      })
      .catch(() => setScreenshotError("Failed to load screenshot."))
      .finally(() => setScreenshotLoading(false));
  };

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
        <DetailRow label="Institution" value={doc.institution ?? doc.otherInstitution} />
        <DetailRow label="Target audience" value={doc.targetAudience} />
        <DetailRow label="Roll number" value={doc.rollNumber} />
        <DetailRow label="Committee preferences" value={prefs} />
        <DetailRow label="Prior MUN experience" value={doc.priorMUNExperience} />
        <DetailRow label="Transportation" value={doc.transportationRequired} />
        <DetailRow label="Food preference" value={doc.foodPreference} />
        <DetailRow label="Transaction ID" value={doc.transactionId} />
        <DetailRow label="Registration fee" value={doc.registrationFee != null ? `₹${doc.registrationFee}` : undefined} />
        <DetailRow label="Registered at" value={formatDate(doc.registeredAt)} />

        <div className="pt-4 border-t border-white/10 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
            onClick={fetchScreenshot}
            disabled={screenshotLoading}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {screenshotLoading ? "Loading…" : "Show Payment Screenshot"}
          </Button>
          {screenshotError && (
            <p className="mt-2 text-sm text-amber-500/90">{screenshotError}</p>
          )}
          {screenshotUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border border-white/20 bg-black/40 max-w-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshotUrl}
                alt="Payment screenshot"
                className="w-full h-auto block"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
