"use client";

import { PaystackButton } from "react-paystack";
import { useCurrentUser } from "@/hooks/use-current-user";

const MONTHLY_AMOUNT = 10000;

export default function PricingPage() {
  const { authUid, profile } = useCurrentUser();

  const paystackConfig = {
    reference: `wekabets-${Date.now()}`,
    email: profile?.email ?? "user@example.com",
    amount: MONTHLY_AMOUNT,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? ""
  };

  async function handlePaymentSuccess(response: { reference: string }) {
    if (!authUid) {
      alert("Please login before upgrading.");
      return;
    }

    const verifyRes = await fetch("/api/paystack/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: authUid,
        reference: response.reference,
        amount: MONTHLY_AMOUNT
      })
    });

    if (!verifyRes.ok) {
      alert("Payment verification failed. Contact support with your reference.");
      return;
    }

    alert("Payment successful. Your premium access is now active.");
  }

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold text-brandNavy">Upgrade to Premium</h1>
      <p className="mb-6 text-slate-600">Unlock all today's high confidence picks and receive 30-day premium access.</p>
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm text-slate-500">Plan</p>
        <p className="text-3xl font-bold text-brandGreen">KSh 100 / month</p>
      </div>
      <div className="mt-6">
        <PaystackButton
          {...paystackConfig}
          text="Pay with Paystack"
          className="w-full rounded-md bg-brandNavy px-4 py-3 font-semibold text-white"
          onSuccess={handlePaymentSuccess}
          onClose={() => alert("Payment cancelled")}
        />
      </div>
    </section>
  );
}
