import { motion } from "framer-motion";
import { Sandwich, Facebook, Instagram, Twitter, Send } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-brand-black-soft text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Sandwich className="text-3xl text-brand-yellow" />
              <span className="text-2xl font-black text-white">BullBsuter</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium fast food experience in the heart of Lahore, serving quality meals with passion and excellence.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black hover:bg-brand-yellow-light transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black hover:bg-brand-yellow-light transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black hover:bg-brand-yellow-light transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-brand-yellow transition-colors duration-300 capitalize"
                  >
                    {item === 'home' ? 'Home' : 
                     item === 'about' ? 'About Us' : 
                     item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">Dine In</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">Takeaway</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">Home Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">Catering</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors duration-300">Party Orders</a></li>
            </ul>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/20 border border-white/30 rounded-l-full px-4 py-3 text-white placeholder-gray-300 focus:border-brand-yellow focus:outline-none transition-colors duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-yellow text-brand-black px-6 py-3 rounded-r-full hover:bg-brand-yellow-light transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; 2024 BullBsuter. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
