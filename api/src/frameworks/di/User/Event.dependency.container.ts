import { EventRepository } from "../../../interface-apdaters/repositories/User/Events/EventRepository";
import { AddEvent } from "../../../use-cases/user/Events/AddEvent";
import { AddEventController } from "../../../interface-apdaters/controllers/users/EventsController/AddEvent.controller";
import { EditEventController } from "../../../interface-apdaters/controllers/users/EventsController/EditEvent.controller";
import { EditEvent } from "../../../use-cases/user/Events/EditEvent";
import { ListEventsController } from "../../../interface-apdaters/controllers/users/EventsController/ListEventsCOntroller";
import { ListEvents } from "../../../use-cases/user/Events/ListEvents";
import { DeleteEvent } from "../../../use-cases/user/Events/DeleteEvents";
import { DeleteEventController } from "../../../interface-apdaters/controllers/users/EventsController/DeleteEventController";

const eventRepository = new EventRepository();

const addEvent = new AddEvent(eventRepository);
const editEvent = new EditEvent(eventRepository);
const listEvents = new ListEvents(eventRepository);
const deleteEvent = new DeleteEvent(eventRepository);

const addEventController = new AddEventController(addEvent);
const editEventController = new EditEventController(editEvent);
const listEventsController = new ListEventsController(listEvents);
const deleteEventController = new DeleteEventController(deleteEvent);

export {
  addEventController,
  editEventController,
  listEventsController,
  deleteEventController,
};
