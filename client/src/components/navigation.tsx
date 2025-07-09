import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/BullBuster_1752063257019.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-navbar' : 'glass-navbar'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <img 
              src={logoPath} 
              alt="BullBuster Logo" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-black text-white">BullBuster</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'menu', 'gallery', 'track', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium capitalize"
              >
                {item === 'track' ? 'Track Order' : item}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('menu')}
              className="bg-brand-yellow text-brand-black px-6 py-2 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300 shadow-lg"
            >
              Order Now
            </motion.button>
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-brand-yellow/30"
          >
            <div className="flex flex-col space-y-3 pt-4">
              {['home', 'about', 'menu', 'gallery', 'track', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium capitalize text-left"
                >
                  {item === 'track' ? 'Track Order' : item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
