import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


interface HeroSectionProps {
  heroImage: string
}

export const MainHero = ({ heroImage }: HeroSectionProps) => {

    const navigate = useNavigate();
  return (
    <section className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-8 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Event
          <span className="text-[#7848F4]">Hive</span>
          -ing the
          <br />
          Best.Day.Ever.
        </h1>
        <p className="mt-6 text-gray-600 text-lg">Thriving Above Event Expectations</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-[#7848F4] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:shadow-lg transition-shadow"
          onClick={() => navigate("/login")}
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1"
      >
        <div className="relative">
          <motion.img
            src={heroImage}
            alt="Event atmosphere with lighting"
            className="w-full rounded-2xl shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7848F4]/20 to-transparent rounded-2xl" />
        </div>
      </motion.div>
    </section>
  )
}

