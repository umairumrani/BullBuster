import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/BullBuster_1752063257019.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-navbar shadow-lg" : "glass-navbar"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <img 
              src={logoPath} 
              alt="BullBuster Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
            />
            <span className="text-lg sm:text-xl lg:text-2xl font-black text-brand-yellow">
              BullBuster
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {["home", "about", "menu", "gallery", "track", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white hover:text-brand-yellow transition-colors duration-300 font-medium capitalize text-sm lg:text-base"
                >
                  {item === "track" ? "Track Order" : item}
                </button>
              )
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("menu")}
              className="hidden sm:block bg-brand-yellow text-brand-black px-4 lg:px-6 py-2 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300 shadow-lg text-sm lg:text-base"
            >
              Order Now
            </motion.button>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-brand-yellow/30 bg-brand-black-soft/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {["home", "about", "menu", "gallery", "track", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left text-white hover:text-brand-yellow transition-colors duration-300 font-medium capitalize py-2 text-lg"
                  >
                    {item === "track" ? "Track Order" : item}
                  </button>
                )
              )}
              
              {/* Mobile Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("menu")}
                className="w-full bg-brand-yellow text-brand-black py-3 rounded-lg font-bold mt-4 hover:bg-brand-yellow-light transition-all duration-300"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
