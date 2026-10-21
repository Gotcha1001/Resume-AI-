import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { updateTag } from "next/cache";

export function getQuestionGobalTag() {
  return getGlobalTag("questions");
}

export function getQuestionJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("questions", jobInfoId);
}

export function getQuestionIdTag(id: string) {
  return getIdTag("questions", id);
}

export function revalidateQuestionCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  updateTag(getQuestionGobalTag());
  updateTag(getQuestionJobInfoTag(jobInfoId));
  updateTag(getQuestionIdTag(id));
}
