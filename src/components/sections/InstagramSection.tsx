import { brand } from "@/data/brand";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

const InstagramSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg mx-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Instagram size={32} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ikuti Kami di Instagram
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Lihat review asli dari pelanggan kami dan temukan inspirasi matcha favoritmu di Instagram {brand.instagramHandle}.
          </p>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            <Instagram size={18} />
            Lihat Review di Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramSection;
