"use client";

import { HeroStats } from "@/components/hero-stats";
import { MatchesTable } from "@/components/matches-table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMatches } from "@/hooks/use-matches";

export default function HomePage() {
  const { profile, isLoading: isUserLoading } = useCurrentUser();
  const { matches, isLoading: isMatchesLoading } = useMatches();

  const today = new Date().toISOString().slice(0, 10);
  const todaysPicks = matches.filter((match) => match.date >= today || match.status === "pending");
  const isLoading = isUserLoading || isMatchesLoading;

  return (
    <>
      <HeroStats />
      {isLoading ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Loading picks...</p>
      ) : (
        <MatchesTable matches={todaysPicks} user={profile} title="Today's Premium Picks" lockPremium />
      )}
    </>
  );
}
