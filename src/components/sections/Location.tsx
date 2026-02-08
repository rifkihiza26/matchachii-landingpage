import { brand, getWhatsAppUrl } from "@/data/brand";
import { MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const Location = () => {
  return (
    <section id="lokasi" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
            Temukan Kami
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Lokasi & Kontak
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-sm aspect-video"
          >
            <iframe
              src={brand.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Matchachii"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl bg-card p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    Alamat
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {brand.address}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-primary p-8 flex items-center gap-4 hover:bg-primary/90 transition-colors group"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-foreground/20 text-primary-foreground flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-1">
                  Hubungi via WhatsApp
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  Klik untuk langsung chat dan pesan minuman favoritmu
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
