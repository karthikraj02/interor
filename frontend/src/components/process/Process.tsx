const steps = ["Discovery", "Design direction", "Detailed planning", "Execution", "Handover"];

export function Process() {
  return (
    <section id="process" className="section">
      <p className="section-label eyebrow-rule reveal">PROCESS</p>
      <h2 className="section-title reveal">Clear steps, informed decisions.</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step} className="glass-card reveal rounded-2xl p-5">
            <span className="text-sm text-[var(--accent)]">0{index + 1}</span>
            <p className="mt-3">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
