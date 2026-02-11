import { HeroStats } from "@/components/hero-stats";
import { MatchesTable } from "@/components/matches-table";
import { mockMatches } from "@/data/sample-data";

export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10);
  const todaysPicks = mockMatches.filter((match) => match.date >= today || match.status === "pending");

  return (
    <>
      <HeroStats />
      <MatchesTable matches={todaysPicks} user={null} title="Today's Premium Picks" lockPremium />
    </>
  );
}
