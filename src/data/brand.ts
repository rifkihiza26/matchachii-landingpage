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
  tiktokUrl: "https://tiktok.com/@matcha.chii__",

  // Alamat toko
  address: "Jl. Petogogan II No. 41, RT 008/RW 006, Pulo, Kecamatan Kebayoran Baru, Kota Administrasi Jakarta Selatan 12160",

  // Google Maps embed
  googleMapsEmbedUrl:
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.87931585482875!2d106.79488072661917!3d-6.254633039099008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f174affc6d57%3A0x45dbf67ff6e90f20!2sJl.%20Petogogan%20II%20No.41%2C%20RT.8%2FRW.6%2C%20Pulo%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012160!5e0!3m2!1sen!2sid!4v1770816805296!5m2!1sen!2sid",

  // URL menu (opsional)
  menuUrl: "",
};

export const getWhatsAppUrl = (): string => {
  const message = encodeURIComponent(brand.whatsappMessage);
  return `https://wa.me/${brand.whatsappNumber}?text=${message}`;
};
