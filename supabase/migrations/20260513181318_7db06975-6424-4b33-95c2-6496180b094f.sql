
-- Fix function search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict has_role execution
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO service_role;

-- Replace broad public storage SELECT with file-only access (no listing)
DROP POLICY IF EXISTS "Public read product images" ON storage.objects;
CREATE POLICY "Public read product image files" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images' AND (storage.foldername(name))[1] IS NOT NULL);

-- Seed products
INSERT INTO public.products (name, description, price, category, is_best_seller, is_coming_soon, sort_order) VALUES
('Creamy Matcha', 'Matcha premium dengan susu segar dan es, creamy dan menyegarkan.', 18000, 'signature', true, false, 1),
('Creamy Matcha Strawberry', 'Perpaduan matcha creamy dengan manis segar strawberry.', 23000, 'signature', true, false, 2),
('Creamy Choco Latte', 'Cokelat creamy dengan susu segar, lembut dan nikmat.', 20000, 'classic', true, false, 3),
('Creamy Choco Strawberry', 'Cokelat creamy dipadukan dengan strawberry yang segar.', 25000, 'special', false, true, 4);

-- Seed site settings
INSERT INTO public.site_settings (key, value) VALUES
('brand_name', 'Matchachii'),
('brand_tagline', 'Setiap tegukan, ketenangan dalam satu gelas.'),
('whatsapp_number', '6282310193700'),
('whatsapp_message', 'Halo Matchachii, saya ingin memesan minuman matcha.'),
('instagram_url', 'https://instagram.com/matcha.chii__'),
('instagram_handle', '@matcha.chii__'),
('tiktok_url', 'https://tiktok.com/@matcha.chii__'),
('address', 'Jl. Petogogan II No. 41, RT 008/RW 006, Pulo, Kecamatan Kebayoran Baru, Kota Administrasi Jakarta Selatan 12160'),
('google_maps_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.87931585482875!2d106.79488072661917!3d-6.254633039099008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f174affc6d57%3A0x45dbf67ff6e90f20!2sJl.%20Petogogan%20II%20No.41!5e0!3m2!1sen!2sid!4v1770816805296!5m2!1sen!2sid'),
('hero_eyebrow', 'Premium Matcha Experience'),
('about_title', 'Tentang Matchachii'),
('about_paragraph_1', 'Matchachii lahir dari kecintaan kami terhadap matcha berkualitas tinggi. Setiap gelas yang kami sajikan dibuat dengan matcha premium yang dipilih langsung, memastikan rasa autentik yang lembut dan menyegarkan.'),
('about_paragraph_2', 'Kami percaya bahwa menikmati matcha bukan sekadar minum — tapi sebuah momen ketenangan di tengah kesibukan. Dengan proses handmade dan bahan-bahan segar, kami menghadirkan pengalaman matcha terbaik untuk kamu.');
