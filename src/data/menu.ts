import matchaCreamyImg from "@/assets/matcha-creamy.jpg";
import matchaCreamyStrawberryImg from "@/assets/matcha-creamy-strawberry.jpg";
import chocoCreamyImg from "@/assets/choco-creamy.jpg";
import chocoCreamyStrawberryImg from "@/assets/choco-creamy-strawberry.jpg";

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
    image: matchaCreamyImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Creamy Matcha Strawberry",
    description: "Perpaduan matcha creamy dengan manis segar strawberry.",
    price: 23000,
    image: matchaCreamyStrawberryImg,
    category: "signature",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Creamy Choco Latte",
    description: "Cokelat creamy dengan susu segar, lembut dan nikmat.",
    price: 20000,
    image: chocoCreamyImg,
    category: "classic",
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Creamy Choco Strawberry",
    description: "Cokelat creamy dipadukan dengan strawberry yang segar.",
    price: 25000,
    image: chocoCreamyStrawberryImg,
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
 