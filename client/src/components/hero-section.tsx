import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, Utensils, Star, Award, Clock } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={ref}
      id='home'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Dynamic Background */}
      <motion.div style={{ y }} className='absolute inset-0 parallax-bg'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          }}
        />
        <div className='absolute inset-0 hero-overlay' />

        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className='absolute inset-0'
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-20 left-10 text-6xl opacity-20'
      >
        🍕
      </motion.div>
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -2,
        }}
        className='absolute top-40 right-20 text-5xl opacity-25'
      >
        🍗
      </motion.div>
      <motion.div
        animate={{
          y: [0, -35, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -4,
        }}
        className='absolute bottom-32 left-20 text-7xl opacity-30'
      >
        🍔
      </motion.div>

      {/* Geometric Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className='absolute top-1/4 right-1/4 w-32 h-32 border-2 border-brand-yellow/10 rounded-full'
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className='absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-brand-yellow/15 rounded-lg'
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className='relative z-10 text-center text-white px-6 max-w-7xl mx-auto'
      >
        {/* Stats Bar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='flex justify-center items-center space-x-8 mb-8 text-sm'
        >
          <div className='flex items-center space-x-2'>
            <Star className='w-4 h-4 text-brand-yellow' />
            <span>4.9/5 Rating</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Award className='w-4 h-4 text-brand-yellow' />
            <span>Best in Lahore</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Clock className='w-4 h-4 text-brand-yellow' />
            <span>15 Min Delivery</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.4,
            type: "spring",
            stiffness: 80,
          }}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 leading-none'
        >
          <span className='gradient-text'>BULL</span>
          <span className='text-white'>BUSTER</span>
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mb-8'
        >
          <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed px-4'>
            Experience the{" "}
            <span className='text-brand-yellow font-semibold'>
              finest fast food
            </span>{" "}
            in Lahore.
          </p>
          <p className='text-base sm:text-lg md:text-xl text-gray-300 mt-3 sm:mt-4 max-w-3xl mx-auto px-4'>
            Premium burgers, legendary taste, unforgettable moments.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4'
        >
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, type: "spring" }}
            whileHover={{
              scale: 1.08,
              boxShadow: "0 25px 50px rgba(255, 193, 7, 0.4)",
              y: -8,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("menu")}
            className='group bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 shadow-2xl flex items-center gap-2 sm:gap-3 hover-glow w-full sm:w-auto justify-center'
          >
            <Utensils className='w-6 h-6 group-hover:rotate-12 transition-transform duration-300' />
            <span>Explore Menu</span>
          </motion.button>

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            whileHover={{
              scale: 1.08,
              backgroundColor: "rgba(255, 193, 7, 1)",
              color: "rgba(0, 0, 0, 1)",
              y: -8,
              boxShadow: "0 20px 40px rgba(255, 193, 7, 0.3)",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("about")}
            className='group border-2 border-brand-yellow text-brand-yellow px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 flex items-center gap-2 sm:gap-3 backdrop-blur-sm bg-white/5 w-full sm:w-auto justify-center'
          >
            <Play className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
            <span>Our Story</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group'
        onClick={() => scrollToSection("about")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='flex flex-col items-center space-y-2'
        >
          <span className='text-brand-yellow text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity'>
            Scroll Down
          </span>
          <motion.div
            whileHover={{ scale: 1.2 }}
            className='p-3 rounded-full border-2 border-brand-yellow/30 group-hover:border-brand-yellow/60 transition-colors'
          >
            <ChevronDown className='text-brand-yellow text-xl' />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
