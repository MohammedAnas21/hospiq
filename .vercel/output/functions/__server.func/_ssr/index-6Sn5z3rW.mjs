import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { l as logo } from "./hospiq-logo-Df3vBjLG.mjs";
import { s as supabase } from "./supabase-D0WzKadW.mjs";
import { X as Sparkles, A as ArrowRight, n as CirclePlay, a2 as TrendingUp, P as Phone, J as MessageCircle, C as Calendar, K as Mic, e as Building2, a7 as UtensilsCrossed, p as Coffee, a1 as TreePalm, f as CalendarCheck, B as BookOpen, c as Bot, H as Headphones, T as Search, D as Database, g as ChartColumn, V as Share2, W as Smartphone, L as Languages, o as Clock, m as CircleCheck, a as ArrowUpRight, b as Award, a9 as Zap, E as Earth, N as MousePointerClick, v as LifeBuoy, O as Network, _ as Star, h as Check, Q as Plus, M as Mail, x as LoaderCircle, I as Instagram, w as Linkedin, a3 as Twitter } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const links = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "AI Receptionist", href: "#ai-receptionist" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      className: `glass-strong gradient-border rounded-2xl w-full max-w-6xl transition-all duration-500 ${scrolled ? "shadow-elegant" : ""}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#top", className: "flex items-center group", "aria-label": "Hospiq", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo,
            alt: "Hospiq",
            className: "h-9 w-auto transition-opacity duration-300 group-hover:opacity-75"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden lg:flex items-center gap-1 text-sm", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: l.href,
            className: "px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors",
            children: l.label
          }
        ) }, l.href)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contact",
              className: "hidden sm:inline-flex items-center px-4 py-2 text-sm rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors",
              children: "Book Call"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contact",
              className: "relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-brand shadow-glow-soft hover:opacity-95 transition-opacity",
              children: "Start Project"
            }
          )
        ] })
      ] })
    }
  ) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "top", className: "relative pt-36 pb-24 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-hero pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[140px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04] pointer-events-none",
        style: {
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury relative grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Hospitality AI · Built for global brands" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[2.6rem] sm:text-5xl lg:text-[4.1rem] leading-[1.02] font-semibold text-heading", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "AI-Powered" }),
          " Digital",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
          " Experiences For Modern",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
          " Hospitality Brands"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-7 text-base text-body max-w-xl leading-relaxed", children: "Premium websites, AI receptionists, booking systems and automation designed to help hospitality businesses increase bookings and deliver world-class customer experiences." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "#contact",
              className: "group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:opacity-95 transition-all",
              children: [
                "Book a Free Consultation",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-0.5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "#projects",
              className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl glass text-foreground hover:bg-surface-strong transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-accent" }),
                "View Projects"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-8 text-xs text-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-heading text-xl font-semibold", children: "120+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Brands launched" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-heading text-xl font-semibold", children: "24/7" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "AI receptionist" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-heading text-xl font-semibold", children: "9 langs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Multi-language AI" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[560px] hidden md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-0 w-[360px] glass-strong gradient-border rounded-2xl p-5 shadow-elegant animate-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle", children: "Reservations" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: "This week" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent", children: "+38%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold text-heading mb-3", children: "1,284" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 280 70", className: "w-full h-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ln", x1: "0", x2: "0", y1: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#8B5CF6", stopOpacity: "0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#8B5CF6", stopOpacity: "0" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0,55 L30,42 L60,48 L95,28 L130,34 L165,18 L200,24 L235,10 L280,18 L280,70 L0,70 Z",
                fill: "url(#ln)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0,55 L30,42 L60,48 L95,28 L130,34 L165,18 L200,24 L235,10 L280,18",
                fill: "none",
                stroke: "#8B5CF6",
                strokeWidth: "2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mt-2 text-[10px] text-muted-foreground", children: ["M", "T", "W", "T", "F", "S", "S"].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: d }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-44 left-0 w-[300px] glass-strong gradient-border rounded-2xl p-4 shadow-elegant animate-float-slow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-brand grid place-items-center shadow-glow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent ring-2 ring-background animate-pulse" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: "AI Receptionist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-subtle", children: "Live call · 02:14" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-10", children: Array.from({ length: 28 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "flex-1 rounded-full bg-primary/70",
                style: {
                  height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                  opacity: 0.45 + Math.abs(Math.cos(i * 0.9)) * 0.5
                }
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-subtle leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Guest:" }),
              " I'd like to book a suite for two on Friday."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-body leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Hospiq AI:" }),
              " Of course. We have a Garden Suite available — shall I confirm?"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 right-6 w-[260px] glass-strong gradient-border rounded-2xl p-4 shadow-elegant animate-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-secondary/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-secondary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: "WhatsApp AI" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-subtle", children: "98% reply" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] rounded-xl rounded-tl-sm bg-surface px-3 py-2 text-body", children: "Table for 4 tonight?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] rounded-xl rounded-tr-sm bg-primary/20 px-3 py-2 ml-6 text-body", children: "Booked for 8:30 PM ✨" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-44 left-10 glass-strong gradient-border rounded-2xl px-4 py-3 shadow-elegant animate-float-slow flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/15 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-subtle", children: "Tonight" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-body", children: "42 reservations" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-24 glass rounded-full px-3 py-1.5 flex items-center gap-2 animate-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3.5 h-3.5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Voice agent active" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury relative mt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs uppercase tracking-[0.3em] text-subtle mb-6", children: "Trusted by hospitality brands globally" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden mask-fade", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-16 animate-marquee whitespace-nowrap", children: [...Array(2)].map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-16 items-center", children: [
        "VELORA",
        "AZURE STAY",
        "NOIR BISTRO",
        "THE IVORY",
        "CELESTIA",
        "MAISON ROUGE",
        "LUMEN HOTELS",
        "AURORA RESORTS"
      ].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xl font-semibold tracking-[0.25em] text-dim hover:text-subtle transition-colors",
          children: b
        },
        b + k
      )) }, k)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.mask-fade{mask-image:linear-gradient(to right,transparent,black 10%,black 90%,transparent);}` })
  ] });
}
const services = [
  { icon: Building2, title: "Hotel Website Design", desc: "Luxury hotel websites built to convert lookers into bookings." },
  { icon: UtensilsCrossed, title: "Restaurant Website Design", desc: "Editorial menus, reservations and storytelling that sells." },
  { icon: Coffee, title: "Café Branding", desc: "Distinct identities for modern cafés and specialty roasters." },
  { icon: TreePalm, title: "Resort Websites", desc: "Immersive resort experiences with cinematic visuals." },
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
  { icon: ChartColumn, title: "Analytics Dashboards", desc: "Beautiful, real-time visibility into your business." },
  { icon: Share2, title: "Social Media Integration", desc: "Make every post a path back to your booking." },
  { icon: Smartphone, title: "Mobile Optimization", desc: "Flawless mobile experiences for on-the-go guests." },
  { icon: Languages, title: "Multi-language AI Support", desc: "Serve international guests in their native language." }
];
function Services() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " Solutions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "Everything modern hospitality needs,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: " beautifully unified." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-body text-base leading-relaxed", children: "A complete platform for premium hospitality brands — from website to AI receptionist, automation to analytics." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "group glass gradient-border rounded-2xl p-5 hover-lift relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-surface-strong grid place-items-center mb-4 ring-1 ring-border group-hover:ring-primary/40 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold mb-1.5 text-heading", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle leading-relaxed", children: s.desc })
          ] })
        ]
      },
      s.title
    )) })
  ] }) });
}
const points = [
  "Answer calls automatically with natural voice AI",
  "Handle reservations, modifications and cancellations",
  "Answer FAQs about amenities, hours, location",
  "Transfer calls to humans when needed",
  "Support multiple languages out of the box",
  "Reduce missed bookings and revenue lost overnight"
];
const transcript = [
  { who: "Guest", text: "Hi, do you have availability for two on Saturday at 8?" },
  { who: "AI", text: "We do. Would you prefer the garden terrace or the main hall?" },
  { who: "Guest", text: "Terrace, please." },
  { who: "AI", text: "Confirmed for Saturday at 8 PM. I've sent the details by WhatsApp." }
];
function AIReceptionist() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "ai-receptionist", className: "relative py-28 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury relative grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-accent" }),
          " 24/7 Voice AI"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
          "A ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "24/7 AI Receptionist" }),
          " that never sleeps, never misses a booking."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-body text-base leading-relaxed", children: "Hospiq's voice agents pick up every call, in any language, and turn inquiries into reservations — even at 3 AM." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3", children: points.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body text-sm", children: p })
        ] }, p)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 glass gradient-border rounded-2xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-5 h-5 text-accent mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-1 text-heading text-sm", children: "Optional — add when you're ready" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle leading-relaxed", children: "AI receptionist systems are optional and can be added anytime. Choose Website only, Website + Automation, or the Full AI Receptionist package." })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong gradient-border rounded-3xl p-6 shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-10 h-10 rounded-xl bg-gradient-brand grid place-items-center shadow-glow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-heading", children: "Voice Agent · Aria" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle", children: "Live · 02:48" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-1 rounded-full bg-accent/15 text-accent flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
              " Connected"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-surface p-4 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-16", children: Array.from({ length: 60 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "flex-1 rounded-full bg-gradient-to-t from-primary/40 to-secondary/80",
              style: { height: `${20 + Math.abs(Math.sin(i * 0.5) + Math.cos(i * 0.3)) * 60}%` }
            },
            i
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 mb-5", children: transcript.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${t.who === "AI" ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${t.who === "AI" ? "bg-primary/15 rounded-tl-sm" : "bg-surface rounded-tr-sm"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-subtle mb-0.5", children: t.who }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: t.text })
          ] }) }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
            { k: "Calls today", v: "184" },
            { k: "Booked", v: "67" },
            { k: "Avg. handle", v: "1:42" }
          ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-surface p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-subtle", children: m.k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold mt-0.5 text-heading", children: m.v })
          ] }, m.k)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-elegant flex items-center gap-3 animate-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-subtle", children: "Conversion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-heading", children: "+42% bookings" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const projects = [
  {
    name: "Velora Café",
    tag: "Café · Branding",
    desc: "Editorial identity and ordering experience for a third-wave roaster.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&auto=format&fit=crop",
    accent: "#8B5CF6"
  },
  {
    name: "Azure Stay Resort",
    tag: "Resort · Website + AI",
    desc: "Cinematic resort booking with AI concierge in 6 languages.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80&auto=format&fit=crop",
    accent: "#6366F1"
  },
  {
    name: "Noir Bistro",
    tag: "Restaurant · Reservations",
    desc: "Reservation flow rebuilt — covers up 38% in one quarter.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
    accent: "#A855F7"
  },
  {
    name: "The Ivory Hotel",
    tag: "Hotel · Full Platform",
    desc: "End-to-end platform with AI receptionist & CRM integration.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop",
    accent: "#A78BFA"
  },
  {
    name: "Celestia Suites",
    tag: "Boutique Hotel · Website",
    desc: "Luxury single-property site with immersive room storytelling.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80&auto=format&fit=crop",
    accent: "#C084FC"
  }
];
function Projects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "projects", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6 mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
          " Selected Work"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
          "Hospitality brands,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: " elevated." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-subtle max-w-md text-sm leading-relaxed", children: "A selection of luxury hospitality experiences shipped by Hospiq for cafés, restaurants, hotels and resorts worldwide." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-6 gap-5", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: `group glass gradient-border rounded-3xl overflow-hidden hover-lift relative ${i === 0 ? "lg:col-span-4 lg:row-span-2 min-h-[520px]" : "lg:col-span-2 min-h-[260px]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: p.image,
                alt: p.name,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium",
              style: { background: p.accent + "22", color: p.accent, border: `1px solid ${p.accent}44` },
              children: p.tag
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-heading", children: p.name }),
              i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-subtle max-w-md", children: p.desc })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full glass-strong grid place-items-center group-hover:bg-primary/30 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4" }) })
          ] }) })
        ]
      },
      p.name
    )) })
  ] }) });
}
const features = [
  { icon: Award, title: "Hospitality Industry Expertise", desc: "Built by people who understand hotels, restaurants and resorts." },
  { icon: Bot, title: "AI-Powered Automation", desc: "Receptionists, chat and workflows that just work." },
  { icon: Zap, title: "Faster Booking Experience", desc: "Sub-second flows engineered to convert." },
  { icon: Earth, title: "International Design Standards", desc: "Visuals tuned for global, multilingual audiences." },
  { icon: Smartphone, title: "Mobile-First Optimization", desc: "Every pixel optimized for the device guests actually use." },
  { icon: Search, title: "SEO Optimized", desc: "Built to be found by the guests already searching for you." },
  { icon: MousePointerClick, title: "Conversion-Focused UI", desc: "Designed around the booking, not the brochure." },
  { icon: LifeBuoy, title: "Ongoing Support", desc: "A real team behind every property we ship." },
  { icon: Network, title: "Global Scalability", desc: "From a single café to a multi-property group." }
];
function WhyHospiq() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " Why Hospiq"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "A partner built for",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: " hospitality at scale." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden ring-1 ring-border", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/60 p-7 group hover:bg-surface transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-surface-strong grid place-items-center mb-4 ring-1 ring-border group-hover:ring-primary/40 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold mb-1.5 text-heading", children: f.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle leading-relaxed", children: f.desc })
    ] }, f.title)) })
  ] }) });
}
const steps = [
  { n: "01", title: "Discovery", desc: "We learn your brand, guests and growth goals." },
  { n: "02", title: "Strategy", desc: "Positioning, IA and a roadmap to revenue." },
  { n: "03", title: "Design", desc: "Cinematic, on-brand interfaces engineered to convert." },
  { n: "04", title: "Development", desc: "Premium engineering, AI systems and integrations." },
  { n: "05", title: "Launch", desc: "We ship — fast, polished, production-grade." },
  { n: "06", title: "Growth Optimization", desc: "Continuous tuning across SEO, AI and conversion." }
];
function Process() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "process", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " Process"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "From kickoff to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "global launch." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-6 gap-5", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative glass gradient-border rounded-2xl p-5 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-gradient-brand text-white text-xs font-semibold grid place-items-center mb-4 shadow-glow-soft", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-1 text-heading text-sm", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-subtle leading-relaxed", children: s.desc })
      ] }, s.n)) })
    ] })
  ] }) });
}
const testimonials = [
  {
    quote: "Our reservations jumped 38% in the first quarter. The AI receptionist alone paid for the entire project.",
    name: "Aanya Mehra",
    role: "Owner · Velora Café",
    initials: "AM"
  },
  {
    quote: "Hospiq delivered a website that finally matches the experience our guests have on property. It's stunning.",
    name: "Lucas Bernard",
    role: "GM · Azure Stay Resort",
    initials: "LB"
  },
  {
    quote: "The voice agent handles bookings in three languages. Zero missed calls since launch.",
    name: "Sofia Romano",
    role: "Founder · Noir Bistro",
    initials: "SR"
  },
  {
    quote: "Working with Hospiq feels like having an in-house product team. World class from start to finish.",
    name: "Rohan Kapoor",
    role: "Director · The Ivory Hotel",
    initials: "RK"
  }
];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " Loved by operators"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "What hospitality leaders ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "say about us." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: testimonials.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "glass gradient-border rounded-2xl p-7 hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-4 text-accent", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-base leading-relaxed text-body", children: [
        '"',
        t.quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-brand grid place-items-center text-sm font-semibold text-white shrink-0", children: t.initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-heading", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle", children: t.role })
        ] })
      ] })
    ] }, t.name)) })
  ] }) });
}
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
      "7 days support"
    ],
    monthly: "₹1,999/month maintenance",
    optional: ["AI chatbot", "Booking automation", "SEO upgrades"],
    note: "No AI receptionist included.",
    label: "Special launch pricing for Indian businesses",
    highlight: false,
    cta: "Get Started"
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
      "Ongoing support"
    ],
    optional: ["AI receptionist available as add-on"],
    highlight: true,
    cta: "Book a Call"
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
      "Enterprise integrations"
    ],
    label: "Built for international hospitality brands",
    highlight: false,
    cta: "Talk to Sales"
  }
];
function Pricing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "pricing", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14 mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " Pricing"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "Premium for the world.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "Approachable in India." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-body text-sm leading-relaxed", children: "Pricing engineered for both Indian and international hospitality brands — modular, transparent, and built around what you actually need." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5 items-stretch", children: tiers.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative rounded-3xl p-7 flex flex-col ${t.highlight ? "glass-strong gradient-border shadow-elegant ring-1 ring-primary/40" : "glass gradient-border"}`,
        children: [
          t.highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-brand text-white text-[11px] font-medium flex items-center gap-1 shadow-glow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            " Most popular"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-subtle", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-semibold tracking-tight text-heading", children: t.price }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle pb-1.5", children: t.priceSuffix })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-body mt-3", children: t.desc }),
            t.monthly && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-subtle", children: [
              "+ ",
              t.monthly
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: t.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: f })
          ] }, f)) }),
          t.optional && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-surface p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-subtle mb-1.5", children: "Optional add-ons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: t.optional.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-body border border-primary/20", children: o }, o)) })
          ] }),
          t.note && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[11px] text-subtle italic", children: t.note }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#contact",
              className: `mt-7 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${t.highlight ? "bg-gradient-brand text-white shadow-glow hover:opacity-95" : "bg-surface-strong text-body hover:bg-surface border border-border"}`,
              children: t.cta
            }
          ),
          t.label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[11px] text-center text-subtle", children: t.label })
        ]
      },
      t.name
    )) })
  ] }) });
}
const faqs = [
  { q: "Do you work internationally?", a: "Yes. Hospiq partners with hospitality brands across India, the Middle East, Europe and North America." },
  { q: "Can I get only a website?", a: "Absolutely. You can start with just a website and add AI receptionist, automation or CRM later — on your timeline." },
  { q: "Is AI receptionist mandatory?", a: "No. AI receptionist is optional. Many of our clients launch with a website first and add AI systems once they're ready." },
  { q: "Can AI systems be added later?", a: "Yes. Every Hospiq build is architected so AI receptionist, chat and automation can be layered in anytime." },
  { q: "Do you provide hosting?", a: "Yes. We host every project on premium global infrastructure with monitoring and CDN included." },
  { q: "Can you integrate booking systems?", a: "We integrate with most major reservation systems, PMS platforms and custom booking flows." },
  { q: "Is the website mobile optimized?", a: "Every Hospiq site is mobile-first, performance-tuned, and engineered for the device guests actually use." },
  { q: "Do you provide SEO services?", a: "Yes. SEO is baked into every build, with optional ongoing optimization for premium brands." }
];
function FAQ() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
        " FAQ"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
        "Questions, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "answered." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((f, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setOpen(isOpen ? null : i),
            className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-heading", children: f.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Plus,
                {
                  className: `w-4 h-4 text-subtle transition-transform duration-300 shrink-0 ${isOpen ? "rotate-45 text-primary" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-5 text-sm text-subtle leading-relaxed", children: f.a }) })
          }
        )
      ] }, f.q);
    }) })
  ] }) });
}
const businessTypes = [
  "Hotel",
  "Resort",
  "Restaurant",
  "Café",
  "Boutique Hotel",
  "Bar & Lounge",
  "Other"
];
function ContactForm() {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    business_name: "",
    business_type: "",
    message: ""
  });
  const [state, setState] = reactExports.useState("idle");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const { error } = await supabase.from("leads").insert([
      { ...form, status: "new" }
    ]);
    if (error) {
      setState("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
      return;
    }
    setState("success");
    setForm({ name: "", email: "", business_name: "", business_type: "", message: "" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "relative py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/10 blur-[160px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid lg:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-subtle mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
          " Let's talk"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-semibold tracking-tight", children: [
          "Start your project",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: " with Hospiq." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-body text-base leading-relaxed max-w-md", children: "Tell us about your brand and what you're looking to build. We'll get back to you within 24 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-5", children: [
          { title: "Free consultation", desc: "No commitment. We'll map out exactly what you need." },
          { title: "Custom quote", desc: "Transparent pricing tailored to your brand and goals." },
          { title: "Fast turnaround", desc: "Most projects launch within 2–4 weeks." }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-heading", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-subtle", children: item.desc })
          ] })
        ] }, item.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-widest mb-1", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hello.hospiq@gmail.com", className: "text-body hover:text-heading transition-colors text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary shrink-0" }),
              " hello.hospiq@gmail.com"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-widest mb-1", children: "Phone / WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+918618957790", className: "text-body hover:text-heading transition-colors text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary shrink-0" }),
                " +91 8618957790"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+919741657214", className: "text-body hover:text-heading transition-colors text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary shrink-0" }),
                " +91 9741657214"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-dim mt-1 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                " Replies via email or WhatsApp on both numbers"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass gradient-border rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-subtle uppercase tracking-widest mb-1", children: "Support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hospiq.support@gmail.com", className: "text-body hover:text-heading transition-colors text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "w-4 h-4 text-primary shrink-0" }),
              " hospiq.support@gmail.com"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-dim mt-1", children: "Replies via email or WhatsApp within 24 hours" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-strong gradient-border rounded-3xl p-8 shadow-elegant", children: state === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/20 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-heading", children: "Message received" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-subtle text-sm max-w-xs", children: "We'll review your details and get back to you within 24 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setState("idle"),
            className: "mt-4 text-sm text-subtle hover:text-body transition-colors underline underline-offset-4",
            children: "Send another message"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Your name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                name: "name",
                value: form.name,
                onChange: handleChange,
                required: true,
                placeholder: "Mohammed Anas",
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                name: "email",
                type: "email",
                value: form.email,
                onChange: handleChange,
                required: true,
                placeholder: "you@brand.com",
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Business name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                name: "business_name",
                value: form.business_name,
                onChange: handleChange,
                required: true,
                placeholder: "Velora Café",
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "Business type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                name: "business_type",
                value: form.business_type,
                onChange: handleChange,
                required: true,
                className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, className: "bg-background", children: "Select type" }),
                  businessTypes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, className: "bg-background", children: t }, t))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-subtle mb-1.5 uppercase tracking-wider", children: "What are you looking to build?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              name: "message",
              value: form.message,
              onChange: handleChange,
              required: true,
              rows: 4,
              placeholder: "Tell us about your project — website, AI receptionist, booking system, or all of the above...",
              className: "w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-body placeholder:text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
            }
          )
        ] }),
        state === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: errorMsg }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: state === "loading",
            className: "group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60",
            children: state === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Sending..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Send Message",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-0.5" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-dim", children: "We respond within 24 hours · No spam, ever" })
      ] }) })
    ] })
  ] }) });
}
const cols = [
  { title: "Product", links: ["Features", "Solutions", "Pricing", "AI Receptionist"] },
  { title: "Company", links: ["Projects", "Process", "Testimonials", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] }
];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative pt-20 pb-10 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-luxury", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Hospiq", className: "h-9 w-auto" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-subtle max-w-sm leading-relaxed", children: "AI-powered digital experiences for modern hospitality brands — premium websites, AI receptionists, and automation built for global scale." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "mailto:hello.hospiq@gmail.com",
            className: "mt-5 inline-flex items-center gap-2 text-sm text-body hover:text-heading transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary" }),
              " hello.hospiq@gmail.com"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+918618957790", className: "inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
            " +91 8618957790"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+919741657214", className: "inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
            " +91 9741657214"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs text-dim mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5 text-primary" }),
            " Replies via email or WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:hospiq.support@gmail.com", className: "inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Headphones, { className: "w-4 h-4 text-primary" }),
            " hospiq.support@gmail.com"
          ] })
        ] })
      ] }),
      cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-subtle mb-4", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: c.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-sm text-subtle hover:text-body transition-colors", children: l }) }, l)) })
      ] }, c.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-dim", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Hospiq. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [Instagram, Linkedin, Twitter].map((I, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#",
          className: "w-9 h-9 grid place-items-center rounded-lg glass hover:bg-surface-strong transition-colors text-subtle hover:text-body",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "w-4 h-4" })
        },
        i
      )) })
    ] })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen bg-background text-foreground overflow-x-clip", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Services, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AIReceptionist, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyHospiq, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Process, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pricing, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
