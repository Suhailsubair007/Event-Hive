import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { editEvent } from "../../services/User/eventService" // Import editEvent service
import { toast } from "sonner"
import { uploadImageToCloudinary } from "../../utils/imageUpload"
import type { Event, EventFormData, Location, Ticket } from "../../types/Event-type"
import { MapPicker } from "./map-picker"
import { TagInput } from "./tagInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux"

interface EditEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (event: Event) => void
  event: Event
}

const CATEGORIES = [
  "Music events",
  "Sports",
  "Conferences",
  "Workshops",
  "Exhibitions",
  "Festivals",
  "Networking",
  "Other",
]

export function EditEventModal({ isOpen, onClose, onSubmit, event }: EditEventModalProps) {
  const email = useSelector((state: any) => state?.user?.userInfo?.email)

  const [formData, setFormData] = useState<EventFormData>({
    clientId: "",
    title: "",
    description: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    normalTicketPrice: 0,
    normalTicketCount: 0,
    hasVipTicket: false,
    vipTicketPrice: 0,
    vipTicketCount: 0,
    tags: [],
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "",
    },
    posterImageUrl: "",
    category: "",
  })

  const [posterImage, setPosterImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form data from event
  useEffect(() => {
    if (event) {
      const normalTicket = event.tickets.find((t) => t.type === "normal")
      const vipTicket = event.tickets.find((t) => t.type === "VIP")
      const eventDate = new Date(event.eventDate)
      const formattedDate = eventDate.toISOString().split("T")[0]

      setFormData({
        clientId: event.clientId,
        title: event.title,
        description: event.description,
        eventDate: formattedDate,
        startTime: event.startTime,
        endTime: event.endTime,
        normalTicketPrice: normalTicket?.price || 0,
        normalTicketCount: normalTicket?.availableSeats || 0,
        hasVipTicket: !!vipTicket,
        vipTicketPrice: vipTicket?.price || 0,
        vipTicketCount: vipTicket?.availableSeats || 0,
        tags: event.tags,
        location: event.location,
        posterImageUrl: event.posterImageUrl,
        category: event.category,
      })
    }
  }, [event])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hasVipTicket: checked }))
  }

  const handleLocationChange = (location: Location) => {
    setFormData((prev) => ({ ...prev, location }))
  }

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({ ...prev, category }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPosterImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload new poster image if selected
      let posterImageUrl = formData.posterImageUrl
      if (posterImage) {
        const uploadedImageUrl = await uploadImageToCloudinary(posterImage)
        if (uploadedImageUrl) {
          posterImageUrl = uploadedImageUrl
        }
      }

      // Create tickets array
      const tickets: Ticket[] = [
        {
          type: "normal",
          price: formData.normalTicketPrice,
          availableSeats: formData.normalTicketCount,
          sold: event.tickets.find((t) => t.type === "normal")?.sold || 0,
        },
      ]

      // Add VIP ticket if enabled
      if (formData.hasVipTicket) {
        tickets.push({
          type: "VIP",
          price: formData.vipTicketPrice,
          availableSeats: formData.vipTicketCount,
          sold: event.tickets.find((t) => t.type === "VIP")?.sold || 0,
        })
      }

      // Create the updated event object
      const updatedEvent: Event = {
        ...event,
        title: formData.title,
        description: formData.description,
        eventDate: new Date(formData.eventDate + "T" + formData.startTime).toISOString(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        tickets,
        tags: formData.tags,
        location: formData.location,
        posterImageUrl,
        category: formData.category,
      }


      // Call editEvent service
      if (event.id) {
        const editedEvent = await editEvent(event.id, updatedEvent)
        onSubmit(editedEvent)
        toast.success("Event updated successfully!")
      }
    } catch (error) {
      console.error("Error updating event:", error)
      toast.error("Failed to update event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Alexa Rowles</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the title of the event"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter the description of the event"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="startTime">Event start time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endTime">Event end time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="normalTicketPrice">Tickets Price</Label>
                <Input
                  id="normalTicketPrice"
                  name="normalTicketPrice"
                  type="number"
                  placeholder="Enter the price of the general ticket"
                  value={formData.normalTicketPrice}
                  onChange={handleNumberChange}
                  min={0}
                  required
                />
              </div>

              <div>
                <Label htmlFor="normalTicketCount">Tickets Count</Label>
                <Input
                  id="normalTicketCount"
                  name="normalTicketCount"
                  type="number"
                  placeholder="Enter available tickets"
                  value={formData.normalTicketCount}
                  onChange={handleNumberChange}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="hasVipTicket" checked={formData.hasVipTicket} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="hasVipTicket">VIP Ticket</Label>
            </div>

            {formData.hasVipTicket && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-[#7848F4]">
                <div>
                  <Label htmlFor="vipTicketPrice">VIP Ticket Price</Label>
                  <Input
                    id="vipTicketPrice"
                    name="vipTicketPrice"
                    type="number"
                    placeholder="Enter the price of the special ticket"
                    value={formData.vipTicketPrice}
                    onChange={handleNumberChange}
                    min={0}
                    required={formData.hasVipTicket}
                  />
                </div>

                <div>
                  <Label htmlFor="vipTicketCount">VIP Tickets Count</Label>
                  <Input
                    id="vipTicketCount"
                    name="vipTicketCount"
                    type="number"
                    placeholder="Enter available VIP tickets"
                    value={formData.vipTicketCount}
                    onChange={handleNumberChange}
                    min={1}
                    required={formData.hasVipTicket}
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Tags</Label>
              <TagInput tags={formData.tags} onChange={handleTagsChange} placeholder="Add tags related to the event" />
            </div>

            <div>
              <Label>Location</Label>
              <MapPicker location={formData.location} onLocationChange={handleLocationChange} />
            </div>

            <div>
              <Label htmlFor="posterImage">Event Image</Label>
              <div className="mt-2">
                <input id="posterImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button type="button" onClick={() => document.getElementById("posterImage")?.click()} className="mb-2">
                  Upload Image
                </Button>
                {formData.posterImageUrl && (
                  <img
                    src={formData.posterImageUrl || "/placeholder.svg"}
                    alt="Current poster"
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="category">Event category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#7848F4] hover:bg-[#6a3ee0]" disabled={isSubmitting}>
              {isSubmitting ? "Updating Event..." : "Update Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

