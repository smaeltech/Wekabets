import Link from "next/link";
import { Lock } from "lucide-react";
import { AppUser, Match } from "@/types";
import { StatusBadge } from "@/components/status-badge";

interface MatchRowProps {
  match: Match;
  user: AppUser | null;
  showLocked?: boolean;
}

export function MatchRow({ match, user, showLocked = true }: MatchRowProps) {
  const shouldLockPrediction = showLocked && match.isPremium && !user?.isPremium;

  return (
    <tr className="border-t border-slate-100">
      <td className="px-4 py-3 text-sm text-slate-600">{new Date(match.kickOffTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
      <td className="px-4 py-3 text-sm">
        <div className="font-medium text-slate-900">{match.homeTeam} vs {match.awayTeam}</div>
        <div className="text-xs text-slate-500">{match.league}</div>
      </td>
      <td className="px-4 py-3 text-sm">
        {shouldLockPrediction ? (
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-md bg-brandNavy px-3 py-1.5 text-xs font-medium text-white">
            <Lock className="h-3.5 w-3.5" /> Subscribe to View
          </Link>
        ) : (
          <span className="font-medium text-slate-800">{match.prediction}</span>
        )}
      </td>
      <td className="px-4 py-3 text-sm">
        <StatusBadge status={match.status} />
      </td>
    </tr>
  );
}
