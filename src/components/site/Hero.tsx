import { ArrowRight, PlayCircle, Phone, Mic, Calendar, MessageCircle, TrendingUp, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[140px] pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="container-luxury relative grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-7">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Hospitality AI · Built for global brands</span>
          </div>

          <h1 className="text-[2.6rem] sm:text-5xl lg:text-[4.1rem] leading-[1.02] font-semibold text-heading">
            <span className="text-gradient-brand">AI-Powered</span> Digital
            <br className="hidden sm:block" /> Experiences For Modern
            <br className="hidden sm:block" /> Hospitality Brands
          </h1>

          <p className="mt-7 text-base text-body max-w-xl leading-relaxed">
            Premium websites, AI receptionists, booking systems and automation
            designed to help hospitality businesses increase bookings and deliver
            world-class customer experiences.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:opacity-95 transition-all"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-foreground hover:bg-surface-strong transition-colors"
            >
              <PlayCircle className="w-4 h-4 text-accent" />
              View Projects
            </a>
          </div>

          <div className="mt-10 flex items-center gap-8 text-xs text-subtle">
            <div>
              <div className="text-heading text-xl font-semibold">120+</div>
              <div>Brands launched</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-heading text-xl font-semibold">24/7</div>
              <div>AI receptionist</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-heading text-xl font-semibold">9 langs</div>
              <div>Multi-language AI</div>
            </div>
          </div>
        </div>

        {/* Floating dashboard cluster */}
        <div className="relative h-[560px] hidden md:block">
          {/* Main analytics card */}
          <div className="absolute top-4 right-0 w-[360px] glass-strong gradient-border rounded-2xl p-5 shadow-elegant animate-float">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 grid place-items-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-subtle">Reservations</div>
                  <div className="text-sm font-medium text-body">This week</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                +38%
              </span>
            </div>
            <div className="text-3xl font-semibold text-heading mb-3">1,284</div>
            {/* Sparkline */}
            <svg viewBox="0 0 280 70" className="w-full h-16">
              <defs>
                <linearGradient id="ln" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,55 L30,42 L60,48 L95,28 L130,34 L165,18 L200,24 L235,10 L280,18 L280,70 L0,70 Z"
                fill="url(#ln)"
              />
              <path
                d="M0,55 L30,42 L60,48 L95,28 L130,34 L165,18 L200,24 L235,10 L280,18"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
              />
            </svg>
            <div className="grid grid-cols-7 gap-1 mt-2 text-[10px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-center">{d}</span>
              ))}
            </div>
          </div>

          {/* AI receptionist card */}
          <div className="absolute top-44 left-0 w-[300px] glass-strong gradient-border rounded-2xl p-4 shadow-elegant animate-float-slow">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-brand grid place-items-center shadow-glow-soft">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent ring-2 ring-background animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-medium text-body">AI Receptionist</div>
                <div className="text-[11px] text-subtle">Live call · 02:14</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-end gap-1 h-10">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-full bg-primary/70"
                    style={{
                      height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                      opacity: 0.45 + Math.abs(Math.cos(i * 0.9)) * 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="text-[11px] text-subtle leading-relaxed">
                <span className="text-accent">Guest:</span> I'd like to book a
                suite for two on Friday.
              </div>
              <div className="text-[11px] text-body leading-relaxed">
                <span className="text-primary">Hospiq AI:</span> Of course. We
                have a Garden Suite available — shall I confirm?
              </div>
            </div>
          </div>

          {/* WhatsApp automation */}
          <div className="absolute bottom-6 right-6 w-[260px] glass-strong gradient-border rounded-2xl p-4 shadow-elegant animate-float">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/20 grid place-items-center">
                  <MessageCircle className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-sm font-medium text-body">WhatsApp AI</div>
              </div>
              <span className="text-[10px] text-subtle">98% reply</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] rounded-xl rounded-tl-sm bg-surface px-3 py-2 text-body">
                Table for 4 tonight?
              </div>
              <div className="text-[11px] rounded-xl rounded-tr-sm bg-primary/20 px-3 py-2 ml-6 text-body">
                Booked for 8:30 PM ✨
              </div>
            </div>
          </div>

          {/* Mini booking pill */}
          <div className="absolute bottom-44 left-10 glass-strong gradient-border rounded-2xl px-4 py-3 shadow-elegant animate-float-slow flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/15 grid place-items-center">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="text-[11px] text-subtle">Tonight</div>
              <div className="text-sm font-medium text-body">42 reservations</div>
            </div>
          </div>

          {/* Voice pill */}
          <div className="absolute top-0 left-24 glass rounded-full px-3 py-1.5 flex items-center gap-2 animate-float">
            <Mic className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] text-muted-foreground">Voice agent active</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="container-luxury relative mt-20">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-subtle mb-6">
          Trusted by hospitality brands globally
        </p>
        <div className="relative overflow-hidden mask-fade">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-16 items-center">
                {[
                  "VELORA",
                  "AZURE STAY",
                  "NOIR BISTRO",
                  "THE IVORY",
                  "CELESTIA",
                  "MAISON ROUGE",
                  "LUMEN HOTELS",
                  "AURORA RESORTS",
                ].map((b) => (
                  <span
                    key={b + k}
                    className="text-xl font-semibold tracking-[0.25em] text-dim hover:text-subtle transition-colors"
                  >
                    {b}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`.mask-fade{mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);}`}</style>
    </section>
  );
}
