"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await adminLogin(email, password);
      router.replace(searchParams.get("next") ?? "/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setStatus("idle");
    }
  }

  return (
    <main className="loading-screen">
      <form onSubmit={submit} className="glass-card w-full max-w-sm rounded-3xl p-8" noValidate>
        <p className="section-label">ADMIN</p>
        <h1 className="mt-2 text-2xl">Sign in</h1>
        <label className="field-label mt-6">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="contact-input"
          />
        </label>
        <label className="field-label mt-4">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="contact-input"
          />
        </label>
        {error && (
          <p className="field-error mt-3" role="alert">
            {error}
          </p>
        )}
        <button disabled={status === "loading"} className="btn-primary mt-6 w-full disabled:opacity-60">
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="loading-screen" />}>
      <LoginForm />
    </Suspense>
  );
}
