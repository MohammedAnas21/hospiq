import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Our reservations jumped 38% in the first quarter. The AI receptionist alone paid for the entire project.",
    name: "Aanya Mehra",
    role: "Owner · Velora Café",
    initials: "AM",
  },
  {
    quote: "Hospiq delivered a website that finally matches the experience our guests have on property. It's stunning.",
    name: "Lucas Bernard",
    role: "GM · Azure Stay Resort",
    initials: "LB",
  },
  {
    quote: "The voice agent handles bookings in three languages. Zero missed calls since launch.",
    name: "Sofia Romano",
    role: "Founder · Noir Bistro",
    initials: "SR",
  },
  {
    quote: "Working with Hospiq feels like having an in-house product team. World class from start to finish.",
    name: "Rohan Kapoor",
    role: "Director · The Ivory Hotel",
    initials: "RK",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="container-luxury">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Loved by operators
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            What hospitality leaders <span className="text-gradient-brand">say about us.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass gradient-border rounded-2xl p-7 hover-lift">
              <div className="flex items-center gap-1 mb-4 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-body">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-semibold text-white shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-heading">{t.name}</div>
                  <div className="text-xs text-subtle">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
