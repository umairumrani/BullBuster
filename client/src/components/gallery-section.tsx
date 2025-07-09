import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Artistic burger presentation with professional plating"
  },
  {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Modern restaurant interior with sleek design"
  },
  {
    url: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Gourmet burger with dramatic lighting and composition"
  },
  {
    url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Artistic food plating with professional garnish"
  },
  {
    url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Luxury restaurant ambiance with elegant lighting"
  },
  {
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    alt: "Premium burger presentation with professional photography"
  }
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="gallery" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow font-semibold text-lg uppercase tracking-wider">Gallery</span>
          <h2 className="text-5xl font-black text-brand-black mt-4 mb-6">Visual Feast</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every dish is a masterpiece, every moment is memorable.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            >
              <img 
                src={image.url} 
                alt={image.alt}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Search className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
