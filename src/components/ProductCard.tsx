import { MenuItem, formatRupiah } from "@/data/menu";
import { motion } from "framer-motion";

interface ProductCardProps {
  item: MenuItem;
  index?: number;
}

const ProductCard = ({ item, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group rounded-2xl bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${item.comingSoon ? "opacity-60" : ""}`}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${item.comingSoon ? "blur-sm grayscale" : ""}`}
        />
        {item.comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="text-white font-serif text-xl font-semibold tracking-wide">Coming Soon</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {item.comingSoon ? "Coming Soon" : item.name}
          </h3>
          {item.isBestSeller && !item.comingSoon && (
            <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.comingSoon ? "Menu baru segera hadir. Nantikan ya!" : item.description}
        </p>
        {!item.comingSoon && (
          <p className="font-semibold text-foreground">
            {formatRupiah(item.price)}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
