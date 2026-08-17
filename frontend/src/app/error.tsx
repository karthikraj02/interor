"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="loading-screen text-center"><h1 className="text-3xl">Something went wrong</h1><button className="btn-primary mt-6" onClick={reset}>Try again</button></main>; }
