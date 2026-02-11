export type MatchStatus = "pending" | "won" | "lost" | "postponed";

export interface AppUser {
  id: string;
  email: string;
  isPremium: boolean;
  subscriptionExpiry: number;
  createdAt: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickOffTime: string;
  prediction: string;
  odds: number;
  status: MatchStatus;
  isPremium: boolean;
  date: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  reference: string;
  status: "success" | "failed";
  timestamp: number;
}
