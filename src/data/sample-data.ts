import { Match } from "@/types";

export const mockMatches: Match[] = [
  {
    id: "matchId_abc",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    league: "Premier League",
    kickOffTime: "2026-02-12T20:00:00Z",
    prediction: "Home Win & Over 2.5",
    odds: 2.1,
    status: "pending",
    isPremium: true,
    date: "2026-02-12"
  },
  {
    id: "matchId_def",
    homeTeam: "Napoli",
    awayTeam: "Roma",
    league: "Serie A",
    kickOffTime: "2026-02-12T17:00:00Z",
    prediction: "BTTS - Yes",
    odds: 1.75,
    status: "won",
    isPremium: false,
    date: "2026-02-10"
  }
];
