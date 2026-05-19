import { Check, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "₹9,999",
    priceSuffix: "one-time",
    desc: "Perfect for cafés & small businesses.",
    features: [
      "Premium responsive website",
      "1–3 pages",
      "Mobile optimization",
      "WhatsApp integration",
      "Contact forms",
      "Google Maps integration",
      "Social media links",
      "Basic SEO setup",
      "7 days support",
    ],
    monthly: "₹1,999/month maintenance",
    optional: ["AI chatbot", "Booking automation", "SEO upgrades"],
    note: "No AI receptionist included.",
    label: "Special launch pricing for Indian businesses",
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "$999",
    priceSuffix: "starting at",
    desc: "Perfect for restaurants & boutique hotels.",
    features: [
      "Multi-page premium website",
      "Reservation systems",
      "Advanced animations",
      "SEO optimization",
      "Analytics dashboard",
      "WhatsApp automation",
      "Branding improvements",
      "Ongoing support",
    ],
    optional: ["AI receptionist available as add-on"],
    highlight: true,
    cta: "Book a Call",
  },
  {
    name: "Premium AI",
    price: "Custom",
    priceSuffix: "tailored quote",
    desc: "Perfect for luxury hospitality brands.",
    features: [
      "Fully custom luxury website",
      "AI receptionist",
      "AI booking assistant",
      "AI voice automation",
      "CRM integrations",
      "Multi-language AI support",
      "Advanced automation systems",
      "Analytics dashboard",
      "Priority support",
      "Enterprise integrations",
    ],
    label: "Built for international hospitality brands",
    highlight: false,
    cta: "Talk to Sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="container-luxury">
        <div className="max-w-2xl mb-14 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Premium for the world.
            <br />
            <span className="text-gradient-brand">Approachable in India.</span>
          </h2>
          <p className="mt-5 text-body text-sm leading-relaxed">
            Pricing engineered for both Indian and international hospitality brands —
            modular, transparent, and built around what you actually need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-7 flex flex-col ${
                t.highlight
                  ? "glass-strong gradient-border shadow-elegant ring-1 ring-primary/40"
                  : "glass gradient-border"
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-medium flex items-center gap-1 shadow-glow-soft">
                  <Sparkles className="w-3 h-3" /> Most popular
                </div>
              )}

              <div>
                <div className="text-sm text-subtle">{t.name}</div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-4xl font-semibold tracking-tight text-heading">{t.price}</div>
                  <div className="text-xs text-subtle pb-1.5">{t.priceSuffix}</div>
                </div>
                <p className="text-sm text-body mt-3">{t.desc}</p>
                {t.monthly && (
                  <div className="mt-2 text-xs text-subtle">+ {t.monthly}</div>
                )}
              </div>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>

              {t.optional && (
                <div className="mt-5 rounded-xl bg-surface p-3">
                  <div className="text-[10px] uppercase tracking-wider text-subtle mb-1.5">
                    Optional add-ons
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.optional.map((o) => (
                      <span key={o} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-body border border-primary/20">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {t.note && (
                <div className="mt-3 text-[11px] text-subtle italic">{t.note}</div>
              )}

              <a
                href="#contact"
                className={`mt-7 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  t.highlight
                    ? "bg-gradient-brand text-white shadow-glow hover:opacity-95"
                    : "bg-surface-strong text-body hover:bg-surface border border-border"
                }`}
              >
                {t.cta}
              </a>

              {t.label && (
                <div className="mt-3 text-[11px] text-center text-subtle">{t.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
