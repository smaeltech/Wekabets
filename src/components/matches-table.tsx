import { AppUser, Match } from "@/types";
import { MatchRow } from "@/components/match-row";

interface MatchesTableProps {
  matches: Match[];
  user: AppUser | null;
  title: string;
  lockPremium?: boolean;
}

export function MatchesTable({ matches, user, title, lockPremium = true }: MatchesTableProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-semibold text-brandNavy">{title}</h2>
      <div className="table-shell">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr className="text-sm text-slate-600">
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Match</th>
              <th className="px-4 py-3 font-medium">Pick</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <MatchRow key={match.id} match={match} user={user} showLocked={lockPremium} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
