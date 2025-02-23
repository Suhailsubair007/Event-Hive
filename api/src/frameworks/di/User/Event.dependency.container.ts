import { EventRepository } from "../../../interface-apdaters/repositories/User/Events/EventRepository";
import { AddEvent } from "../../../use-cases/user/Events/AddEvent";
import { AddEventController } from "../../../interface-apdaters/controllers/users/EventsController/AddEvent.controller";
import { EditEventController } from "../../../interface-apdaters/controllers/users/EventsController/EditEvent.controller";
import { EditEvent } from "../../../use-cases/user/Events/EditEvent";

const eventRepository = new EventRepository();

const addEvent = new AddEvent(eventRepository);
const editEvent = new EditEvent(eventRepository);

const addEventController = new AddEventController(addEvent);
const editEventController = new EditEventController(editEvent);
export { addEventController, editEventController };
