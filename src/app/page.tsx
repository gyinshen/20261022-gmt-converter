import { Converter } from "@/components/Converter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <main className="w-full max-w-xl">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          GMT → local
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Time converter
        </h1>
        <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-400">
          Paste a GMT+0 timestamp and convert it to a city timezone. Default is
          Singapore (UTC+8).
        </p>
        <Converter />
      </main>
    </div>
  );
}
