import { getCurrentUser } from "@/services/lib/getCurrentUser";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { Navbar } from "./_Navbar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user: userPromise } = await getCurrentUser({
    allData: true,
  });

  if (userId == null) return redirect("/");

  const user = await userPromise;
  if (user == null) return redirect("/onboarding");

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
