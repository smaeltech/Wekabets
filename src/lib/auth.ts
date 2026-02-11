"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { auth, db, googleProvider } from "@/lib/firebaseConfig";

function defaultUserProfile(email: string | null) {
  return {
    email,
    isPremium: false,
    subscriptionExpiry: 0,
    createdAt: Date.now()
  };
}

async function ensureUserProfile(user: User) {
  const userRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(userRef);

  if (!snapshot.exists()) {
    await set(userRef, defaultUserProfile(user.email));
  }
}

export async function registerWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await set(ref(db, `users/${cred.user.uid}`), defaultUserProfile(email));
  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  await ensureUserProfile(cred.user);
  return cred.user;
}
