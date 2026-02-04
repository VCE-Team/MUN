"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { appConfig } from "@/lib/app-config";
import { INSTITUTION_OPTIONS } from "@/lib/institutions";

type PriorityDoc = {
  _id?: { $oid?: string };
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
  paymentScreenshotUrl?: string;
  registrationFee?: number;
  registeredAt?: string | { $date: string };
};

function formatDate(val: string | { $date: string } | undefined): string {
  if (!val) return "—";
  const d = typeof val === "string" ? val : val?.$date;
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "—";
  }
}

function getCommitteePreferenceItems(doc: PriorityDoc): { rank: number; committee: string }[] {
  if (doc.committeePreferences && Array.isArray(doc.committeePreferences)) {
    return doc.committeePreferences
      .sort((a, b) => a.rank - b.rank)
      .map((p) => ({ rank: p.rank, committee: p.committee }));
  }
  return [
    { rank: 1, committee: doc.firstPreferenceCommittee ?? "" },
    { rank: 2, committee: doc.secondPreferenceCommittee ?? "" },
    { rank: 3, committee: doc.thirdPreferenceCommittee ?? "" },
  ].filter((p) => p.committee);
}

const TARGET_OPTIONS = [
  { value: "all", label: "All" },
  { value: "inHouse", label: "In House" },
  { value: "otherCollege", label: "Other College" },
];
const COMMITTEE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "disec", label: "DISEC" },
  { value: "unhrc", label: "UNHRC" },
  { value: "aippm", label: "AIPPM" },
  { value: "ip", label: "IP" },
];

const COMMITTEE_COLORS: Record<string, string> = {
  unhrc: "bg-red-500/25 text-red-300 border-red-500/50",
  disec: "bg-blue-500/25 text-blue-300 border-blue-500/50",
  aippm: "bg-orange-500/25 text-orange-300 border-orange-500/50",
  ip: "bg-white/20 text-white border-white/40",
};

function getCommitteeBadgeClass(committee: string): string {
  const c = (committee || "").toLowerCase().trim();
  return COMMITTEE_COLORS[c] ?? "border-white/20 bg-white/10";
}

function getAdminHeaders(): HeadersInit {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null;
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function PriorityRegistrationsView() {
  const router = useRouter();
  const routeParams = useParams();
  const secretPath = routeParams.secretPath as string;
  const [targetAudience, setTargetAudience] = useState("");
  const [committee, setCommittee] = useState("");
  const [firstPreferenceCommittee, setFirstPreferenceCommittee] = useState("");
  const [country, setCountry] = useState("");
  const [collegeSelect, setCollegeSelect] = useState("");
  const [collegeInput, setCollegeInput] = useState("");
  const [list, setList] = useState<PriorityDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyKey, setApplyKey] = useState(0);

  const collegeFilter = (collegeInput.trim().replace(/\s+/g, " ") || collegeSelect || "").trim();

  const fetchList = useCallback(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (targetAudience) queryParams.set("targetAudience", targetAudience);
    if (committee) queryParams.set("committee", committee);
    if (firstPreferenceCommittee) queryParams.set("firstPreferenceCommittee", firstPreferenceCommittee);
    if (country.trim()) queryParams.set("country", country.trim());
    if (collegeFilter) queryParams.set("college", collegeFilter);
    fetch(`${appConfig.backendUrl}/api/admin/priority-registrations?${queryParams}`, {
      headers: getAdminHeaders(),
    })
      .then((r) => {
        if (r.status === 401) {
          if (typeof localStorage !== "undefined") localStorage.removeItem("adminToken");
          router.replace(`/admin/${secretPath}`);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data !== null) setList(Array.isArray(data) ? data : []);
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [targetAudience, committee, firstPreferenceCommittee, country, collegeFilter, router, secretPath]);

  useEffect(() => {
    fetchList();
  }, [applyKey]);

  return (
    <div className="space-y-4">
      <div className="glass-panel flex flex-wrap items-end gap-3 p-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Target</Label>
          <Select value={targetAudience || "all"} onValueChange={(v) => setTargetAudience(v === "all" ? "" : v)}>
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
          <Select value={committee || "all"} onValueChange={(v) => setCommittee(v === "all" ? "" : v)}>
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
          <Select value={firstPreferenceCommittee || "all"} onValueChange={(v) => setFirstPreferenceCommittee(v === "all" ? "" : v)}>
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
            <Select value={collegeSelect || "all"} onValueChange={(v) => setCollegeSelect(v === "all" ? "" : v)}>
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
          onClick={() => setApplyKey((k) => k + 1)}
          className="bg-[var(--logo-gold-yellow)] text-black hover:opacity-90"
        >
          Apply filters
        </Button>
      </div>

      <div className="glass-panel overflow-hidden">
        <ScrollArea className="w-full">
          <div className="min-w-[800px]">
            {loading ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-full rounded border border-white/10" />
                ))}
              </div>
            ) : list.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">No registrations found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Email</TableHead>
                    <TableHead className="text-muted-foreground">Phone</TableHead>
                    <TableHead className="text-muted-foreground">Institution</TableHead>
                    <TableHead className="text-muted-foreground">Target</TableHead>
                    <TableHead className="text-muted-foreground">Preferences</TableHead>
                    <TableHead className="text-muted-foreground">Txn ID</TableHead>
                    <TableHead className="text-muted-foreground">Fee</TableHead>
                    <TableHead className="text-muted-foreground">Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {list.map((row) => (
                    <TableRow key={String(row._id?.$oid ?? row._id)} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">{row.name ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{row.email ?? "—"}</TableCell>
                      <TableCell>{row.phone ?? "—"}</TableCell>
                      <TableCell>{row.institution ?? row.otherInstitution ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="border-white/20 bg-white/10">
                          {row.targetAudience ?? "—"}
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
                          {getCommitteePreferenceItems(row).length === 0 && "—"}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{row.transactionId ?? "—"}</TableCell>
                      <TableCell>₹{row.registrationFee ?? "—"}</TableCell>
                      <TableCell className="text-muted-foreground text-xs">{formatDate(row.registeredAt)}</TableCell>
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
