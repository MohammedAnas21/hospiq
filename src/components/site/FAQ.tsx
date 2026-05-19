import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Do you work internationally?", a: "Yes. Hospiq partners with hospitality brands across India, the Middle East, Europe and North America." },
  { q: "Can I get only a website?", a: "Absolutely. You can start with just a website and add AI receptionist, automation or CRM later — on your timeline." },
  { q: "Is AI receptionist mandatory?", a: "No. AI receptionist is optional. Many of our clients launch with a website first and add AI systems once they're ready." },
  { q: "Can AI systems be added later?", a: "Yes. Every Hospiq build is architected so AI receptionist, chat and automation can be layered in anytime." },
  { q: "Do you provide hosting?", a: "Yes. We host every project on premium global infrastructure with monitoring and CDN included." },
  { q: "Can you integrate booking systems?", a: "We integrate with most major reservation systems, PMS platforms and custom booking flows." },
  { q: "Is the website mobile optimized?", a: "Every Hospiq site is mobile-first, performance-tuned, and engineered for the device guests actually use." },
  { q: "Do you provide SEO services?", a: "Yes. SEO is baked into every build, with optional ongoing optimization for premium brands." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="container-luxury max-w-3xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Questions, <span className="text-gradient-brand">answered.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass gradient-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-sm text-heading">{f.q}</span>
                  <Plus
                    className={`w-4 h-4 text-subtle transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-45 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-subtle leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
