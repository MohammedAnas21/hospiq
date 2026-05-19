import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Velora Café",
    tag: "Café · Branding",
    desc: "Editorial identity and ordering experience for a third-wave roaster.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80&auto=format&fit=crop",
    accent: "#8B5CF6",
  },
  {
    name: "Azure Stay Resort",
    tag: "Resort · Website + AI",
    desc: "Cinematic resort booking with AI concierge in 6 languages.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80&auto=format&fit=crop",
    accent: "#6366F1",
  },
  {
    name: "Noir Bistro",
    tag: "Restaurant · Reservations",
    desc: "Reservation flow rebuilt — covers up 38% in one quarter.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
    accent: "#A855F7",
  },
  {
    name: "The Ivory Hotel",
    tag: "Hotel · Full Platform",
    desc: "End-to-end platform with AI receptionist & CRM integration.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80&auto=format&fit=crop",
    accent: "#A78BFA",
  },
  {
    name: "Celestia Suites",
    tag: "Boutique Hotel · Website",
    desc: "Luxury single-property site with immersive room storytelling.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80&auto=format&fit=crop",
    accent: "#C084FC",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="container-luxury">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Selected Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Hospitality brands,
              <span className="text-gradient-brand"> elevated.</span>
            </h2>
          </div>
          <p className="text-subtle max-w-md text-sm leading-relaxed">
            A selection of luxury hospitality experiences shipped by Hospiq for
            cafés, restaurants, hotels and resorts worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`group glass gradient-border rounded-3xl overflow-hidden hover-lift relative ${
                i === 0 ? "lg:col-span-4 lg:row-span-2 min-h-[520px]" : "lg:col-span-2 min-h-[260px]"
              }`}
            >
              {/* Project image */}
              <div className="absolute inset-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>

              {/* Tag pill */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-medium"
                  style={{ background: p.accent + "22", color: p.accent, border: `1px solid ${p.accent}44` }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-heading">{p.name}</h3>
                    {i === 0 && (
                      <p className="mt-1 text-sm text-subtle max-w-md">{p.desc}</p>
                    )}
                  </div>
                  <div className="w-9 h-9 rounded-full glass-strong grid place-items-center group-hover:bg-primary/30 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
