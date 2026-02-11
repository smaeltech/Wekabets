"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db, googleProvider } from "@/lib/firebaseConfig";

export async function registerWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const now = Date.now();

  await set(ref(db, `users/${cred.user.uid}`), {
    email,
    isPremium: false,
    subscriptionExpiry: 0,
    createdAt: now
  });

  return cred.user;
}

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  const userRef = ref(db, `users/${cred.user.uid}`);

  await set(userRef, {
    email: cred.user.email,
    isPremium: false,
    subscriptionExpiry: 0,
    createdAt: Date.now()
  });

  return cred.user;
}
