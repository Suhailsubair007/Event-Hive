import { useEffect, useState } from "react";
import { EventList } from "../../../ReusableComponents/EventManagement/event-list";
import { AddEventModal } from "../../../ReusableComponents/EventManagement/add-event-modal";
import { EditEventModal } from "../../../ReusableComponents/EventManagement/edit-event-modal";
import type { Event } from "../../../types/Event-type";
import { fetchEvents, deleteEvent } from "../../../services/User/eventService";
import { LoadingEventsAnimation } from "../../../ReusableComponents/LoadingAnimations/LoadingEventsAnimation";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const clientId = useSelector((state: any) => state?.user?.userInfo?.id);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEvents(clientId);
      setEvents(data);
      setIsError(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [clientId]);

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, clientId: Date.now().toString() }]);
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

  const handleDeleteEvent = async (eventId: string | undefined) => {
    if (!eventId) {
      toast.error("Cannot delete event: Missing event ID");
      return;
    }

    try {
      const loadingToast = toast.loading("Deleting event...");
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      toast.dismiss(loadingToast);
      toast.success("Your event has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    }
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