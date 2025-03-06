import { motion } from "framer-motion";
import { Calendar, Users, Star } from "lucide-react";

interface FeaturesSectionProps {
  featureImage1: string;
  featureImage2: string;
}

export const FeaturesSection = ({ featureImage1, featureImage2 }: FeaturesSectionProps) => {
  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/5 to-[#7848F4]/5" />
      
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#7848F4] to-[#4A90E2]"
      >
        Why Choose EventHive?
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <motion.div
          custom={0}
          variants={featureVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src={featureImage1}
            alt="Event vibe"
            className="w-80 h-96 object-cover rounded-tl-[50%] rounded-br-[50%] shadow-xl transform hover:rotate-3 transition-transform duration-300"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#4A90E2]/20 rounded-full animate-pulse" />
        </motion.div>

        <div className="space-y-8 lg:col-span-2">
          <motion.div
            custom={1}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg flex items-start gap-4"
          >
            <Calendar className="text-[#7848F4]" size={32} />
            <div>
              <h3 className="text-xl font-semibold">Seamless Booking</h3>
              <p className="text-gray-600">Reserve your spot at any event with just a few clicks.</p>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg flex items-start gap-4"
          >
            <Users className="text-[#7848F4]" size={32} />
            <div>
              <h3 className="text-xl font-semibold">Exclusive Events</h3>
              <p className="text-gray-600">Access VIP events and pre-sales only on EventHive.</p>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg flex items-start gap-4"
          >
            <Star className="text-[#7848F4]" size={32} />
            <div>
              <h3 className="text-xl font-semibold">Top-Rated Support</h3>
              <p className="text-gray-600">Our team ensures your experience is unforgettable.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.img
        src={featureImage2}
        alt="Event lights"
        className="w-64 h-72 object-cover rounded-tr-[50%] rounded-bl-[50%] shadow-xl absolute bottom-0 right-0 transform -rotate-6"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
    </section>
  );
};