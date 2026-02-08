import { brand, getWhatsAppUrl } from "@/data/brand";
import heroImage from "@/assets/hero-matcha.jpg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Matchachii matcha latte"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-matcha-medium font-sans text-sm uppercase tracking-[0.3em] mb-4">
            Premium Matcha Experience
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {brand.name}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-light mb-10 leading-relaxed max-w-md">
            {brand.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
            >
              Pesan via WhatsApp
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Lihat Menu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
