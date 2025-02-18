import { motion } from "framer-motion"
import { Calendar, Users } from "lucide-react"

interface FeaturesSectionProps {
  featureImage: string
}

export const FeaturesSection = ({ featureImage }: FeaturesSectionProps) => {
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center gap-12 px-1 md:px-8 lg:px-16 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <img
          src={featureImage || "/placeholder.svg"}
          alt="Vibrant event atmosphere"
          className="rounded-2xl shadow-2xl w-full"
        />
      </motion.div>

      <div className="flex-1 space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold"
        >
          Make your Event
          <br />
          Memorable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Aliquam vel plates condatur sit vestibulum egestas sit id lorem. Aliquet neque, dui sed eget scelerisque. Non
          at at venenatis tortor amet feugiat ullamcorper in. Odio vulputate cras vel lacinia turpis volutpat
          adipiscing. Sollicitudin at velit, blandit tempus nunc in.
        </motion.p>

        <div className="grid grid-cols-2 gap-6">
          <motion.div
            custom={0}
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#7848F4] p-6 rounded-2xl text-white"
          >
            <Calendar className="mb-3" size={28} />
            <div className="text-3xl font-bold">2k+</div>
            <div className="text-sm opacity-90">Total Events Hosted</div>
          </motion.div>

          <motion.div
            custom={1}
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#7848F4] p-6 rounded-2xl text-white"
          >
            <Users className="mb-3" size={28} />
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm opacity-90">Total Events Live</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

