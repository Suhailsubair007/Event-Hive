"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import type { Location } from "../../types/Event-type"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin } from "lucide-react"

interface MapPickerProps {
  location: Location
  onLocationChange: (location: Location) => void
}

export function MapPicker({ location, onLocationChange }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [marker, setMarker] = useState<L.Marker | null>(null)
  const [address, setAddress] = useState(location.address || "")

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      // Fix Leaflet icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })

      const initialMap = L.map(mapRef.current).setView([location.latitude, location.longitude], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(initialMap)

      const initialMarker = L.marker([location.latitude, location.longitude], {
        draggable: true,
      }).addTo(initialMap)

      // Handle marker drag
      initialMarker.on("dragend", (e) => {
        const marker = e.target
        const position = marker.getLatLng()

        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`)
          .then((response) => response.json())
          .then((data) => {
            const newAddress = data.display_name || ""
            setAddress(newAddress)
            onLocationChange({
              latitude: position.lat,
              longitude: position.lng,
              address: newAddress,
            })
          })
          .catch(() => {
            // If geocoding fails, just update coordinates
            onLocationChange({
              latitude: position.lat,
              longitude: position.lng,
              address,
            })
          })
      })

      // Handle map click
      initialMap.on("click", (e) => {
        const { lat, lng } = e.latlng

        if (initialMarker) {
          initialMarker.setLatLng([lat, lng])
        }

        // Reverse geocode to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then((response) => response.json())
          .then((data) => {
            const newAddress = data.display_name || ""
            setAddress(newAddress)
            onLocationChange({
              latitude: lat,
              longitude: lng,
              address: newAddress,
            })
          })
          .catch(() => {
            // If geocoding fails, just update coordinates
            onLocationChange({
              latitude: lat,
              longitude: lng,
              address,
            })
          })
      })

      setMap(initialMap)
      setMarker(initialMarker)
    }
  }, [map, location.latitude, location.longitude, address, onLocationChange])

  // Update marker position when location changes externally
  useEffect(() => {
    if (
      map &&
      marker &&
      (marker.getLatLng().lat !== location.latitude || marker.getLatLng().lng !== location.longitude)
    ) {
      marker.setLatLng([location.latitude, location.longitude])
      map.setView([location.latitude, location.longitude], map.getZoom())
      setAddress(location.address)
    }
  }, [map, marker, location])

  // Handle address input change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  // Geocode address to coordinates
  const handleAddressBlur = () => {
    if (address && address !== location.address) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0]

            if (map && marker) {
              marker.setLatLng([lat, lon])
              map.setView([lat, lon], 13)
            }

            onLocationChange({
              latitude: Number.parseFloat(lat),
              longitude: Number.parseFloat(lon),
              address,
            })
          }
        })
        .catch((error) => {
          console.error("Error geocoding address:", error)
        })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-[#7848F4]" />
        <Label htmlFor="address">Address</Label>
      </div>

      <Input
        id="address"
        value={address}
        onChange={handleAddressChange}
        onBlur={handleAddressBlur}
        placeholder="Enter location address"
        className="mb-4"
      />

      <div ref={mapRef} className="h-[300px] w-full rounded-md border border-input overflow-hidden"></div>
    </div>
  )
}

