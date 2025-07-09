import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-brand-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="text-9xl absolute top-20 left-20">🍔</div>
        <div className="text-7xl absolute bottom-32 right-32">🍕</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow font-semibold text-lg uppercase tracking-wider">Contact Us</span>
          <h2 className="text-5xl font-black text-white mt-4 mb-6">Get In Touch</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Visit our locations or reach out to us for any inquiries.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                <MapPin className="text-brand-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Main Location</h3>
                <p className="text-gray-300">MM Alam Road, Gulberg III, Lahore, Pakistan</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                <Phone className="text-brand-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+92 42 1234 5678</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                <Clock className="text-brand-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                <p className="text-gray-300">Open 24/7 for your convenience</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                <Mail className="text-brand-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">hello@bullbsuter.com</p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/20 border border-white/30 rounded-full px-6 py-4 text-white placeholder-gray-300 focus:border-brand-yellow focus:outline-none transition-colors duration-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/20 border border-white/30 rounded-full px-6 py-4 text-white placeholder-gray-300 focus:border-brand-yellow focus:outline-none transition-colors duration-300"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/30 rounded-full px-6 py-4 text-white placeholder-gray-300 focus:border-brand-yellow focus:outline-none transition-colors duration-300"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:border-brand-yellow focus:outline-none transition-colors duration-300 resize-none"
              />
              <motion.button
                type="submit"
                disabled={contactMutation.isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-brand-yellow text-brand-black py-4 rounded-full font-semibold hover:bg-brand-yellow-light transition-all duration-300 disabled:opacity-50"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
