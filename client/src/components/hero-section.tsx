import { motion } from "framer-motion";
import { ChevronDown, Play, Utensils } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-brand-yellow text-4xl opacity-20"
      >
        🍕
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
        className="absolute top-40 right-20 text-brand-yellow text-3xl opacity-30"
      >
        🍗
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -4 }}
        className="absolute bottom-32 left-20 text-brand-yellow text-5xl opacity-25"
      >
        🍔
      </motion.div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-6"
        >
          <span className="text-brand-yellow">BULL</span>BSUTER
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto"
        >
          Experience the finest fast food in Lahore. Premium burgers, legendary taste, unforgettable moments.
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('menu')}
            className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-yellow-light transition-all duration-300 shadow-2xl flex items-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            Explore Menu
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
            className="border-2 border-brand-yellow text-brand-yellow px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-yellow hover:text-brand-black transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Watch Story
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown className="text-brand-yellow text-2xl" />
      </motion.div>
    </section>
  );
}
