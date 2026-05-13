import { Product, formatRupiah } from "@/hooks/useProducts";
import { motion } from "framer-motion";

interface ProductCardProps {
  item: Product;
  index?: number;
}

const ProductCard = ({ item, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group rounded-2xl bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
        item.is_coming_soon ? "opacity-60" : ""
      }`}
    >
      <div className="aspect-square overflow-hidden relative">
        {item.is_coming_soon || !item.image_url ? (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-serif text-xl font-semibold tracking-wide">
              {item.is_coming_soon ? "Coming Soon" : "No Image"}
            </span>
          </div>
        ) : (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {item.is_coming_soon ? "Coming Soon" : item.name}
          </h3>
          {item.is_best_seller && !item.is_coming_soon && (
            <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.is_coming_soon ? "Menu baru segera hadir. Nantikan ya!" : item.description}
        </p>
        {!item.is_coming_soon && (
          <p className="font-semibold text-foreground">{formatRupiah(item.price)}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
