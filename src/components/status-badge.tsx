import { MatchStatus } from "@/types";

const colorMap: Record<MatchStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  won: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
  postponed: "bg-slate-200 text-slate-700"
};

export function StatusBadge({ status }: { status: MatchStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${colorMap[status]}`}>{status}</span>;
}
