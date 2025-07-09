import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, Utensils, Bike, Home, Clock } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const orderSteps = [
  { id: 'confirmed', label: 'Order Confirmed', description: 'Your order has been received and confirmed', icon: Check },
  { id: 'preparing', label: 'Preparing', description: 'Our chefs are preparing your delicious meal', icon: Utensils },
  { id: 'out_for_delivery', label: 'Out for Delivery', description: 'Your order is on its way to you', icon: Bike },
  { id: 'delivered', label: 'Delivered', description: 'Order delivered successfully', icon: Home },
];

// Demo order data
const demoOrders: Record<string, any> = {
  "12345": {
    id: "12345",
    status: "preparing",
    items: ["Bull Signature Burger", "Loaded Bull Fries", "Chocolate Thunder Shake"],
    total: 219700,
    estimatedTime: "25-30 minutes",
    createdAt: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  "67890": {
    id: "67890",
    status: "out_for_delivery",
    items: ["Crispy Chicken Deluxe", "Spicy Wings Combo"],
    total: 149800,
    estimatedTime: "10-15 minutes",
    createdAt: new Date(Date.now() - 35 * 60 * 1000) // 35 minutes ago
  },
  "11111": {
    id: "11111",
    status: "delivered",
    items: ["Classic Fish & Chips"],
    total: 99900,
    estimatedTime: "Delivered",
    createdAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  }
};

export default function OrderTrackingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [orderNumber, setOrderNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!orderNumber.trim()) return;
    
    setIsSearching(true);
    setNotFound(false);
    
    // Simulate API call delay
    setTimeout(() => {
      const order = demoOrders[orderNumber.trim()];
      if (order) {
        setSearchedOrder(order);
        setNotFound(false);
      } else {
        setSearchedOrder(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStepStatus = (stepId: string) => {
    if (!searchedOrder) return 'pending';
    
    const currentIndex = orderSteps.findIndex(step => step.id === searchedOrder.status);
    const stepIndex = orderSteps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const formatPrice = (price: number) => `Rs. ${(price / 100).toFixed(0)}`;

  return (
    <section id="track" ref={ref} className="py-20 bg-gradient-to-br from-brand-black via-brand-black-soft to-brand-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-yellow font-semibold text-base sm:text-lg uppercase tracking-wider">Order Tracking</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 mb-6">
            <span className="gradient-text">Track Your</span> Order
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Enter your order number to track the status of your delicious meal.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-black-soft/60 backdrop-blur-xl border border-brand-yellow/20 rounded-2xl p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your order number (try: 12345, 67890, or 11111)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-brand-black/50 border border-brand-yellow/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-brand-yellow focus:outline-none transition-colors"
            />
            <motion.button
              onClick={handleSearch}
              disabled={isSearching}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-black"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Track Order</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center"
          >
            <p className="text-red-400 font-semibold">Order not found</p>
            <p className="text-gray-300 text-sm mt-2">Please check your order number and try again.</p>
          </motion.div>
        )}

        {searchedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Order Info */}
            <div className="bg-brand-black-soft/60 backdrop-blur-xl border border-brand-yellow/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Order #{searchedOrder.id}</h3>
                  <p className="text-gray-300">Total: {formatPrice(searchedOrder.total)}</p>
                </div>
                <div className="flex items-center space-x-2 text-brand-yellow mt-2 sm:mt-0">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{searchedOrder.estimatedTime}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Items:</h4>
                <ul className="text-gray-300 space-y-1">
                  {searchedOrder.items.map((item: string, index: number) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-brand-black-soft/60 backdrop-blur-xl border border-brand-yellow/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-8">Order Progress</h3>
              
              <div className="space-y-6">
                {orderSteps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  const Icon = step.icon;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        status === 'completed' 
                          ? 'bg-brand-yellow border-brand-yellow' 
                          : status === 'active'
                          ? 'bg-brand-yellow/20 border-brand-yellow animate-pulse'
                          : 'bg-gray-600/20 border-gray-600'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          status === 'completed' 
                            ? 'text-brand-black' 
                            : status === 'active'
                            ? 'text-brand-yellow'
                            : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          status === 'completed' || status === 'active' 
                            ? 'text-white' 
                            : 'text-gray-400'
                        }`}>
                          {step.label}
                        </h4>
                        <p className={`text-sm ${
                          status === 'completed' || status === 'active' 
                            ? 'text-gray-300' 
                            : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Demo Info */}
        {!searchedOrder && !notFound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-6 text-center"
          >
            <p className="text-brand-yellow font-semibold mb-2">Demo Order Numbers</p>
            <p className="text-gray-300 text-sm">
              Try these order numbers: <span className="text-brand-yellow font-mono">12345</span>, <span className="text-brand-yellow font-mono">67890</span>, or <span className="text-brand-yellow font-mono">11111</span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
