import { Leaf, Droplets, Hand, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Leaf,
    title: "Matcha Premium Berkualitas",
    description: "Dipilih dari sumber terbaik untuk rasa autentik yang sempurna.",
  },
  {
    icon: Droplets,
    title: "Bahan Segar Setiap Hari",
    description: "Susu segar dan bahan alami tanpa pengawet buatan.",
  },
  {
    icon: Hand,
    title: "Dibuat Secara Handmade",
    description: "Setiap gelas diracik dengan penuh perhatian dan cinta.",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    description: "Kualitas premium dengan harga yang ramah di kantong.",
  },
];

const WhyChoose = () => {
  return (
    <section id="kenapa-kami" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
            Keunggulan Kami
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Kenapa Matchachii?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
