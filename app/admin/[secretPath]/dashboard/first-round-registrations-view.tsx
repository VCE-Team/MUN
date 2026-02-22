'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';
import { appConfig } from '@/lib/app-config';
import { INSTITUTION_OPTIONS } from '@/lib/institutions';
import { FirstRoundDetailView } from '@/app/admin/[secretPath]/dashboard/first-round-detail-view';
import type { PriorityRegistrationListItem } from '@/lib/admin-types';
import { normalizeId, isPriorityListResponse } from '@/lib/admin-types';
import { getAdminHeaders, formatAdminDate } from '@/lib/admin-utils';
import {
  getCached,
  setCached,
  invalidate,
  invalidateAll,
  firstRoundListKey,
  CACHE_TTL,
} from '@/lib/admin-api-cache';

function getCommitteePreferenceItems(
  doc: PriorityRegistrationListItem
): { rank: number; committee: string }[] {
  if (doc.committeePreferences && Array.isArray(doc.committeePreferences)) {
    return doc.committeePreferences
      .sort((a, b) => a.rank - b.rank)
      .map((p) => ({ rank: p.rank, committee: p.committee }));
  }
  return [
    { rank: 1, committee: doc.firstPreferenceCommittee ?? '' },
    { rank: 2, committee: doc.secondPreferenceCommittee ?? '' },
    { rank: 3, committee: doc.thirdPreferenceCommittee ?? '' },
  ].filter((p) => p.committee);
}

const TARGET_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'inHouse', label: 'In House' },
  { value: 'otherCollege', label: 'Other College' },
];
const COMMITTEE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'disec', label: 'DISEC' },
  { value: 'unhrc', label: 'UNHRC' },
  { value: 'aippm', label: 'AIPPM' },
  { value: 'ip', label: 'IP' },
];

const COMMITTEE_COLORS: Record<string, string> = {
  unhrc: 'bg-red-500/25 text-red-300 border-red-500/50',
  disec: 'bg-blue-500/25 text-blue-300 border-blue-500/50',
  aippm: 'bg-orange-500/25 text-orange-300 border-orange-500/50',
  ip: 'bg-white/20 text-white border-white/40',
};

function getCommitteeBadgeClass(committee: string): string {
  const c = (committee || '').toLowerCase().trim();
  return COMMITTEE_COLORS[c] ?? 'border-white/20 bg-white/10';
}

function buildFirstRoundQueryKey(
  targetAudience: string,
  committee: string,
  firstPreferenceCommittee: string,
  country: string,
  collegeFilter: string
): string {
  return [
    targetAudience,
    committee,
    firstPreferenceCommittee,
    country.trim(),
    collegeFilter,
  ].join('|');
}

export function FirstRoundRegistrationsView() {
  const router = useRouter();
  const routeParams = useParams();
  const secretPath = routeParams.secretPath as string;
  const [targetAudience, setTargetAudience] = useState('');
  const [committee, setCommittee] = useState('');
  const [firstPreferenceCommittee, setFirstPreferenceCommittee] = useState('');
  const [country, setCountry] = useState('');
  const [collegeSelect, setCollegeSelect] = useState('');
  const [collegeInput, setCollegeInput] = useState('');
  const [list, setList] = useState<PriorityRegistrationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyKey, setApplyKey] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revalidateError, setRevalidateError] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const mountedRef = useRef(true);

  const collegeFilter = (
    collegeInput.trim().replace(/\s+/g, ' ') ||
    collegeSelect ||
    ''
  ).trim();

  // Auto-set targetAudience to inHouse when Vardhaman College is selected
  useEffect(() => {
    if (collegeSelect === 'Vardhaman College of Engineering') {
      setTargetAudience('inHouse');
    }
  }, [collegeSelect]);

  const queryKey = buildFirstRoundQueryKey(
    targetAudience,
    committee,
    firstPreferenceCommittee,
    country,
    collegeFilter
  );

  const performFetch = useCallback(
    (skipCache: boolean) => {
      const queryParams = new URLSearchParams();
      if (targetAudience) queryParams.set('targetAudience', targetAudience);
      if (committee) queryParams.set('committee', committee);
      if (firstPreferenceCommittee)
        queryParams.set('firstPreferenceCommittee', firstPreferenceCommittee);
      if (country.trim()) queryParams.set('country', country.trim());
      if (collegeFilter) queryParams.set('college', collegeFilter);
      const url = `${appConfig.backendUrl}/api/admin/first-round-registrations?${queryParams}`;
      const currentKey = firstRoundListKey(queryKey);

      fetch(url, { headers: getAdminHeaders() })
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
          if (data !== null && isPriorityListResponse(data)) {
            setList(data);
            setCached(currentKey, data, CACHE_TTL.priorityList);
            setRevalidateError(null);
          } else if (data === null) {
            setRevalidateError(null);
          }
        })
        .catch(() => {
          if (!mountedRef.current) return;
          if (!skipCache)
            setRevalidateError('Could not refresh; showing cached data.');
        })
        .finally(() => {
          if (mountedRef.current) {
            setLoading(false);
            setRefreshLoading(false);
          }
        });
    },
    [
      targetAudience,
      committee,
      firstPreferenceCommittee,
      country,
      collegeFilter,
      queryKey,
      router,
      secretPath,
    ]
  );

  useEffect(() => {
    mountedRef.current = true;
    const currentKey = firstRoundListKey(queryKey);
    const cached = getCached<PriorityRegistrationListItem[]>(currentKey);

    if (cached !== undefined) {
      setList(cached);
      setLoading(false);
      setRevalidateError(null);
    } else {
      setLoading(true);
    }
    setRefreshLoading(false);
    performFetch(false);

    return () => {
      mountedRef.current = false;
    };
  }, [applyKey]); // eslint-disable-line react-hooks/exhaustive-deps -- we only refetch when Apply is clicked; queryKey is used inside performFetch

  const handleRefresh = useCallback(() => {
    invalidate(firstRoundListKey(queryKey));
    setRefreshLoading(true);
    setLoading(true);
    setRevalidateError(null);
    performFetch(true);
  }, [queryKey, performFetch]);

  const handleApplyFilters = useCallback(() => {
    setCurrentPage(1);
    setApplyKey((k) => k + 1);
  }, []);

  if (selectedId) {
    return (
      <div className="space-y-4">
        <FirstRoundDetailView
          id={selectedId}
          onBack={() => setSelectedId(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass-panel flex flex-wrap items-end gap-3 p-4 md:p-6">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Target</Label>
          <Select
            value={targetAudience || 'all'}
            onValueChange={(v) => setTargetAudience(v === 'all' ? '' : v)}
          >
            <SelectTrigger className="w-[130px] border-white/20 bg-white/5">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {TARGET_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Committee</Label>
          <Select
            value={committee || 'all'}
            onValueChange={(v) => setCommittee(v === 'all' ? '' : v)}
          >
            <SelectTrigger className="w-[130px] border-white/20 bg-white/5">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {COMMITTEE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">1st pref.</Label>
          <Select
            value={firstPreferenceCommittee || 'all'}
            onValueChange={(v) =>
              setFirstPreferenceCommittee(v === 'all' ? '' : v)
            }
          >
            <SelectTrigger className="w-[130px] border-white/20 bg-white/5">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {COMMITTEE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Country</Label>
          <Input
            placeholder="Any"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-[120px] border-white/20 bg-white/5 md:w-[140px]"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">College</Label>
          <div className="flex flex-col gap-1">
            <Select
              value={collegeSelect || 'all'}
              onValueChange={(v) => setCollegeSelect(v === 'all' ? '' : v)}
            >
              <SelectTrigger className="w-[180px] border-white/20 bg-white/5 md:w-[200px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {INSTITUTION_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Or type to filter (any match)"
              value={collegeInput}
              onChange={(e) => setCollegeInput(e.target.value)}
              className="w-[180px] border-white/20 bg-white/5 md:w-[200px]"
            />
          </div>
        </div>
        <Button
          onClick={handleApplyFilters}
          className="bg-[var(--logo-gold-yellow)] text-black hover:opacity-90"
        >
          Apply filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20"
          onClick={handleRefresh}
          disabled={refreshLoading || loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${refreshLoading ? 'animate-spin' : ''}`}
          />
          Refresh
        </Button>
      </div>

      {revalidateError && (
        <p className="text-sm text-amber-500/90">{revalidateError}</p>
      )}

      {!loading && list.length > 0 && (
        <div className="glass-panel p-3 md:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-sm font-semibold text-gray-200">
              Total Registrations:{' '}
              <span className="text-[var(--logo-gold-yellow)]">
                {list.length}
              </span>
            </p>
            <p className="text-sm font-semibold text-gray-200">
              Veg:{' '}
              <span className="text-green-400">
                {list.filter((r) => r.foodPreference === 'veg').length}
              </span>
            </p>
            <p className="text-sm font-semibold text-gray-200">
              Non-Veg:{' '}
              <span className="text-orange-400">
                {list.filter((r) => r.foodPreference === 'nonveg').length}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-white/20"
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              Page {currentPage} of {Math.ceil(list.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(Math.ceil(list.length / itemsPerPage), p + 1)
                )
              }
              disabled={currentPage >= Math.ceil(list.length / itemsPerPage)}
              className="border-white/20"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <div className="glass-panel overflow-hidden w-full max-w-full">
        <ScrollArea className="w-full">
          <div className="min-w-[600px] sm:min-w-[700px] md:min-w-[800px]">
            {loading && list.length === 0 ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-full rounded border border-white/10"
                  />
                ))}
              </div>
            ) : list.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">
                No registrations found.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Phone
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Institution
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Target
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Preferences
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Txn ID
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Registered
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((row) => (
                      <TableRow
                        key={normalizeId(row._id)}
                        className="cursor-pointer border-white/10 hover:bg-white/10"
                        onClick={() => {
                          const id = normalizeId(row._id);
                          if (id) setSelectedId(id);
                        }}
                      >
                        <TableCell className="font-medium">
                          {row.name ?? '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {row.email ?? '—'}
                        </TableCell>
                        <TableCell>{row.phone ?? '—'}</TableCell>
                        <TableCell>
                          {row.institution ?? row.otherInstitution ?? '—'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="border-white/20 bg-white/10"
                          >
                            {row.targetAudience ?? '—'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[220px]">
                          <div className="flex flex-wrap gap-1">
                            {getCommitteePreferenceItems(row).map((p) => (
                              <Badge
                                key={`${p.rank}-${p.committee}`}
                                variant="outline"
                                className={`text-xs shrink-0 ${getCommitteeBadgeClass(p.committee)}`}
                              >
                                {p.rank}: {p.committee}
                              </Badge>
                            ))}
                            {getCommitteePreferenceItems(row).length === 0 &&
                              '—'}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {row.transactionId ?? '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {formatAdminDate(row.registeredAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
