import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Static menu data
const staticMenuItems = [
  {
    id: 1,
    name: "Bull Signature Burger",
    description:
      "Double beef patty, special sauce, fresh vegetables, premium bun",
    price: 89900,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
  {
    id: 2,
    name: "Crispy Chicken Deluxe",
    description: "Tender chicken breast, crispy coating, mayo, lettuce",
    price: 79900,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
  {
    id: 3,
    name: "Loaded Bull Fries",
    description: "Crispy fries, melted cheese, jalapenos, special sauce",
    price: 49900,
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
  {
    id: 4,
    name: "Chocolate Thunder Shake",
    description: "Rich chocolate, vanilla ice cream, whipped cream, cherry",
    price: 39900,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
  {
    id: 5,
    name: "Spicy Wings Combo",
    description: "8 pieces of spicy buffalo wings with ranch dip",
    price: 69900,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
  {
    id: 6,
    name: "Classic Fish & Chips",
    description: "Beer-battered fish with golden fries and tartar sauce",
    price: 99900,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    available: true,
  },
];

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("All");

  const menuItems = staticMenuItems;

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const filteredItems =
    activeFilter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeFilter);

  const formatPrice = (price: number) => `Rs. ${(price / 100).toFixed(0)}`;

  return (
    <section
      id='menu'
      ref={ref}
      className='py-20 bg-gradient-to-br from-brand-black via-brand-black-soft to-brand-black'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='text-center mb-16'
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-block text-brand-yellow font-bold text-lg uppercase tracking-wider bg-brand-yellow/10 px-6 py-2 rounded-full border border-brand-yellow/20'
          >
            Our Menu
          </motion.span>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 sm:mt-6 mb-4 sm:mb-6'
          >
            <span className='gradient-text'>Delicious</span> Selections
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'
          >
            From signature burgers to crispy delights, every bite tells a story
            of quality and passion.
            <span className='text-brand-yellow font-semibold'>
              {" "}
              Crafted with love, served with pride.
            </span>
          </motion.p>
        </motion.div>

        {/* Enhanced Menu Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='flex justify-center mb-16'
        >
          <div className='flex flex-wrap gap-3 bg-brand-black-soft/80 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-brand-yellow/20 glow-effect'>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black shadow-lg"
                    : "hover:bg-brand-yellow/10 text-white hover:text-brand-yellow"
                }`}
              >
                {category}
                {activeFilter === category && (
                  <motion.div
                    layoutId='activeFilter'
                    className='absolute inset-0 bg-gradient-to-r from-brand-yellow to-brand-yellow-light rounded-xl -z-10'
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 80, opacity: 0, scale: 0.8 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 * index,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -15,
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(255, 193, 7, 0.2)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className='group bg-brand-black-soft/60 backdrop-blur-xl border border-brand-yellow/20 rounded-3xl shadow-xl overflow-hidden hover:border-brand-yellow/40 transition-all duration-500 hover-glow'
            >
              <div className='relative overflow-hidden rounded-t-3xl'>
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
                  whileHover={{ scale: 1.1 }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                {!item.available && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center'
                  >
                    <div className='text-center'>
                      <div className='text-4xl mb-2'>😔</div>
                      <span className='text-white font-bold text-lg'>
                        Currently Unavailable
                      </span>
                    </div>
                  </motion.div>
                )}
                {item.available && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className='absolute top-4 right-4 bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-sm font-bold'
                  >
                    Available
                  </motion.div>
                )}
              </div>
              <div className='p-4 sm:p-6'>
                <motion.h3 className='text-lg sm:text-xl font-black text-white mb-2 sm:mb-3 group-hover:text-brand-yellow transition-colors duration-300'>
                  {item.name}
                </motion.h3>
                <p className='text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed'>
                  {item.description}
                </p>
                <div className='flex justify-between items-center'>
                  <motion.span
                    className='text-xl sm:text-2xl lg:text-3xl font-black gradient-text'
                    whileHover={{ scale: 1.1 }}
                  >
                    {formatPrice(item.price)}
                  </motion.span>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 20px rgba(255, 193, 7, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    disabled={!item.available}
                    className='bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2 text-sm sm:text-base'
                  >
                    <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
                    <span>Add</span>
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
          className='text-center mt-12'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300'
          >
            View Full Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
