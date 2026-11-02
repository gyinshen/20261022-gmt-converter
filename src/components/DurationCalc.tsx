"use client";

import { useMemo, useState } from "react";
import {
  diffDuration,
  extractTimestamps,
  formatDuration,
  parseAsGmt,
} from "@/lib/convert";

const EXAMPLE_A = "2026-10-13 08:26:24.370651+00";
const EXAMPLE_B = "2026-10-21T15:59:59";

function parseFirst(text: string) {
  const stamp = extractTimestamps(text)[0];
  if (!stamp) return null;
  const date = parseAsGmt(stamp);
  return date ? { stamp, date } : null;
}

export function DurationCalc() {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const start = useMemo(() => parseFirst(startInput), [startInput]);
  const end = useMemo(() => parseFirst(endInput), [endInput]);
  const duration = start && end ? diffDuration(start.date, end.date) : null;

  return (
    <div className="w-full max-w-xl space-y-4">
      <div>
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          Duration
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          Time difference
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Paste two timestamps. Same formats as above.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-time" className="mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Start
          </label>
          <input
            id="start-time"
            type="text"
            value={startInput}
            onChange={(event) => setStartInput(event.target.value)}
            placeholder={EXAMPLE_A}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 font-mono text-sm outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
        <div>
          <label htmlFor="end-time" className="mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
            End
          </label>
          <input
            id="end-time"
            type="text"
            value={endInput}
            onChange={(event) => setEndInput(event.target.value)}
            placeholder={EXAMPLE_B}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 font-mono text-sm outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          Difference
        </p>
        {!duration ? (
          <p className="mt-2 text-lg text-zinc-400">
            Paste a start and end time
          </p>
        ) : (
          <>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {formatDuration(duration)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {duration.days} day{duration.days === 1 ? "" : "s"}, {duration.hours}{" "}
              hour{duration.hours === 1 ? "" : "s"}, {duration.minutes} minute
              {duration.minutes === 1 ? "" : "s"}
              {duration.inverted ? " · end is before start" : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
