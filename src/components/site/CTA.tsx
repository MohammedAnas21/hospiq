import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container-luxury">
        <div className="relative glass-strong gradient-border rounded-[2rem] px-8 sm:px-16 py-20 overflow-hidden text-center shadow-elegant">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/25 blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[140px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Ready when you are
            </div>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight max-w-3xl mx-auto leading-[1.05]">
              Transform Your Hospitality Brand <span className="text-gradient-brand">With AI.</span>
            </h2>
            <p className="mt-6 text-base text-body max-w-2xl mx-auto leading-relaxed">
              Create unforgettable digital experiences that increase bookings,
              automate customer communication, and elevate your hospitality business globally.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:hello@hospiq.com"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:opacity-95 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="mailto:hello@hospiq.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-body hover:bg-surface-strong transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
