import { MatchesTable } from "@/components/matches-table";
import { mockMatches } from "@/data/sample-data";

function groupByDate() {
  return mockMatches.reduce<Record<string, typeof mockMatches>>((acc, match) => {
    acc[match.date] = [...(acc[match.date] || []), match];
    return acc;
  }, {});
}

export default function HistoryPage() {
  const grouped = groupByDate();

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-brandNavy">Winning History</h1>
      {Object.entries(grouped)
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
