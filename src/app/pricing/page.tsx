"use client";

import { PaystackButton } from "react-paystack";

export default function PricingPage() {
  const paystackConfig = {
    reference: `wekabets-${Date.now()}`,
    email: "user@example.com",
    amount: 10000,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? ""
  };

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
          onSuccess={() => alert("Payment successful. Your account will be upgraded shortly.")}
          onClose={() => alert("Payment cancelled")}
        />
      </div>
    </section>
  );
}
