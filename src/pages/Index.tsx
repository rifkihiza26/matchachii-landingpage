import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";

import About from "@/components/sections/About";
import FullMenu from "@/components/sections/FullMenu";
import WhyChoose from "@/components/sections/WhyChoose";
import InstagramSection from "@/components/sections/InstagramSection";
import Location from "@/components/sections/Location";
import QRMenu from "@/components/sections/QRMenu";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      <About />
      <FullMenu />
      <WhyChoose />
      <InstagramSection />
      <Location />
      <QRMenu />
      <Footer />
    </div>
  );
};

export default Index;
