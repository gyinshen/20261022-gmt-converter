"use client";

import { useMemo, useState } from "react";
import { CityCombobox } from "@/components/CityCombobox";
import { DEFAULT_CITY_ID, getCityById } from "@/lib/cities";
import {
  extractTimestamps,
  formatInTimeZone,
  offsetLabel,
  parseAsGmt,
} from "@/lib/convert";

const EXAMPLE = "2026-10-21T15:59:59";

export function Converter() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState(getCityById(DEFAULT_CITY_ID));

  const results = useMemo(() => {
    const stamps = extractTimestamps(input);
    return stamps.flatMap((stamp) => {
      const date = parseAsGmt(stamp);
      if (!date) return [];
      return [
        {
          stamp,
          formatted: formatInTimeZone(date, city.timeZone),
          offset: offsetLabel(date, city.timeZone),
        },
      ];
    });
  }, [input, city]);

  return (
    <div className="w-full max-w-xl space-y-6">
      <div>
        <label htmlFor="gmt-input" className="mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
          GMT time
        </label>
        <textarea
          id="gmt-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Paste a GMT timestamp, e.g. ${EXAMPLE}`}
          rows={4}
          className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 font-mono text-sm outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950"
        />
        <p className="mt-1.5 text-xs text-zinc-500">
          Naive ISO times are treated as GMT+0. Offsets like <code>Z</code> or{" "}
          <code>+08:00</code> are respected. Multiple timestamps in one paste are
          converted.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          Converted time · {city.name}
        </p>
        {results.length === 0 ? (
          <p className="mt-2 text-lg text-zinc-400">
            Paste a time like {EXAMPLE}
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {results.map((result) => (
              <li key={result.stamp}>
                <p className="text-2xl font-semibold tracking-tight">
                  {result.formatted}
                </p>
                <p className="mt-1 font-mono text-xs text-zinc-500">
                  {result.stamp} GMT → {city.timeZone} ({result.offset})
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CityCombobox value={city} onChange={setCity} />
    </div>
  );
}
