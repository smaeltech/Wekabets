import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "firebase-admin/database";
import { cert, getApps, initializeApp } from "firebase-admin/app";

const adminApp =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });

export async function POST(request: NextRequest) {
  const { userId, reference, amount } = await request.json();

  if (!userId || !reference || !amount) {
    return NextResponse.json({ ok: false, message: "Missing required payload" }, { status: 400 });
  }

  const db = getDatabase(adminApp);
  const existingTransactions = await db
    .ref("transactions")
    .orderByChild("reference")
    .equalTo(reference)
    .once("value");

  if (existingTransactions.exists()) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  });

  const payload = await verifyResponse.json();
  const paidAmount = Number(payload?.data?.amount ?? 0);
  const expectedAmount = Number(amount);

  if (!payload.status || payload.data.status !== "success" || paidAmount !== expectedAmount) {
    return NextResponse.json({ ok: false, message: "Payment verification failed" }, { status: 400 });
  }

  const now = Date.now();
  const expiry = now + 30 * 24 * 60 * 60 * 1000;

  await db.ref(`users/${userId}`).update({
    isPremium: true,
    subscriptionExpiry: expiry
  });

  await db.ref("transactions").push({
    userId,
    amount: expectedAmount,
    reference,
    status: "success",
    timestamp: now
  });

  return NextResponse.json({ ok: true, expiry });
}
