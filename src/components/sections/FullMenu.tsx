import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const FullMenu = () => {
  const { data: products = [], isLoading } = useProducts();

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

        {isLoading ? (
          <p className="text-center text-muted-foreground">Memuat menu...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FullMenu;
