import { QRCodeSVG } from "qrcode.react";
import { brand } from "@/data/brand";
import { motion } from "framer-motion";

const QRMenu = () => {
  // Use current page URL with #menu anchor
  const menuUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}#menu`
      : "#menu";

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
            QR Menu
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scan & Lihat Menu
          </h2>
          <p className="text-muted-foreground mb-10">
            Scan QR code di bawah ini untuk melihat menu lengkap {brand.name}. Cocok untuk ditempel di meja atau dicetak.
          </p>

          <div className="inline-flex items-center justify-center p-8 rounded-3xl bg-card shadow-sm border border-border">
            <QRCodeSVG
              value={menuUrl}
              size={200}
              bgColor="transparent"
              fgColor="hsl(150, 30%, 15%)"
              level="M"
              includeMargin={false}
            />
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Scan QR untuk melihat menu {brand.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default QRMenu;
