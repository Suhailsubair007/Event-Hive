import { EventRepository } from "../../../interface-apdaters/repositories/User/Events/EventRepository";
import { AddEvent } from "../../../use-cases/user/Events/AddEvent";
import { AddEventController } from "../../../interface-apdaters/controllers/users/EventsController/AddEvent.controller";
import { EditEventController } from "../../../interface-apdaters/controllers/users/EventsController/EditEvent.controller";
import { EditEvent } from "../../../use-cases/user/Events/EditEvent";
import { ListEventsController } from "../../../interface-apdaters/controllers/users/EventsController/ListEventsCOntroller";
import { ListEvents } from "../../../use-cases/user/Events/ListEvents";
import { DeleteEvent } from "../../../use-cases/user/Events/DeleteEvents";
import { DeleteEventController } from "../../../interface-apdaters/controllers/users/EventsController/DeleteEventController";
import { GetEventDetails } from "../../../use-cases/user/Events/GetEventDetails";
import { GetEventDetailsController } from "../../../interface-apdaters/controllers/users/EventsController/GetEventDetailsController";
import { BookEventController } from "../../../interface-apdaters/controllers/users/EventsController/BookEventController";
import { BookEvent } from "../../../use-cases/user/Events/BookEvent";
import { BookingRepository } from "../../../interface-apdaters/repositories/User/BookingRepository";
import { WalletRepository } from "../../../interface-apdaters/repositories/User/WalletRepository";
import { GetUserWalletController } from "../../../interface-apdaters/controllers/users/Wallet/GetUserWalletController";
import { AddAmountToWalletController } from "../../../interface-apdaters/controllers/users/Wallet/AddAmountToWalletController";
import { GetUserWallet } from "../../../use-cases/user/Wallet/GetUserWallet";
import { AddAmountToWallet } from "../../../use-cases/user/Wallet/AddAmountToWallet";

const eventRepository = new EventRepository();
const walletRepository = new WalletRepository(); 
const bookingRepository = new BookingRepository();

const addEvent = new AddEvent(eventRepository);
const editEvent = new EditEvent(eventRepository);
const listEvents = new ListEvents(eventRepository);
const deleteEvent = new DeleteEvent(eventRepository);
const getEventDetails = new GetEventDetails(eventRepository);
const bookEvent = new BookEvent(bookingRepository, walletRepository); // Fixed missing argument

const addEventController = new AddEventController(addEvent);
const editEventController = new EditEventController(editEvent);
const listEventsController = new ListEventsController(listEvents);
const deleteEventController = new DeleteEventController(deleteEvent);
const getEventDetailsController = new GetEventDetailsController(
  getEventDetails
);
const bookEventController = new BookEventController(
  bookEvent,
  walletRepository
);

const getUserWallet = new GetUserWallet(walletRepository);
const addAmountToWallet = new AddAmountToWallet(walletRepository);

const getUserWalletController = new GetUserWalletController(getUserWallet);
const addAmountToWalletController = new AddAmountToWalletController(
  addAmountToWallet
);

export {
  addEventController,
  editEventController,
  listEventsController,
  deleteEventController,
  getEventDetailsController,
  bookEventController,
  getUserWalletController,
  addAmountToWalletController,
};
