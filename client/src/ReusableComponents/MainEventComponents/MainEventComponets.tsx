import type React from "react";
import { useState, useEffect } from "react";
import {
  Facebook,
  Linkedin,
  MapPin,
  Music,
  Twitter,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { getEventDetails, EventData } from "../../services/User/eventService";
import { useNavigate } from 'react-router-dom';

// Function to truncate text
const truncateText = (text: string, maxLength = 200) => {
  const words = text.split(" ");
  if (words.length <= maxLength) return text;
  return words.slice(0, maxLength).join(" ") + "...";
};

// Function to open Google Maps with coordinates
const openGoogleMaps = (lat: number, lng: number) => {
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
};

// Function to share on social media
const shareEvent = (platform: string, eventData: EventData) => {
  const url = window.location.href;
  const text = `Check out this event: ${eventData.title}`;

  switch (platform) {
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
      break;
    case "whatsapp":
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          text + " " + url
        )}`,
        "_blank"
      );
      break;
    case "linkedin":
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
      break;
    case "twitter":
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
      break;
    default:
      break;
  }
};

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const eventData = await getEventDetails(eventId);
          setEvent(eventData);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch event details");
          setLoading(false);
        }
      } else {
        console.log("No event ID provided in URL");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !event) {
    return <div>{error || "Event not found"}</div>;
  }

  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    event.longitude - 0.002 // Longitude first in the min corner
  },${
    event.latitude - 0.002 // Latitude second in the min corner
  },${
    event.longitude + 0.002 // Longitude first in the max corner
  },${
    event.latitude + 0.002 // Latitude second in the max corner
  }&layer=mapnik&marker=${event.latitude},${event.longitude}`;
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Banner Section */}
        <div className="md:col-span-7 relative">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 left-4 z-10 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <img
              src={event.bannerImage || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
              <h1 className="text-3xl md:text-2xl font-bold text-white mb-1">
                {event.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-white mb-4">
                {event.subtitle}
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="w-fit bg-transparent text-white border-white hover:bg-transparent hover:text-white"
                onClick={() => openGoogleMaps(event.latitude, event.longitude)}
              >
                <MapPin className="h-4 w-4 mr-1" /> View map
              </Button>
            </div>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="md:col-span-5">
          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">{event.title}</h3>
              <div className="flex items-center mb-3">
                <Music className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">{event.category}</span>
              </div>
              <div className="flex items-center mb-3">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {event.date} | {event.time}
                </span>
              </div>
              <div className="flex items-center mb-5">
                <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{event.location}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">Starts from</p>
                  <p className="text-lg font-bold">{event.price}</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                  BOOK TICKETS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        <div className="md:col-span-7">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <div className="text-gray-700">
            <p>
              {isDescriptionExpanded
                ? event.description
                : truncateText(event.description, 40)}
            </p>
            {event.description.split(" ").length > 40 && (
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? "Show less" : "Read more"}
              </Button>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Hosted By</h3>
            <p className="text-gray-700">{event.hostedBy}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Event Attendee Live Chat: Connect & Engage
            </h3>
            <p className="text-gray-700">
              Enhance your event experience with our Attendee Live Chat feature!
              Once you book a ticket for an event, you gain access to an
              exclusive chatroom where you can interact with other attendees
              before, during, and after the event.
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <h3 className="text-xl font-bold mb-4">Event location</h3>
          <div className="h-[250px] bg-gray-100 rounded-lg overflow-hidden relative">
            <iframe
              src={osmUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none" />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="rounded-md">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Share with friends</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => shareEvent("facebook", event)}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => shareEvent("whatsapp", event)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-blue-700 text-blue-700 hover:bg-blue-50"
                onClick={() => shareEvent("linkedin", event)}
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 border-blue-400 text-blue-400 hover:bg-blue-50"
                onClick={() => shareEvent("twitter", event)}
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
