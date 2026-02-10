// =============================================
// KONFIGURASI BRAND MATCHACHII
// =============================================

export const brand = {
  name: "Matchachii",
  tagline: "Setiap tegukan, ketenangan dalam satu gelas.",

  // WhatsApp (format: 62xxxx tanpa +)
  whatsappNumber: "6282310193700",
  whatsappMessage: "Halo Matchachii, saya ingin memesan minuman matcha.",

  // Instagram
  instagramUrl: "https://instagram.com/matcha.chii__",
  instagramHandle: "@matcha.chii__",

  // Sosial media lain
  tiktokUrl: "https://tiktok.com/@matchachii",

  // Alamat toko
  address: "Jl. Pinang IV. 8C, Kelurahan Pondok Labu, Kecamatan Cilandak, Jakarta Selatan 12450",

  // Google Maps embed
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.85369325103716!2d106.79926411854713!3d-6.3084401729175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1770745068387!5m2!1sen!2sid",

  // URL menu (opsional)
  menuUrl: "",
};

export const getWhatsAppUrl = (): string => {
  const message = encodeURIComponent(brand.whatsappMessage);
  return `https://wa.me/${brand.whatsappNumber}?text=${message}`;
};
