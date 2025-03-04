import { useState } from "react";
import { EventList } from "../../../ReusableComponents/EventManagement/event-list";
import { AddEventModal } from "../../../ReusableComponents/EventManagement/add-event-modal";
import { EditEventModal } from "../../../ReusableComponents/EventManagement/edit-event-modal";
import type { Event } from "../../../types/Event-type";
import { toast } from "sonner";

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Cycling Marathon",
    description: "A cycling event for enthusiasts",
    eventDate: "2024-01-22T10:00:00Z",
    startTime: "10:00",
    endTime: "14:00",
    tickets: [
      {
        type: "normal",
        price: 0,
        availableSeats: 100,
        sold: 0,
      },
    ],
    tags: ["sports", "cycling", "marathon"],
    location: {
      latitude: 40.4406,
      longitude: -79.9959,
      address: "1517 W. Gray St, Philadelphia, 07867",
    },
    posterImageUrl: "https://example.com/cycling.jpg",
    category: "Sports",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Marathon Fun",
    description: "Annual marathon event",
    eventDate: "2024-01-22T08:00:00Z",
    startTime: "08:00",
    endTime: "12:00",
    tickets: [
      {
        type: "normal",
        price: 98,
        availableSeats: 200,
        sold: 50,
      },
    ],
    tags: ["sports", "running", "marathon"],
    location: {
      latitude: 40.4406,
      longitude: -79.9959,
      address: "1517 W. Gray St, Philadelphia, 07867",
    },
    posterImageUrl: "https://example.com/marathon.jpg",
    category: "Sports",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Music Funanza",
    description: "A live music concert",
    eventDate: "2024-01-22T18:00:00Z",
    startTime: "18:00",
    endTime: "22:00",
    tickets: [
      {
        type: "normal",
        price: 30,
        availableSeats: 100,
        sold: 20,
      },
      {
        type: "VIP",
        price: 150,
        availableSeats: 50,
        sold: 10,
      },
    ],
    tags: ["music", "live", "concert"],
    location: {
      latitude: 40.4406,
      longitude: -79.9959,
      address: "1517 W. Gray St, Philadelphia, 07867",
    },
    posterImageUrl: "https://example.com/music.jpg",
    category: "Music events",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Music Funanza",
    description: "A live music concert",
    eventDate: "2024-01-22T18:00:00Z",
    startTime: "18:00",
    endTime: "22:00",
    tickets: [
      {
        type: "normal",
        price: 98,
        availableSeats: 100,
        sold: 100,
      },
      {
        type: "VIP",
        price: 150,
        availableSeats: 50,
        sold: 50,
      },
    ],
    tags: ["music", "live", "concert"],
    location: {
      latitude: 40.4406,
      longitude: -79.9959,
      address: "1517 W. Gray St, Philadelphia, 07867",
    },
    posterImageUrl: "https://example.com/music2.jpg",
    category: "Music events",
    status: "completed",
  },
];

function Event() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
    toast.success("Your event has been successfully created.");
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsEditModalOpen(false);
    setCurrentEvent(null);
    toast.success("Your event has been successfully updated.");
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    toast.success("Your event has been successfully deleted.");
  };

  const openEditModal = (event: Event) => {
    setCurrentEvent(event);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <EventList
        events={events}
        onAddEvent={() => setIsAddModalOpen(true)}
        onEditEvent={openEditModal}
        onDeleteEvent={handleDeleteEvent}
      />

      {isAddModalOpen && (
        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEvent}
        />
      )}

      {isEditModalOpen && currentEvent && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentEvent(null);
          }}
          onSubmit={handleEditEvent}
          event={currentEvent}
        />
      )}
    </div>
  );
}

export default Event;
