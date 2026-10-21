// src/app/(protected)/layout.tsx
import { ReactNode } from "react";
import { syncCurrentUser } from "@/features/users/syncUser";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await syncCurrentUser();
  return <>{children}</>;
}
