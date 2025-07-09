import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Check, Utensils, Bike, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Order } from "@shared/schema";

const orderSteps = [
  { id: 'confirmed', label: 'Order Confirmed', description: 'Your order has been received and confirmed', icon: Check },
  { id: 'preparing', label: 'Preparing', description: 'Our chefs are preparing your delicious meal', icon: Utensils },
  { id: 'out_for_delivery', label: 'Out for Delivery', description: 'Your order is on its way to you', icon: Bike },
  { id: 'delivered', label: 'Delivered', description: 'Order delivered successfully', icon: Home },
];

export default function OrderTrackingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [orderNumber, setOrderNumber] = useState('');
  const [searchOrderNumber, setSearchOrderNumber] = useState('');

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ['/api/orders', searchOrderNumber],
    enabled: !!searchOrderNumber,
  });

  const handleSearch = () => {
    if (orderNumber.trim()) {
      setSearchOrderNumber(orderNumber.trim());
    }
  };

  const getStepStatus = (stepId: string) => {
    if (!order) return 'pending';
    
    const currentIndex = orderSteps.findIndex(step => step.id === order.status);
    const stepIndex = orderSteps.findIndex(step => step.id === stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <section id="track" ref={ref} className="py-20 bg-brand-dark-gray">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow font-semibold text-lg uppercase tracking-wider">Track Your Order</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-6">Real-Time Updates</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay informed with live tracking and precise delivery estimates.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Order Input */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-brand-yellow/20 rounded-2xl p-8 shadow-lg mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your order ID (e.g., BB123456789)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1 px-6 py-4 border border-brand-yellow/30 bg-black/20 text-white placeholder-gray-400 rounded-full focus:border-brand-yellow focus:outline-none transition-colors duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
                {isLoading ? 'Searching...' : 'Track Order'}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Order Progress */}
          {error && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-black/40 backdrop-blur-sm border border-brand-yellow/20 rounded-2xl p-8 shadow-lg text-center"
            >
              <div className="text-red-500 mb-4">
                <Search className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-white">Order Not Found</h3>
                <p className="text-gray-300 mt-2">Please check your order number and try again.</p>
              </div>
            </motion.div>
          )}

          {order && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 backdrop-blur-sm border border-brand-yellow/20 rounded-2xl p-8 shadow-lg"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white mb-2">Order #{order.orderNumber}</h3>
                <p className="text-gray-300">Customer: {order.customerName}</p>
                <p className="text-gray-300">Total: Rs. {(order.total / 100).toFixed(0)}</p>
                <p className="text-gray-300">Estimated delivery: 25-30 minutes</p>
              </div>
              
              <div className="space-y-6">
                {orderSteps.map((step, index) => {
                  const status = getStepStatus(step.id);
                  const IconComponent = step.icon;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-center space-x-4"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        status === 'completed' ? 'bg-brand-yellow text-brand-black' :
                        status === 'active' ? 'bg-brand-yellow text-brand-black animate-pulse' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                          {step.label}
                        </h4>
                        <p className={`text-sm ${status === 'pending' ? 'text-gray-500' : 'text-gray-300'}`}>
                          {step.description}
                        </p>
                        {status !== 'pending' && (
                          <span className="text-xs text-gray-400">
                            {status === 'active' ? 'In Progress' : formatTime(order.updatedAt)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
