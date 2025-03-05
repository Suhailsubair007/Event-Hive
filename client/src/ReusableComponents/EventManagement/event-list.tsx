import { useState } from "react"
import type { Event } from "../../types/Event-type"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "./eventCard"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

interface EventListProps {
  events: Event[]
  onAddEvent: () => void
  onEditEvent: (event: Event) => void
  onDeleteEvent: (id: string | undefined) => void
}

export function EventList({ events, onAddEvent, onEditEvent, onDeleteEvent }: EventListProps) {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const expiredEvents = events.filter((event) => event.status === "expired")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">My Events</h1>
        </div>
        <Button onClick={onAddEvent} className="bg-[#7848F4] hover:bg-[#6a3ee0] text-white">
          Host Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming" className={activeTab === "upcoming" ? "border-b-2 border-[#7848F4]" : ""}>
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="expired" className={activeTab === "expired" ? "border-b-2 border-[#7848F4]" : ""}>
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id || `event-${event.clientId}`}
                  event={event}
                  onEdit={() => onEditEvent(event)}
                  onDelete={() => onDeleteEvent(event.id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">No upcoming events found.</p>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="expired">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {expiredEvents.length > 0 ? (
              expiredEvents.map((event) => (
                <EventCard
                  key={event.id || `event-${event.clientId}`}
                  event={event}
                  onEdit={() => onEditEvent(event)}
                  onDelete={() => onDeleteEvent(event.id)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-8">No completed events found.</p>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}