import { useEffect, useState } from "react";
import logo from "@/assets/hospiq-logo.svg";

const links = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "AI Receptionist", href: "#ai-receptionist" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className={`glass-strong gradient-border rounded-2xl w-full max-w-6xl transition-all duration-500 ${
          scrolled ? "shadow-elegant" : ""
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5">
          <a href="#top" className="flex items-center group" aria-label="Hospiq">
            <img
              src={logo}
              alt="Hospiq"
              className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-80"
            />
          </a>

          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              Book Call
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-brand shadow-glow-soft hover:opacity-95 transition-opacity"
            >
              Start Project
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
