"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CITIES, filterCities, type City } from "@/lib/cities";

type Props = {
  value: City;
  onChange: (city: City) => void;
};

export function CityCombobox({ value, onChange }: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const options = useMemo(() => filterCities(query), [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  function select(city: City) {
    onChange(city);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
      setOpen(true);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        options.length === 0 ? 0 : (index + 1) % options.length,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        options.length === 0
          ? 0
          : (index - 1 + options.length) % options.length,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const city = options[activeIndex];
      if (city) select(city);
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="relative">
      <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Convert to city
      </label>
      <input
        ref={inputRef}
        id="city"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Type a city…"
        value={open || query ? query : `${value.name} · ${value.country}`}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setOpen(false);
            setQuery("");
          }, 120);
        }}
        onKeyDown={onKeyDown}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-4 dark:border-zinc-700 dark:bg-zinc-950"
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-950"
        >
          {options.length === 0 ? (
            <li className="px-3.5 py-2 text-sm text-zinc-500">No cities match</li>
          ) : (
            options.map((city, index) => (
              <li key={city.id} role="option" aria-selected={city.id === value.id}>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => select(city)}
                  className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-sm ${
                    index === activeIndex
                      ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  <span>
                    {city.name}
                    <span className="ml-2 text-zinc-500">{city.country}</span>
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    {city.timeZone}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
      <p className="mt-1.5 text-xs text-zinc-500">
        Type to filter {CITIES.length} cities. Arrow keys + Enter to select.
      </p>
    </div>
  );
}
