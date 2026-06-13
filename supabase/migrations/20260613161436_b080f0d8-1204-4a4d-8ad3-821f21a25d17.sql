
CREATE TABLE public.locations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address text NOT NULL DEFAULT '',
  google_maps_embed_url text NOT NULL DEFAULT '',
  whatsapp_number text NOT NULL DEFAULT '',
  whatsapp_message text NOT NULL DEFAULT 'Halo Matchachii, saya ingin memesan minuman matcha.',
  is_primary boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.locations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.locations TO authenticated;
GRANT ALL ON public.locations TO service_role;

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active locations"
  ON public.locations FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert locations"
  ON public.locations FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update locations"
  ON public.locations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete locations"
  ON public.locations FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_locations_updated_at
  BEFORE UPDATE ON public.locations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Enforce only one primary location
CREATE UNIQUE INDEX locations_only_one_primary
  ON public.locations ((is_primary)) WHERE is_primary = true;

-- Seed initial location from existing site_settings
INSERT INTO public.locations (name, address, google_maps_embed_url, whatsapp_number, whatsapp_message, is_primary, is_active, sort_order)
SELECT
  'Cabang Utama',
  COALESCE((SELECT value FROM public.site_settings WHERE key = 'address'), ''),
  COALESCE((SELECT value FROM public.site_settings WHERE key = 'google_maps_embed_url'), ''),
  COALESCE((SELECT value FROM public.site_settings WHERE key = 'whatsapp_number'), ''),
  COALESCE((SELECT value FROM public.site_settings WHERE key = 'whatsapp_message'), 'Halo Matchachii, saya ingin memesan minuman matcha.'),
  true,
  true,
  0
WHERE NOT EXISTS (SELECT 1 FROM public.locations);
