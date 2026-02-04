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

function getCommitteeSummary(doc: PriorityDoc): string {
  if (doc.committeePreferences && Array.isArray(doc.committeePreferences)) {
    return doc.committeePreferences
      .sort((a, b) => a.rank - b.rank)
      .map((p) => `${p.rank}: ${p.committee}`)
      .join(", ");
  }
  const a = doc.firstPreferenceCommittee || "—";
  const b = doc.secondPreferenceCommittee || "—";
  const c = doc.thirdPreferenceCommittee || "—";
  return `1: ${a}, 2: ${b}, 3: ${c}`;
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
  const [college, setCollege] = useState("");
  const [list, setList] = useState<PriorityDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyKey, setApplyKey] = useState(0);

  const fetchList = useCallback(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (targetAudience) queryParams.set("targetAudience", targetAudience);
    if (committee) queryParams.set("committee", committee);
    if (firstPreferenceCommittee) queryParams.set("firstPreferenceCommittee", firstPreferenceCommittee);
    if (country.trim()) queryParams.set("country", country.trim());
    if (college.trim()) queryParams.set("college", college.trim());
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
  }, [targetAudience, committee, firstPreferenceCommittee, country, college, router, secretPath]);

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
          <Input
            placeholder="Any"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-[120px] border-white/20 bg-white/5 md:w-[140px]"
          />
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
                      <TableCell className="max-w-[200px] truncate text-xs">{getCommitteeSummary(row)}</TableCell>
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
