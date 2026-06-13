import { useState, ReactNode } from "react";
import { useLocations, buildWhatsappUrl } from "@/hooks/useLocations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, MessageCircle } from "lucide-react";

type Props = {
  children: ReactNode;
  /** Optional class for the trigger wrapper */
  className?: string;
};

/**
 * Wraps any element to act as a "Pesan via WhatsApp" trigger.
 * - 0 lokasi: fallback ke wa.me kosong (disabled visual).
 * - 1 lokasi: langsung buka WhatsApp lokasi itu.
 * - >1 lokasi: tampilkan dialog pilihan cabang.
 */
const WhatsappOrderButton = ({ children, className }: Props) => {
  const { data: locations = [] } = useLocations();
  const [open, setOpen] = useState(false);

  if (locations.length <= 1) {
    const loc = locations[0];
    const url = loc ? buildWhatsappUrl(loc.whatsapp_number, loc.whatsapp_message) : "#";
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Pilih Cabang</DialogTitle>
          <DialogDescription>
            Pesananmu akan diteruskan ke WhatsApp cabang yang kamu pilih.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-2">
          {locations.map((loc) => {
            const url = buildWhatsappUrl(loc.whatsapp_number, loc.whatsapp_message);
            return (
              <a
                key={loc.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircle size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground truncate">{loc.name}</p>
                    {loc.is_primary && (
                      <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                        Utama
                      </span>
                    )}
                  </div>
                  {loc.address && (
                    <p className="text-xs text-muted-foreground flex items-start gap-1 mt-0.5">
                      <MapPin size={12} className="mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{loc.address}</span>
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {loc.whatsapp_number}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappOrderButton;
