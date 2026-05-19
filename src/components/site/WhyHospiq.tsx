import { Award, Bot, Zap, Globe2, Smartphone, Search, MousePointerClick, LifeBuoy, Network } from "lucide-react";

const features = [
  { icon: Award, title: "Hospitality Industry Expertise", desc: "Built by people who understand hotels, restaurants and resorts." },
  { icon: Bot, title: "AI-Powered Automation", desc: "Receptionists, chat and workflows that just work." },
  { icon: Zap, title: "Faster Booking Experience", desc: "Sub-second flows engineered to convert." },
  { icon: Globe2, title: "International Design Standards", desc: "Visuals tuned for global, multilingual audiences." },
  { icon: Smartphone, title: "Mobile-First Optimization", desc: "Every pixel optimized for the device guests actually use." },
  { icon: Search, title: "SEO Optimized", desc: "Built to be found by the guests already searching for you." },
  { icon: MousePointerClick, title: "Conversion-Focused UI", desc: "Designed around the booking, not the brochure." },
  { icon: LifeBuoy, title: "Ongoing Support", desc: "A real team behind every property we ship." },
  { icon: Network, title: "Global Scalability", desc: "From a single café to a multi-property group." },
];

export function WhyHospiq() {
  return (
    <section id="features" className="relative py-28">
      <div className="container-luxury">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Why Hospiq
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            A partner built for
            <span className="text-gradient-brand"> hospitality at scale.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden ring-1 ring-border">
          {features.map((f) => (
            <div key={f.title} className="bg-background/60 p-7 group hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-xl bg-surface-strong grid place-items-center mb-4 ring-1 ring-border group-hover:ring-primary/40 transition-all">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1.5 text-heading">{f.title}</h3>
              <p className="text-sm text-subtle leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
