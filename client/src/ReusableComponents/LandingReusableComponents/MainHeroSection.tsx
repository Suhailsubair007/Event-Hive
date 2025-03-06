import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Ticket } from "lucide-react";

interface HeroSectionProps {
  heroImage1: string;
  heroImage2: string;
}

export const MainHero = ({ heroImage1, heroImage2 }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[90vh] relative flex items-center justify-center px-4 md:px-8 lg:px-16 py-12">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7848F4]/15 via-transparent to-[#E848F4]/15" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7848F4] via-[#4A90E2] to-[#E848F4]">
            Book Your Next Adventure with EventHive
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Discover and book tickets to the hottest events – concerts, festivals, and more – all in one place.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7848F4] text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Grab Your Tickets <Ticket size={20} />
          </motion.button>
        </motion.div>

        <div className="relative flex justify-center items-center">
          <motion.img
            src={heroImage1}
            alt="Concert crowd"
            className="w-80 h-[28rem] object-cover clip-hexagon shadow-2xl transform rotate-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.img
            src={heroImage2}
            alt="Festival lights"
            className="w-72 h-[22rem] object-cover clip-hexagon shadow-2xl absolute -bottom-6 -left-12 transform -rotate-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <div className="absolute w-48 h-48 bg-[#7848F4]/20 rounded-full -z-10 top-2 right-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};