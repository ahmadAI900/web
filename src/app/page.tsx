import { About } from "@/components/sections/About";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { GitHubShowcase } from "@/components/sections/GitHubShowcase";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Hero } from "@/components/hero/Hero";
import { TechMarquee } from "@/components/hero/TechMarquee";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { contact, services, siteConfig } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "Ahmad Ashraf",
      jobTitle: "AI Engineer & Full-Stack Developer",
      description: siteConfig.description,
      url: siteConfig.url,
      email: contact.email.display,
      sameAs: [contact.github.href],
      knowsAbout: [
        "Artificial intelligence",
        "Large language models",
        "Python",
        "Full-stack development",
        "Automation",
        "Retrieval-augmented generation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      alternateName: "ALASHRAF TECHUB",
      url: siteConfig.url,
      description: siteConfig.description,
      founder: { "@id": `${siteConfig.url}/#person` },
      telephone: contact.phone.display,
      email: contact.email.display,
      areaServed: "Worldwide",
      priceRange: "Project-based",
      sameAs: [contact.github.href],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[8px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <TechMarquee />
        <Stats />
        <About />
        <Certificates />
        <Projects />
        <GitHubShowcase />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <AssistantWidget />
    </>
  );
}
