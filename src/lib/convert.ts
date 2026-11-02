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

/** Compact offset like GMT+1, GMT+8, GMT+5:30. */
export function gmtOffset(date: Date, timeZone: string): string {
  const raw = offsetLabel(date, timeZone).replace(/^UTC/, "GMT").replace(/\s+/g, "");
  const match = raw.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/i);
  if (!match) return raw === "GMT" ? "GMT+0" : raw;
  const hours = Number(match[2]);
  const minutes = match[3] ? Number(match[3]) : 0;
  if (minutes === 0) return `GMT${match[1]}${hours}`;
  return `GMT${match[1]}${hours}:${String(minutes).padStart(2, "0")}`;
}

export type DurationParts = {
  days: number;
  hours: number;
  minutes: number;
  inverted: boolean;
};

export function formatDuration(parts: DurationParts): string {
  return `${parts.days}d ${parts.hours}h ${parts.minutes}m`;
}

export function diffDuration(from: Date, to: Date): DurationParts {
  const inverted = to.getTime() < from.getTime();
  const ms = Math.abs(to.getTime() - from.getTime());
  const totalMinutes = Math.floor(ms / 60_000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes, inverted };
}
