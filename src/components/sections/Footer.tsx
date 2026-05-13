import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Instagram } from "lucide-react";

const Footer = () => {
  const { get } = useSiteSettings();
  return (
    <footer className="py-12 bg-foreground text-primary-foreground">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-1">{get("brand_name")}</h3>
            <p className="text-primary-foreground/60 text-sm">{get("brand_tagline")}</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={get("instagram_url")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={get("tiktok_url")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors text-sm font-bold"
              aria-label="TikTok"
            >
              T
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} {get("brand_name")}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
