import { Instagram, Linkedin, Twitter, Mail, Phone, MessageCircle, Headphones } from "lucide-react";
import logo from "@/assets/hospiq-logo.svg";

const cols = [
  { title: "Product", links: ["Features", "Solutions", "Pricing", "AI Receptionist"] },
  { title: "Company", links: ["Projects", "Process", "Testimonials", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms", "Cookies"] },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            <div className="flex items-center mb-5">
              <img src={logo} alt="Hospiq" className="h-9 w-auto" />
            </div>
            <p className="text-sm text-subtle max-w-sm leading-relaxed">
              AI-powered digital experiences for modern hospitality brands —
              premium websites, AI receptionists, and automation built for global scale.
            </p>
            <a
              href="mailto:hello.hospiq@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-body hover:text-heading transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" /> hello.hospiq@gmail.com
            </a>
            <div className="mt-3 space-y-1.5">
              <a href="tel:+918618957790" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91 8618957790
              </a>
              <a href="tel:+919741657214" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91 9741657214
              </a>
              <p className="flex items-center gap-2 text-xs text-dim mt-2">
                <MessageCircle className="w-3.5 h-3.5 text-primary" /> Replies via email or WhatsApp
              </p>
              <a href="mailto:hospiq.support@gmail.com" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-body transition-colors">
                <Headphones className="w-4 h-4 text-primary" /> hospiq.support@gmail.com
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.2em] text-subtle mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-subtle hover:text-body transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border">
          <div className="text-xs text-dim">
            © {new Date().getFullYear()} Hospiq. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[Instagram, Linkedin, Twitter].map((I, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 grid place-items-center rounded-lg glass hover:bg-surface-strong transition-colors text-subtle hover:text-body"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
