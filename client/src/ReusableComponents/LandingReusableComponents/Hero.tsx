import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dupo7yv88/image/upload/v1739121646/yzbv7qtndn1tzxge3a81.svg)",
          filter: "brightness(0.7)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-white">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-center mb-8"
        >
          MADE FOR THOSE
          <br />
          WHO DO
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <select className="w-full p-3 border rounded-lg appearance-none text-black">
                <option>Select event type</option>
                <option>Music</option>
                <option>Tech</option>
                <option>Dance</option>
              </select>
            </div>
            <div className="relative">
              <select className="w-full p-3 border rounded-lg appearance-none text-black">
                <option>Select location</option>
                <option>Kochi</option>
                <option>Trivandrum</option>
                <option>Calicut</option>
              </select>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full p-3 border rounded-l-lg text-black"
              />
              <button className="bg-[#7848F4] text-white px-6 rounded-r-lg hover:bg-[#6a3ee0] transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
