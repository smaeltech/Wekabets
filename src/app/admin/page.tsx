"use client";

import { FormEvent, useMemo, useState } from "react";
import { push, ref, update } from "firebase/database";
import { db } from "@/lib/firebaseConfig";
import { mockMatches } from "@/data/sample-data";

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS ?? "").split(",").filter(Boolean);

export default function AdminPage() {
  const [adminUid, setAdminUid] = useState("");
  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    league: "",
    kickOffTime: "",
    prediction: "",
    odds: 1.5,
    isPremium: true
  });

  const isAdmin = useMemo(() => ADMIN_UIDS.includes(adminUid), [adminUid]);

  async function addMatch(event: FormEvent) {
    event.preventDefault();
    if (!isAdmin) return;

    const payload = {
      ...form,
      status: "pending",
      date: form.kickOffTime.slice(0, 10)
    };

    await push(ref(db, "matches"), payload);
  }

  async function updateStatus(matchId: string, status: "won" | "lost") {
    if (!isAdmin) return;
    await update(ref(db, `matches/${matchId}`), { status });
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-xl rounded-xl border border-slate-200 p-6">
        <h1 className="mb-2 text-2xl font-bold text-brandNavy">Admin Access</h1>
        <p className="mb-4 text-sm text-slate-600">Enter your UID to continue.</p>
        <input className="w-full rounded-md border border-slate-300 px-3 py-2" value={adminUid} onChange={(event) => setAdminUid(event.target.value)} placeholder="Firebase UID" />
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="mb-3 text-xl font-semibold text-brandNavy">Add Match</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={addMatch}>
          <input required placeholder="Home Team" className="rounded-md border px-3 py-2" onChange={(event) => setForm((prev) => ({ ...prev, homeTeam: event.target.value }))} />
          <input required placeholder="Away Team" className="rounded-md border px-3 py-2" onChange={(event) => setForm((prev) => ({ ...prev, awayTeam: event.target.value }))} />
          <input required placeholder="League" className="rounded-md border px-3 py-2" onChange={(event) => setForm((prev) => ({ ...prev, league: event.target.value }))} />
          <input required type="datetime-local" className="rounded-md border px-3 py-2" onChange={(event) => setForm((prev) => ({ ...prev, kickOffTime: new Date(event.target.value).toISOString() }))} />
          <input required placeholder="Prediction" className="rounded-md border px-3 py-2 md:col-span-2" onChange={(event) => setForm((prev) => ({ ...prev, prediction: event.target.value }))} />
          <input required type="number" step="0.01" placeholder="Odds" className="rounded-md border px-3 py-2" onChange={(event) => setForm((prev) => ({ ...prev, odds: Number(event.target.value) }))} />
          <label className="flex items-center gap-2 rounded-md border px-3 py-2"><input type="checkbox" defaultChecked onChange={(event) => setForm((prev) => ({ ...prev, isPremium: event.target.checked }))} />Premium Match</label>
          <button className="rounded-md bg-brandNavy px-4 py-2 text-white md:col-span-2">Save Match</button>
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="mb-3 text-xl font-semibold text-brandNavy">Match Management</h2>
        <ul className="space-y-3">
          {mockMatches.map((match) => (
            <li key={match.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-slate-100 p-3">
              <span className="text-sm font-medium">{match.homeTeam} vs {match.awayTeam}</span>
              <div className="space-x-2">
                <button className="rounded bg-green-600 px-3 py-1 text-xs text-white" onClick={() => updateStatus(match.id, "won")}>Won</button>
                <button className="rounded bg-red-600 px-3 py-1 text-xs text-white" onClick={() => updateStatus(match.id, "lost")}>Lost</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
