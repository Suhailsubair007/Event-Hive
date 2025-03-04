import { useEffect, useState } from "react";
import { EventList } from "../../../ReusableComponents/EventManagement/event-list";
import { AddEventModal } from "../../../ReusableComponents/EventManagement/add-event-modal";
import { EditEventModal } from "../../../ReusableComponents/EventManagement/edit-event-modal";
import type { Event } from "../../../types/Event-type";
import { fetchEvents } from "../../../services/User/eventService";
import { LoadingEventsAnimation } from "../../../ReusableComponents/LoadingAnimations/LoadingEventsAnimation";
import { toast } from "sonner";

function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, []);

  console.log("events===>", events);

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, clientId: Date.now().toString() }]);
    setIsAddModalOpen(false);
    toast.success("Your event has been successfully created.");
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.clientId === updatedEvent.clientId ? updatedEvent : event
      )
    );
    setIsEditModalOpen(false);
    setCurrentEvent(null);
    toast.success("Your event has been successfully updated.");
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.clientId !== id));
    toast.success("Your event has been successfully deleted.");
  };

  const openEditModal = (event: Event) => {
    setCurrentEvent(event);
    setIsEditModalOpen(true);
  };

  if (isLoading) return <LoadingEventsAnimation />;
  if (isError) return <p>Error fetching events.</p>;

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
