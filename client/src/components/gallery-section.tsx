import { motion } from "framer-motion";
import { Instagram, Camera, Heart } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Signature Bull Burger",
    category: "food",
    likes: 234
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Restaurant Interior",
    category: "ambiance",
    likes: 189
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Gourmet Presentation",
    category: "food",
    likes: 312
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Chef's Special",
    category: "food",
    likes: 267
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Dining Experience",
    category: "ambiance",
    likes: 156
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    alt: "Premium Burger",
    category: "food",
    likes: 298
  }
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [filter, setFilter] = useState("all");
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  return (
    <section id="gallery" ref={ref} className="py-20 bg-gradient-to-b from-brand-black to-brand-black-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 text-brand-yellow font-bold text-lg uppercase tracking-wider bg-brand-yellow/10 px-6 py-2 rounded-full border border-brand-yellow/20 mb-6"
          >
            <Camera className="w-5 h-5" />
            <span>Gallery</span>
          </motion.div>
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
          >
            <span className="gradient-text">Visual</span> Feast
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Every dish is a masterpiece, every moment is memorable. Follow our culinary journey.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-3 bg-brand-black-soft/80 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-brand-yellow/20">
            {[
              { id: "all", label: "All", icon: Camera },
              { id: "food", label: "Food", icon: Heart },
              { id: "ambiance", label: "Ambiance", icon: Instagram }
            ].map((filterOption, index) => {
              const Icon = filterOption.icon;
              return (
                <motion.button
                  key={filterOption.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterOption.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 ${
                    filter === filterOption.id
                      ? "bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black shadow-lg"
                      : "hover:bg-brand-yellow/10 text-white hover:text-brand-yellow"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{filterOption.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-brand-black-soft shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg mb-2">{image.alt}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-4 h-4 text-brand-yellow" />
                    <span className="text-white text-sm">@bullbuster</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(image.id)}
                    className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedImages.includes(image.id) 
                          ? "text-red-500 fill-red-500" 
                          : "text-white"
                      }`} 
                    />
                    <span className="text-white text-sm">
                      {likedImages.includes(image.id) ? image.likes + 1 : image.likes}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 193, 7, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300"
          >
            <Instagram className="w-6 h-6" />
            <span>Follow @BullBuster</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
