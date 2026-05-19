import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";
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
              <img src={logo} alt="Hospiq" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-subtle max-w-sm leading-relaxed">
              AI-powered digital experiences for modern hospitality brands —
              premium websites, AI receptionists, and automation built for global scale.
            </p>
            <a
              href="mailto:hello@hospiq.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-body hover:text-heading transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" /> hello@hospiq.com
            </a>
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
