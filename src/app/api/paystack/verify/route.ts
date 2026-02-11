import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "firebase-admin/database";
import { getApps, initializeApp, cert } from "firebase-admin/app";

const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });

export async function POST(request: NextRequest) {
  const { userId, reference, amount } = await request.json();

  const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  });

  const payload = await verifyResponse.json();
  if (!payload.status || payload.data.status !== "success") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = getDatabase(adminApp);
  const now = Date.now();
  const expiry = now + 30 * 24 * 60 * 60 * 1000;

  await db.ref(`users/${userId}`).update({
    isPremium: true,
    subscriptionExpiry: expiry
  });

  await db.ref("transactions").push({
    userId,
    amount,
    reference,
    status: "success",
    timestamp: now
  });

  return NextResponse.json({ ok: true, expiry });
}
