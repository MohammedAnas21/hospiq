import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { AIReceptionist } from "@/components/site/AIReceptionist";
import { Projects } from "@/components/site/Projects";
import { WhyHospiq } from "@/components/site/WhyHospiq";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hospiq — AI-Powered Digital Experiences for Modern Hospitality" },
      {
        name: "description",
        content:
          "Premium websites, AI receptionists, booking systems and automation built for hotels, restaurants, cafés and resorts. Hospiq helps hospitality brands scale globally.",
      },
      { property: "og:title", content: "Hospiq — AI-Powered Hospitality Technology" },
      { property: "og:description", content: "Luxury websites, 24/7 AI receptionist, booking automation and analytics for modern hospitality brands." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <Hero />
      <Services />
      <AIReceptionist />
      <Projects />
      <WhyHospiq />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
