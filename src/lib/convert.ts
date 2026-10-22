const TIMESTAMP_RE =
  /\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}(?::?\d{2})?)?/g;

export function extractTimestamps(text: string): string[] {
  return text.match(TIMESTAMP_RE) ?? [];
}

export function toIsoUtc(value: string): string {
  let iso = value.trim().replace(" ", "T");

  if (/Z$/.test(iso)) return iso;
  if (/[+-]\d{2}:\d{2}$/.test(iso)) return iso;
  if (/[+-]\d{4}$/.test(iso)) {
    return `${iso.slice(0, -2)}:${iso.slice(-2)}`;
  }
  if (/[+-]\d{2}$/.test(iso)) return `${iso}:00`;
  return `${iso}Z`;
}

export function parseAsGmt(value: string): Date | null {
  const date = new Date(toIsoUtc(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  }).format(date);
}

export function offsetLabel(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  }).formatToParts(date);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}
