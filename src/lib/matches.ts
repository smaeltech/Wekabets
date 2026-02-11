import { onValue, query, ref } from "firebase/database";
import { db } from "@/lib/firebaseConfig";
import { Match } from "@/types";

export function subscribeToMatches(callback: (matches: Match[]) => void) {
  const matchesQuery = query(ref(db, "matches"));

  return onValue(matchesQuery, (snapshot) => {
    const value = snapshot.val() || {};
    const rows: Match[] = Object.entries(value).map(([id, raw]) => ({
      id,
      ...(raw as Omit<Match, "id">)
    }));

    rows.sort((a, b) => a.kickOffTime.localeCompare(b.kickOffTime));
    callback(rows);
  });
}
