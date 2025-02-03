import type React from "react";

export default function CommitteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 bg-black">{children}</div>;
}
