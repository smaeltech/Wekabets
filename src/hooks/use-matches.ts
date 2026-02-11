"use client";

import { useEffect, useMemo, useState } from "react";
import { subscribeToMatches } from "@/lib/matches";
import { Match } from "@/types";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToMatches((rows) => {
      setMatches(rows);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const groupedByDate = useMemo(
    () =>
      matches.reduce<Record<string, Match[]>>((acc, match) => {
        acc[match.date] = [...(acc[match.date] || []), match];
        return acc;
      }, {}),
    [matches]
  );

  return { matches, groupedByDate, isLoading };
}
