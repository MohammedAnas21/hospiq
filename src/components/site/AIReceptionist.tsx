import { Phone, CheckCircle2, Languages, Clock, ArrowUpRight } from "lucide-react";

const points = [
  "Answer calls automatically with natural voice AI",
  "Handle reservations, modifications and cancellations",
  "Answer FAQs about amenities, hours, location",
  "Transfer calls to humans when needed",
  "Support multiple languages out of the box",
  "Reduce missed bookings and revenue lost overnight",
];

const transcript = [
  { who: "Guest", text: "Hi, do you have availability for two on Saturday at 8?" },
  { who: "AI", text: "We do. Would you prefer the garden terrace or the main hall?" },
  { who: "Guest", text: "Terrace, please." },
  { who: "AI", text: "Confirmed for Saturday at 8 PM. I've sent the details by WhatsApp." },
];

export function AIReceptionist() {
  return (
    <section id="ai-receptionist" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

      <div className="container-luxury relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
            <Clock className="w-3 h-3 text-accent" /> 24/7 Voice AI
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            A <span className="text-gradient-brand">24/7 AI Receptionist</span> that
            never sleeps, never misses a booking.
          </h2>
          <p className="mt-5 text-body text-base leading-relaxed">
            Hospiq's voice agents pick up every call, in any language, and turn
            inquiries into reservations — even at 3 AM.
          </p>

          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-body text-sm">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 glass gradient-border rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <div className="font-medium mb-1 text-heading text-sm">Optional — add when you're ready</div>
                <p className="text-sm text-subtle leading-relaxed">
                  AI receptionist systems are optional and can be added anytime.
                  Choose Website only, Website + Automation, or the Full AI Receptionist package.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard mock */}
        <div className="relative">
          <div className="glass-strong gradient-border rounded-3xl p-6 shadow-elegant">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-brand grid place-items-center shadow-glow-soft">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-heading">Voice Agent · Aria</div>
                  <div className="text-xs text-subtle">Live · 02:48</div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/15 text-accent flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Connected
              </span>
            </div>

            {/* Waveform */}
            <div className="rounded-2xl bg-surface p-4 mb-5">
              <div className="flex items-end gap-1 h-16">
                {Array.from({ length: 60 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-primary/40 to-secondary/80"
                    style={{ height: `${20 + Math.abs(Math.sin(i * 0.5) + Math.cos(i * 0.3)) * 60}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div className="space-y-2.5 mb-5">
              {transcript.map((t, i) => (
                <div key={i} className={`flex ${t.who === "AI" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${
                    t.who === "AI"
                      ? "bg-primary/15 rounded-tl-sm"
                      : "bg-surface rounded-tr-sm"
                  }`}>
                    <div className="text-[10px] uppercase tracking-wider text-subtle mb-0.5">{t.who}</div>
                    <span className="text-body">{t.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "Calls today", v: "184" },
                { k: "Booked", v: "67" },
                { k: "Avg. handle", v: "1:42" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl bg-surface p-3">
                  <div className="text-[10px] uppercase tracking-wider text-subtle">{m.k}</div>
                  <div className="text-lg font-semibold mt-0.5 text-heading">{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-elegant flex items-center gap-3 animate-float">
            <div className="w-8 h-8 rounded-lg bg-accent/20 grid place-items-center">
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-[10px] text-subtle">Conversion</div>
              <div className="text-sm font-semibold text-heading">+42% bookings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
