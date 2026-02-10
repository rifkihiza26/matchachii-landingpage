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
  comingSoon?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Creamy Matcha",
    description: "Matcha premium dengan susu segar dan es, creamy dan menyegarkan.",
    price: 18000,
    image: matchaLatteImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Creamy Matcha Strawberry",
    description: "Matcha murni diseduh sempurna, rasa autentik Jepang.",
    price: 23000,
    image: matchaOriginalImg,
    category: "classic",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Creamy Choco Latte",
    description: "Matcha blended dengan es dan whipped cream, sempurna untuk hari panas.",
    price: 32000,
    image: matchaFrappeImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Coming Soon",
    description: "Menu baru segera hadir. Nantikan ya!",
    price: 0,
    image: matchaAffogatoImg,
    category: "special",
    comingSoon: true,
  },
  {
    id: "5",
    name: "Coming Soon",
    description: "Menu baru segera hadir. Nantikan ya!",
    price: 0,
    image: matchaSmoothieImg,
    category: "special",
    comingSoon: true,
  },
  {
    id: "6",
    name: "Coming Soon",
    description: "Menu baru segera hadir. Nantikan ya!",
    price: 0,
    image: matchaLatteImg,
    category: "classic",
    comingSoon: true,
  },
];

export const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
