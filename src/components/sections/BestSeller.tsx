import { menuItems } from "@/data/menu";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const BestSeller = () => {
  const bestSellers = menuItems.filter((item) => item.isBestSeller);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
            Paling Disukai
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Best Seller Kami
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
