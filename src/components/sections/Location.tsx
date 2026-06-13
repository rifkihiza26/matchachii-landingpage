import { useLocations, buildWhatsappUrl } from "@/hooks/useLocations";
import { MapPin, MessageCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

const LocationSection = () => {
  const { data: locations = [], isLoading } = useLocations();

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
          {locations.length > 1 && (
            <p className="text-muted-foreground mt-3">
              Kami hadir di {locations.length} lokasi — pilih cabang terdekat.
            </p>
          )}
        </motion.div>

        {isLoading && (
          <p className="text-center text-muted-foreground">Memuat lokasi...</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((loc, i) => {
            const waUrl = buildWhatsappUrl(loc.whatsapp_number, loc.whatsapp_message);
            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col"
              >
                <div className="aspect-video bg-muted">
                  {loc.google_maps_embed_url ? (
                    <iframe
                      src={loc.google_maps_embed_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Lokasi ${loc.name}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Peta belum diatur
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {loc.name}
                    </h3>
                    {loc.is_primary && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <Star size={12} /> Utama
                      </span>
                    )}
                  </div>

                  {loc.address && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="shrink-0 mt-0.5 text-primary" />
                      <p className="leading-relaxed">{loc.address}</p>
                    </div>
                  )}

                  {loc.whatsapp_number && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <MessageCircle size={16} />
                      Pesan via WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
