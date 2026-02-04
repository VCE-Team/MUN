"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { PriorityRegistrationsView } from "@/app/admin/[secretPath]/dashboard/priority-registrations-view";
import { PastRegistrationsView } from "@/app/admin/[secretPath]/dashboard/past-registrations-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/error-boundary";
import { invalidateAll } from "@/lib/admin-api-cache";
import { appConfig } from "@/lib/app-config";

export default function AdminDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const secretPath = params.secretPath as string;
  const [authOk, setAuthOk] = useState<boolean | null>(null);

  useEffect(() => {
    const token =
      typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!token) {
      setAuthOk(false);
      return;
    }
    fetch(`${appConfig.backendUrl}/api/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.ok) setAuthOk(true);
        else setAuthOk(false);
      })
      .catch(() => setAuthOk(false));
  }, []);

  useEffect(() => {
    if (authOk === false) {
      router.replace(`/admin/${secretPath}`);
    }
  }, [authOk, router, secretPath]);

  function handleLogout() {
    invalidateAll();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    router.replace(`/admin/${secretPath}`);
    router.refresh();
  }

  if (authOk === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (authOk === false) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md md:px-6 min-w-0">
        <h1 className="text-base sm:text-lg font-semibold text-[var(--logo-gold-yellow)] truncate min-w-0">
          VCEMUN Admin
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-muted-foreground hover:bg-white/10 shrink-0 text-sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </header>
      <main className="flex-1 p-4 md:p-6 min-w-0 overflow-x-hidden">
        <ErrorBoundary>
          <Tabs defaultValue="priority" className="w-full min-w-0">
            <TabsList className="mb-4 h-12 w-full max-w-full sm:max-w-md border border-white/10 bg-black/40 p-1 backdrop-blur-sm md:max-w-sm">
              <TabsTrigger
                value="priority"
                className="flex-1 min-w-0 text-xs sm:text-sm truncate data-[state=active]:bg-[var(--logo-gold-yellow)] data-[state=active]:text-black"
              >
                Priority (VCEMUN 2026)
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex-1 min-w-0 text-xs sm:text-sm truncate data-[state=active]:bg-[var(--logo-gold-yellow)] data-[state=active]:text-black"
              >
                Past registrations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="priority" className="mt-0">
              <PriorityRegistrationsView />
            </TabsContent>
            <TabsContent value="past" className="mt-0">
              <PastRegistrationsView />
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </main>
    </div>
  );
}
