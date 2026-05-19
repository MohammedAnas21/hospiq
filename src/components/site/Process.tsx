const steps = [
  { n: "01", title: "Discovery", desc: "We learn your brand, guests and growth goals." },
  { n: "02", title: "Strategy", desc: "Positioning, IA and a roadmap to revenue." },
  { n: "03", title: "Design", desc: "Cinematic, on-brand interfaces engineered to convert." },
  { n: "04", title: "Development", desc: "Premium engineering, AI systems and integrations." },
  { n: "05", title: "Launch", desc: "We ship — fast, polished, production-grade." },
  { n: "06", title: "Growth Optimization", desc: "Continuous tuning across SEO, AI and conversion." },
];

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="container-luxury">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            From kickoff to <span className="text-gradient-brand">global launch.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {steps.map((s) => (
              <div key={s.n} className="relative glass gradient-border rounded-2xl p-5 hover-lift">
                <div className="w-9 h-9 rounded-full bg-gradient-brand text-white text-xs font-semibold grid place-items-center mb-4 shadow-glow-soft">
                  {s.n}
                </div>
                <h3 className="font-semibold mb-1 text-heading text-sm">{s.title}</h3>
                <p className="text-xs text-subtle leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
