import { hasPersmission } from "@/services/lib/hasPermission";

export async function canRunResumeAnalysis() {
  return hasPersmission("unlimited_resume_analysis");
}
