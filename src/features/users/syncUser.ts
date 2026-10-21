import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { upsertUser } from "./db";

export const syncCurrentUser = cache(async () => {
  const { userId } = await auth();
  if (userId == null) return null;

  // Skip the Clerk API call + write if the user is already stored
  const existing = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, userId),
  });
  if (existing) return existing;

  const user = await currentUser();
  if (user == null) return null;

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;
  if (email == null) throw new Error("Clerk user has no email");

  await upsertUser({
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || email,
    email,
    imageUrl: user.imageUrl,
    updatedAt: new Date(),
  });

  return db.query.UserTable.findFirst({ where: eq(UserTable.id, userId) });
});
