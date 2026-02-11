"use client";

import { MatchesTable } from "@/components/matches-table";
import { useMatches } from "@/hooks/use-matches";

export default function HistoryPage() {
  const { groupedByDate, isLoading } = useMatches();

  if (isLoading) {
    return <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading history...</p>;
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-brandNavy">Winning History</h1>
      {Object.entries(groupedByDate)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([date, matches]) => (
          <div key={date}>
            <p className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">{date}</p>
            <MatchesTable matches={matches} user={null} title="" lockPremium={false} />
          </div>
        ))}
    </section>
  );
}
