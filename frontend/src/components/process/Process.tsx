import { whyChooseUs } from "@/data/site";

const steps = [
  { title: "Tell us what home means to you.", text: "We listen to your ideas, routines, priorities, and budget before drawing a line." },
  { title: "Shape the vision together.", text: "Explore layouts, materials, and details with a design team that keeps you in the loop." },
  { title: "Bring every detail to life.", text: "From thoughtful planning to the finishing touches, we guide your project through to handover." },
];

export function Process() {
  return (
    <section id="process" className="section">
      <p className="section-label eyebrow-rule reveal">HOW WE WORK</p>
      <h2 className="section-title reveal">A considered process, from the first conversation.</h2>
      <p className="section-copy reveal">Good design should feel collaborative and clear. We take care of the details while keeping your vision at the centre.</p>
      <ol className="process-list">
        {steps.map((step, index) => (
          <li key={step.title} className="process-step reveal">
            <span className="process-number">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="trust-row"><p className="section-label eyebrow-rule reveal">THE SAI PROMISE</p>
        <div className="trust-points">{whyChooseUs.slice(0, 3).map((item) => <article className="value-note reveal" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div>
    </section>
  );
}
