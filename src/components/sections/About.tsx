import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="tentang" className="py-24 bg-secondary/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-3">
              Cerita Kami
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Tentang Matchachii
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Matchachii lahir dari kecintaan kami terhadap matcha berkualitas tinggi. 
                Setiap gelas yang kami sajikan dibuat dengan matcha premium yang dipilih 
                langsung, memastikan rasa autentik yang lembut dan menyegarkan.
              </p>
              <p>
                Kami percaya bahwa menikmati matcha bukan sekadar minum — 
                tapi sebuah momen ketenangan di tengah kesibukan. Dengan proses 
                handmade dan bahan-bahan segar, kami menghadirkan pengalaman matcha 
                terbaik untuk kamu.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
