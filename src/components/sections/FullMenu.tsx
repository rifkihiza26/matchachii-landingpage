import { useState } from "react";
import { menuItems } from "@/data/menu";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const categories = [
  { key: "all", label: "Semua" },
  { key: "signature", label: "Signature" },
  { key: "classic", label: "Classic" },
  { key: "special", label: "Special" },
] as const;

const FullMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
            Pilihan Lengkap
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Menu Matchachii
          </h2>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullMenu;
