import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { MenuItem } from "@shared/schema";

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: menuItems = [], isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const categories = ["All", ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = activeFilter === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeFilter);

  const formatPrice = (price: number) => `Rs. ${(price / 100).toFixed(0)}`;

  if (isLoading) {
    return (
      <section className="py-20 bg-brand-dark-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading delicious menu...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" ref={ref} className="py-20 bg-brand-dark-gray">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow font-semibold text-lg uppercase tracking-wider">Our Menu</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-6">Delicious Selections</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From signature burgers to crispy delights, every bite tells a story of quality and passion.
          </p>
        </motion.div>
        
        {/* Menu Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4 bg-black/50 backdrop-blur-sm rounded-full p-2 shadow-lg border border-brand-yellow/20">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-brand-yellow text-brand-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="bg-black/40 backdrop-blur-sm border border-brand-yellow/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" 
                />
                {!item.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Currently Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2">{item.name}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-brand-yellow">{formatPrice(item.price)}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!item.available}
                    className="bg-brand-yellow text-brand-black px-4 py-2 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300"
          >
            View Full Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
