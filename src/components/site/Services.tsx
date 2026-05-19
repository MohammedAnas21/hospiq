import {
  Building2, UtensilsCrossed, Coffee, Palmtree, CalendarCheck, BookOpen,
  MessageCircle, Bot, Phone, Mic, Headphones, Search,
  Sparkles, Database, BarChart3, Share2, Smartphone, Languages,
} from "lucide-react";

const services = [
  { icon: Building2, title: "Hotel Website Design", desc: "Luxury hotel websites built to convert lookers into bookings." },
  { icon: UtensilsCrossed, title: "Restaurant Website Design", desc: "Editorial menus, reservations and storytelling that sells." },
  { icon: Coffee, title: "Café Branding", desc: "Distinct identities for modern cafés and specialty roasters." },
  { icon: Palmtree, title: "Resort Websites", desc: "Immersive resort experiences with cinematic visuals." },
  { icon: CalendarCheck, title: "Booking Systems", desc: "Frictionless booking flows integrated with your stack." },
  { icon: BookOpen, title: "Online Reservation Systems", desc: "Real-time reservations with smart table & room management." },
  { icon: MessageCircle, title: "WhatsApp Integration", desc: "Automate confirmations, reminders and guest support." },
  { icon: Bot, title: "AI Chatbots", desc: "On-brand assistants that answer instantly, any time." },
  { icon: Phone, title: "AI Receptionist", desc: "24/7 voice agents handling calls, bookings and FAQs." },
  { icon: Mic, title: "AI Voice Calling Agents", desc: "Outbound campaigns with human-grade voice intelligence." },
  { icon: Headphones, title: "AI Customer Support", desc: "Tier-1 support automated across channels." },
  { icon: Search, title: "SEO Optimization", desc: "Rank for the queries your guests actually search." },
  { icon: Sparkles, title: "Hospitality Branding", desc: "Identity systems that feel premium at every touchpoint." },
  { icon: Database, title: "CRM Integrations", desc: "Sync guests, stays and preferences across systems." },
  { icon: BarChart3, title: "Analytics Dashboards", desc: "Beautiful, real-time visibility into your business." },
  { icon: Share2, title: "Social Media Integration", desc: "Make every post a path back to your booking." },
  { icon: Smartphone, title: "Mobile Optimization", desc: "Flawless mobile experiences for on-the-go guests." },
  { icon: Languages, title: "Multi-language AI Support", desc: "Serve international guests in their native language." },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container-luxury">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Solutions
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Everything modern hospitality needs,
            <span className="text-gradient-brand"> beautifully unified.</span>
          </h2>
          <p className="mt-5 text-body text-base leading-relaxed">
            A complete platform for premium hospitality brands — from website to
            AI receptionist, automation to analytics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group glass gradient-border rounded-2xl p-5 hover-lift relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-surface-strong grid place-items-center mb-4 ring-1 ring-border group-hover:ring-primary/40 transition-all">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-1.5 text-heading">{s.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
