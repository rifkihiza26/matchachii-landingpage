// =============================================
// KONFIGURASI BRAND MATCHACHII
// Edit file ini untuk mengubah semua informasi brand
// =============================================

export const brand = {
  name: "Matchachii",
  tagline: "Setiap tegukan, ketenangan dalam satu gelas.",
  
  // Ganti nomor WhatsApp di sini (format: 62xxxx tanpa +)
  whatsappNumber: "6281234567890",
  whatsappMessage: "Halo Matchachii, saya ingin memesan minuman matcha.",
  
  // Ganti link Instagram di sini
  instagramUrl: "https://instagram.com/matchachii",
  instagramHandle: "@matchachii",
  
  // Link sosial media lainnya
  tiktokUrl: "https://tiktok.com/@matchachii",
  
  // Alamat toko
  address: "Jl. Matcha No. 88, Kelurahan Hijau, Kecamatan Segar, Jakarta Selatan 12345",
  
  // Google Maps embed URL - Ganti dengan URL embed Google Maps yang sesuai
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKw!5e0!3m2!1sid!2sid!4v1234567890",
  
  // URL menu untuk QR code
  menuUrl: "", // Akan di-set otomatis ke anchor #menu
};

export const getWhatsAppUrl = (): string => {
  const message = encodeURIComponent(brand.whatsappMessage);
  return `https://wa.me/${brand.whatsappNumber}?text=${message}`;
};
