import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Share2 } from "lucide-react"


// Dummy data matching the API response structure
const eventData = {
  event: {
    title: "Dream world wide in jakatra",
    description:
      "DesignHub organized a 3D Modeling Workshop using Blender on 15th February at 5 PM. The workshop taught participants the magic of creating stunning 3D models and animations using Blender. It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, which added to the excitement.",
    location: {
      address: "Hotel Arts, 119 12 Ave SW, Calgary",
      latitude: 51.0447,
      longitude: -114.0719,
    },
    eventDate: "2025-03-08T09:30:00.000Z",
    startTime: "09:30",
    endTime: "17:30",
    posterImageUrl: "https://res.cloudinary.com/dupo7yv88/image/upload/v1741252210/gu767rm9tf8ukr19mfsh.jpg",
    tags: ["Indonesia event", "Jakartran event", "UI", "Seminar"],
    tickets: [
      {
        type: "normal",
        price: 200,
        availableSeats: 100,
        _id: "1",
      },
      {
        type: "VIP",
        price: 500,
        availableSeats: 20,
        _id: "2",
      },
    ],
  },
}

export default function EventDetails() {
  const { event } = eventData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <img
          src={event.posterImageUrl || "/placeholder.svg"}
          alt={event.title}
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto h-full px-4">
            <div className="flex h-full items-end pb-16">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-[#7848F4]">Event</Badge>
                <h1 className="mb-4 text-4xl font-bold text-white">{event.title}</h1>
                <Button variant="link" className="flex items-center gap-2 px-0 text-white hover:text-[#7848F4]">
                  <MapPin className="h-4 w-4" />
                  View map
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card */}
        <Card className="absolute right-4 top-4 w-80 space-y-4 p-4 md:right-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#7848F4]" />
              <span className="text-sm">
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#7848F4]" />
              <span className="text-sm">
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#7848F4]" />
              <span className="text-sm">{event.location.address}</span>
            </div>
          </div>
          <Button className="w-full bg-[#7848F4] hover:bg-[#6837E3]">Book Ticket</Button>
        </Card>
      </div>

      {/* Content Section */}
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Description</h2>
              <p className="text-gray-600">{event.description}</p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">Event location</h2>
              <div className="h-[300px] rounded-lg bg-gray-100">
                {/* Map placeholder - you can integrate your preferred map component here */}
                <div className="flex h-full items-center justify-center text-gray-500">Map View</div>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Hosted By</h2>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <p className="font-semibold">Event Organizer</p>
                <p className="text-sm text-gray-600">Host</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Share with friends</h2>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Event
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}

