import { motion } from "framer-motion"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">The passionate individuals behind every successful event</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#7848F4]/20"
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

