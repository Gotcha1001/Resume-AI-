import { ExperienceLevel } from "@/drizzle/schema";

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}

export function formatExperienceLevel(level: ExperienceLevel) {
  switch (level) {
    case "junior":
      return "Junior";
    case "mid":
      return "Mid-Level";
    case "senior":
      return "Senior";
    default:
      throw new Error(`Unknown experience level: ${level satisfies never}`);
  }
}
