import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, MessageCircle, Headphones } from "lucide-react";
import { supabase, type Lead } from "@/lib/supabase";

const businessTypes = [
  "Hotel",
  "Resort",
  "Restaurant",
  "Café",
  "Boutique Hotel",
  "Bar & Lounge",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<Omit<Lead, "id" | "created_at" | "status">>({
    name: "",
    email: "",
    business_name: "",
    business_type: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const { error } = await supabase.from("leads").insert([
      { ...form, status: "new" },
    ]);

    if (error) {
      setState("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      return;
    }

    setState("success");
    setForm({ name: "", email: "", business_name: "", business_type: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container-luxury">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

        <div className="relative grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Let's talk
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Start your project
              <span className="text-gradient-brand"> with Hospiq.</span>
            </h2>
            <p className="mt-5 text-body text-base leading-relaxed max-w-md">
              Tell us about your brand and what you're looking to build. We'll get back to you within 24 hours.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { title: "Free consultation", desc: "No commitment. We'll map out exactly what you need." },
                { title: "Custom quote", desc: "Transparent pricing tailored to your brand and goals." },
                { title: "Fast turnaround", desc: "Most projects launch within 2–4 weeks." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-heading">{item.title}</div>
                    <div className="text-sm text-subtle">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              <div className="glass gradient-border rounded-2xl p-5">
                <div className="text-xs text-subtle uppercase tracking-widest mb-1">Email</div>
                <a href="mailto:hello.hospiq@gmail.com" className="text-body hover:text-heading transition-colors text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" /> hello.hospiq@gmail.com
                </a>
              </div>
              <div className="glass gradient-border rounded-2xl p-5">
                <div className="text-xs text-subtle uppercase tracking-widest mb-1">Phone / WhatsApp</div>
                <div className="space-y-1">
                  <a href="tel:+918618957790" className="text-body hover:text-heading transition-colors text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" /> +91 8618957790
                  </a>
                  <a href="tel:+919741657214" className="text-body hover:text-heading transition-colors text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" /> +91 9741657214
                  </a>
                  <p className="text-xs text-dim mt-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> Replies via email or WhatsApp on both numbers
                  </p>
                </div>
              </div>
              <div className="glass gradient-border rounded-2xl p-5">
                <div className="text-xs text-subtle uppercase tracking-widest mb-1">Support</div>
                <a href="mailto:hospiq.support@gmail.com" className="text-body hover:text-heading transition-colors text-sm flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-primary shrink-0" /> hospiq.support@gmail.com
                </a>
                <p className="text-xs text-dim mt-1">Replies via email or WhatsApp within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-strong gradient-border rounded-3xl p-8 shadow-elegant">
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 grid place-items-center">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-heading">Message received</h3>
                <p className="text-subtle text-sm max-w-xs">
                  We'll review your details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-4 text-sm text-subtle hover:text-body transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Your name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Mohammed Anas"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@brand.com"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Business name</label>
                    <input
                      name="business_name"
                      value={form.business_name}
                      onChange={handleChange}
                      required
                      placeholder="Velora Café"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">Business type</label>
                    <select
                      name="business_type"
                      value={form.business_type}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
                    >
                      <option value="" disabled className="bg-background">Select type</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t} className="bg-background">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-subtle mb-1.5 uppercase tracking-wider">What are you looking to build?</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project — website, AI receptionist, booking system, or all of the above..."
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>

                {state === "error" && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-dim">
                  We respond within 24 hours · No spam, ever
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
