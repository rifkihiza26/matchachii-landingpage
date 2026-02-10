import creamyMatchaImg from "@/assets/creamy-matcha.jpg";
import creamyMatchaStrawberryImg from "@/assets/creamy-matcha-strawberry.jpg";
import creamyChocoImg from "@/assets/creamy-choco.jpg";
import creamyChocoStrawberryImg from "@/assets/creamy-choco-strawberry.jpg";

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
    image: creamyMatchaImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Creamy Matcha Strawberry",
    description: "Perpaduan matcha creamy dengan manis segar strawberry.",
    price: 23000,
    image: creamyMatchaStrawberryImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Creamy Choco Latte",
    description: "Cokelat creamy dengan susu segar, lembut dan nikmat.",
    price: 20000,
    image: creamyChocoImg,
    category: "classic",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Creamy Choco Strawberry",
    description: "Cokelat creamy dipadukan dengan strawberry yang segar.",
    price: 25000,
    image: creamyChocoStrawberryImg,
    category: "special",
    isBestSeller: true,
  },
];

export const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
 