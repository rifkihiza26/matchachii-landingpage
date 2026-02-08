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
      className="group rounded-2xl bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {item.name}
          </h3>
          {item.isBestSeller && (
            <span className="shrink-0 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              Best Seller
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>
        <p className="font-semibold text-foreground">
          {formatRupiah(item.price)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
