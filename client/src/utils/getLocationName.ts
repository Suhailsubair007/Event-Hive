export async function getLocationName(lat: number, lon: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch location");

      const data: { display_name?: string } = await response.json();
      return data.display_name || "Location not found";
  } catch (error) {
      console.error("Error fetching location:", error);
      return "Error fetching location";
  }
}