'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { appConfig } from '@/lib/app-config';
import { Skeleton } from '@/components/ui/skeleton';
import type { PriorityRegistrationDoc } from '@/lib/admin-types';
import { isApiError } from '@/lib/admin-types';
import { getAdminHeaders, formatAdminDate } from '@/lib/admin-utils';
import {
    getCached,
    setCached,
    invalidateAll,
    firstRoundDocKey,
    firstRoundScreenshotKey,
    CACHE_TTL,
} from '@/lib/admin-api-cache';

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
            <span className="break-words">{value ?? '—'}</span>
        </div>
    );
}

export function FirstRoundDetailView({
    id,
    onBack,
}: {
    id: string;
    onBack: () => void;
}) {
    const router = useRouter();
    const params = useParams();
    const secretPath = params.secretPath as string;
    const [doc, setDoc] = useState<PriorityRegistrationDoc | null>(null);
    const [loading, setLoading] = useState(true);
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
    const [screenshotLoading, setScreenshotLoading] = useState(false);
    const [screenshotError, setScreenshotError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        setScreenshotUrl(null);
        setScreenshotError(null);
        setFetchError(null);

        const cacheKey = firstRoundDocKey(id);
        const cached = getCached<PriorityRegistrationDoc>(cacheKey);

        if (cached !== undefined) {
            setDoc(cached);
            setLoading(false);
        } else {
            setLoading(true);
        }

        fetch(`${appConfig.backendUrl}/api/admin/first-round-registrations/${id}`, {
            headers: getAdminHeaders(),
        })
            .then((r) => {
                if (r.status === 401) {
                    invalidateAll();
                    if (typeof localStorage !== 'undefined')
                        localStorage.removeItem('adminToken');
                    router.replace(`/admin/${secretPath}`);
                    return null;
                }
                return r.json();
            })
            .then((data: unknown) => {
                if (!mountedRef.current) return;
                if (data !== null && !isApiError(data)) {
                    setDoc(data as PriorityRegistrationDoc);
                    setCached(cacheKey, data as PriorityRegistrationDoc, CACHE_TTL.doc);
                    setFetchError(null);
                } else {
                    setDoc(null);
                    setFetchError(
                        data && isApiError(data)
                            ? ((data as { message?: string }).message ?? 'Not found')
                            : 'Not found'
                    );
                }
            })
            .catch(() => {
                if (mountedRef.current) {
                    setDoc(null);
                    setFetchError('Failed to load registration.');
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
                    {fetchError ?? 'Registration not found.'}
                </p>
            </div>
        );
    }

    const prefs = doc.committeePreferences
        ? doc.committeePreferences
            .sort((a, b) => a.rank - b.rank)
            .map(
                (p) =>
                    `${p.rank}: ${p.committee}` +
                    (p.allocation?.type === 'countries'
                        ? ` (${[p.allocation.first, p.allocation.second, p.allocation.third].filter(Boolean).join(', ')})`
                        : p.allocation?.type === 'ipRole'
                            ? ` (${p.allocation.ipRole})`
                            : '')
            )
            .join(' · ')
        : [
            doc.firstPreferenceCommittee,
            doc.secondPreferenceCommittee,
            doc.thirdPreferenceCommittee,
        ]
            .filter(Boolean)
            .join(', ');

    const fetchScreenshot = () => {
        const screenshotCacheKey = firstRoundScreenshotKey(id);
        const cached = getCached<string>(screenshotCacheKey);
        if (cached !== undefined) {
            setScreenshotUrl(cached);
            setScreenshotError(null);
            return;
        }
        setScreenshotLoading(true);
        setScreenshotError(null);
        setScreenshotUrl(null);
        fetch(
            `${appConfig.backendUrl}/api/admin/first-round-registrations/${id}/screenshot`,
            { headers: getAdminHeaders() }
        )
            .then((r) => (r.ok ? r.json() : null))
            .then((data: { paymentScreenshotUrl?: string | null } | null) => {
                const url = data?.paymentScreenshotUrl;
                if (url && (url.startsWith('data:') || url.startsWith('https:'))) {
                    setScreenshotUrl(url);
                    setCached(screenshotCacheKey, url, CACHE_TTL.screenshot);
                } else {
                    setScreenshotError('No payment screenshot available.');
                }
            })
            .catch(() => setScreenshotError('Failed to load screenshot.'))
            .finally(() => setScreenshotLoading(false));
    };

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
                    {doc.name ?? '—'}
                </h2>
                <DetailRow label="Email" value={doc.email} />
                <DetailRow label="Phone" value={doc.phone} />
                <DetailRow
                    label="Institution"
                    value={doc.institution ?? doc.otherInstitution}
                />
                <DetailRow label="Target audience" value={doc.targetAudience} />
                <DetailRow label="Roll number" value={doc.rollNumber} />
                <DetailRow label="Committee preferences" value={prefs} />
                <DetailRow
                    label="Prior MUN experience"
                    value={doc.priorMUNExperience}
                />
                <DetailRow label="Transportation" value={doc.transportationRequired} />
                <DetailRow label="Food preference" value={doc.foodPreference} />
                <DetailRow label="Transaction ID" value={doc.transactionId} />
                <DetailRow
                    label="Registration fee"
                    value={
                        doc.registrationFee != null ? `₹${doc.registrationFee}` : undefined
                    }
                />
                <DetailRow
                    label="Registered at"
                    value={formatAdminDate(doc.registeredAt)}
                />

                <div className="pt-4 border-t border-white/10 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 w-full sm:w-auto"
                        onClick={fetchScreenshot}
                        disabled={screenshotLoading}
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        {screenshotLoading ? 'Loading…' : 'Show Payment Screenshot'}
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
