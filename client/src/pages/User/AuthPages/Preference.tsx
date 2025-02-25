import { useState } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import type { LocationSearchResult } from "../../../types/Auth/UserPreferenceTYpe";
import {
  UpdatePreferencesData,
  updateUserPreferences,
} from "../../../services/Auth/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  "Music Concerts",
  "Sports Events",
  "Theater Performances",
  "Food Festivals",
  "Art Exhibitions",
  "Tech Conferences",
  "Fashion Shows",
  "Film Screenings",
  "Photography Exhibitions",
  "Gaming Tournaments",
  "Fitness Events",
  "Nature Walks",
  "Science Fairs",
  "History Tours",
  "Dance Performances",
  "Cooking Classes",
  "Workshops & Seminars",
  "Charity Events",
  "Nightlife & Parties",
  "Conventions & Expos",
];

const SAMPLE_LOCATIONS: LocationSearchResult[] = [
  { name: "New York, USA", latitude: 40.7128, longitude: -74.006 },
  { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
  { name: "Tokyo, Japan", latitude: 35.6762, longitude: 139.6503 },
];

export default function PreferencesPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResult | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const email = useSelector((state: any) => state?.user?.userInfo?.email);
  console.log("email", email);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedLocation({
          name: "Current Location",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  // Mutation for updating preferences
  const { mutate: updatePreferences } = useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      navigate("/landing");
      toast.success("Preferences updated successfully!");
    },
    onError: (error: any) => {
      toast.error("Error updating preferences. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (!selectedLocation || !email) return;

    const preferences: UpdatePreferencesData = {
      email: email,
      preferences: selectedPreferences,
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
    };

    updatePreferences(preferences);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <Card className="mx-auto max-w-5xl space-y-10 p-6 md:p-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font tracking-tight">
            Good job! You&apos;re just one step away
          </h1>
          <p className="text-muted-foreground">
            We want to serve you based on where you are located and what you
            like...
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select your location</h2>
          <div className="flex gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedLocation
                    ? selectedLocation.name
                    : "Select location..."}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search location..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {SAMPLE_LOCATIONS.map((location) => (
                        <CommandItem
                          key={location.name}
                          onSelect={() => {
                            setSelectedLocation(location);
                            setOpen(false);
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          {location.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              className="shrink-0"
              onClick={getCurrentLocation}
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Tell us about your interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <Button
                key={interest}
                variant="outline"
                className={cn(
                  "rounded-full",
                  selectedPreferences.includes(interest) &&
                    "bg-[#7848F4] text-white hover:bg-[#7848F4]/90"
                )}
                onClick={() => {
                  setSelectedPreferences((prev) =>
                    prev.includes(interest)
                      ? prev.filter((i) => i !== interest)
                      : [...prev, interest]
                  );
                }}
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <Button variant="ghost">Skip</Button>
          <Button
            className="bg-[#7848F4] hover:bg-[#7848F4]/90"
            onClick={handleSubmit}
            disabled={!selectedLocation || selectedPreferences.length === 0}
          >
            Finish up
          </Button>
        </div>
      </Card>
    </div>
  );
}
