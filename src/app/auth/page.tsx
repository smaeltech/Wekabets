"use client";

import { FormEvent, useState } from "react";
import { loginWithEmail, loginWithGoogle, registerWithEmail } from "@/lib/auth";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
        setFeedback("Account created successfully.");
      } else {
        await loginWithEmail(email, password);
        setFeedback("Logged in successfully.");
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-brandNavy">{isRegister ? "Create Account" : "Login"}</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Email" className="w-full rounded-md border border-slate-300 px-3 py-2" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required placeholder="Password" className="w-full rounded-md border border-slate-300 px-3 py-2" />
        <button className="w-full rounded-md bg-brandNavy px-4 py-2 font-medium text-white" type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button onClick={() => loginWithGoogle()} className="mt-3 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-medium" type="button">
        Continue with Google
      </button>
      <button onClick={() => setIsRegister((prev) => !prev)} className="mt-4 text-sm text-brandGreen" type="button">
        {isRegister ? "Already have an account? Login" : "Need an account? Register"}
      </button>
      {feedback ? <p className="mt-4 text-sm text-slate-600">{feedback}</p> : null}
    </section>
  );
}
