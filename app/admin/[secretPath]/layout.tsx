import { notFound } from "next/navigation";
import type React from "react";
import { appConfig } from "@/lib/app-config";

export async function generateStaticParams() {
  return [{ secretPath: appConfig.adminSecretPath }];
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ secretPath: string }>;
}) {
  const { secretPath } = await params;
  if (secretPath !== appConfig.adminSecretPath) {
    notFound();
  }
  return (
    <div className="admin-theme min-h-screen bg-black text-foreground">
      {children}
    </div>
  );
}
