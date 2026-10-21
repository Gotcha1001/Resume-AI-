import { db } from "@/drizzle/db";
import { JobInfoTable, QuestionTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/lib/getCurrentUser";
import { and, desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobInfoId = searchParams.get("jobInfoId");

  if (!jobInfoId) {
    return new Response("Missing jobInfoId", { status: 400 });
  }

  const { userId } = await getCurrentUser();
  if (userId == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const jobInfo = await db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, jobInfoId), eq(JobInfoTable.userId, userId)),
    columns: { id: true },
  });

  if (jobInfo == null) {
    return new Response("Forbidden", { status: 403 });
  }

  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: [desc(QuestionTable.createdAt)],
    columns: { id: true },
  });

  if (question == null) {
    return new Response("No question found", { status: 404 });
  }

  return Response.json({ id: question.id });
}
