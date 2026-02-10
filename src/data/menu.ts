import matchaLatteImg from "@/assets/matcha-latte.jpg";
import matchaOriginalImg from "@/assets/matcha-original.jpg";
import matchaFrappeImg from "@/assets/matcha-frappe.jpg";
import matchaAffogatoImg from "@/assets/matcha-affogato.jpg";
import matchaSmoothieImg from "@/assets/matcha-smoothie.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "signature" | "classic" | "special";
  isBestSeller?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Creamy Matcha",
    description: "Matcha premium dengan susu segar dan es, creamy dan menyegarkan.",
    price: 28000,
    image: matchaLatteImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Hot Matcha Original",
    description: "Matcha murni diseduh sempurna, rasa autentik Jepang.",
    price: 25000,
    image: matchaOriginalImg,
    category: "classic",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Matcha Frappe",
    description: "Matcha blended dengan es dan whipped cream, sempurna untuk hari panas.",
    price: 32000,
    image: matchaFrappeImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Matcha Affogato",
    description: "Perpaduan matcha hangat dengan vanilla ice cream yang lembut.",
    price: 35000,
    image: matchaAffogatoImg,
    category: "special",
  },
  {
    id: "5",
    name: "Matcha Smoothie Bowl",
    description: "Bowl matcha sehat dengan granola dan buah segar pilihan.",
    price: 38000,
    image: matchaSmoothieImg,
    category: "special",
  },
  {
    id: "6",
    name: "Matcha Oat Latte",
    description: "Matcha latte dengan oat milk, cocok untuk kamu yang plant-based.",
    price: 30000,
    image: matchaLatteImg,
    category: "classic",
  },
  {
    id: "7",
    name: "Matcha Espresso Fusion",
    description: "Kombinasi unik matcha dan espresso, rasa bold dan segar.",
    price: 33000,
    image: matchaOriginalImg,
    category: "special",
  },
  {
    id: "8",
    name: "Matcha Mango Cooler",
    description: "Matcha segar dengan jus mangga alami, manis dan tropical.",
    price: 30000,
    image: matchaFrappeImg,
    category: "signature",
  },
];

export const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
