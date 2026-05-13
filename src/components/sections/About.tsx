import { useSiteSettings } from "@/hooks/useSiteSettings";
import { motion } from "framer-motion";

const About = () => {
  const { get } = useSiteSettings();
  return (
    <section id="tentang" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
              Cerita Kami
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              {get("about_title")}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>{get("about_paragraph_1")}</p>
              <p>{get("about_paragraph_2")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
