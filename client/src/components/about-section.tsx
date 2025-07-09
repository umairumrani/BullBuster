import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-brand-yellow font-semibold text-lg uppercase tracking-wider">Our Story</span>
            <h2 className="text-5xl font-black text-brand-black mt-4 mb-6">
              Crafting Perfection Since Day One
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Born in the heart of Lahore, BullBsuter represents a revolution in fast food excellence. We combine traditional Pakistani hospitality with international culinary standards to create an unforgettable dining experience.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-brand-yellow mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-brand-yellow mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Service Available</div>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-black text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-black-soft transition-all duration-300"
            >
              Learn More About Us
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Luxury restaurant interior with warm ambiance" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover" 
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-8 -left-8 w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg"
            >
              <Award className="text-brand-black text-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
