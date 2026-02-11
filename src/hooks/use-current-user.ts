"use client";

import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { AppUser } from "@/types";

interface UseCurrentUserState {
  authUid: string | null;
  profile: AppUser | null;
  isLoading: boolean;
}

export function useCurrentUser(): UseCurrentUserState {
  const [authUid, setAuthUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (!firebaseUser) {
        setAuthUid(null);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setAuthUid(firebaseUser.uid);
      const userRef = ref(db, `users/${firebaseUser.uid}`);
      unsubscribeProfile = onValue(userRef, (snapshot) => {
        const value = snapshot.val();
        if (!value) {
          setProfile(null);
          setIsLoading(false);
          return;
        }

        setProfile({
          id: firebaseUser.uid,
          email: value.email ?? "",
          isPremium: Boolean(value.isPremium),
          subscriptionExpiry: Number(value.subscriptionExpiry || 0),
          createdAt: Number(value.createdAt || 0)
        });
        setIsLoading(false);
      });
    });

    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
      unsubscribeAuth();
    };
  }, []);

  return { authUid, profile, isLoading };
}
