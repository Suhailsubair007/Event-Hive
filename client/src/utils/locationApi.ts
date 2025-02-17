// services/locationApi.ts

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY";
export const fetchLocationSuggestions = async (query: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === "OK") {
    return data.predictions.map((prediction: any) => ({
      name: prediction.description,
      latitude: null,  // Placeholder, will need another API call to fetch lat/long
      longitude: null, // Placeholder, will need another API call to fetch lat/long
    }));
  }
  throw new Error("Failed to fetch locations");
};

export const fetchLocationDetails = async (placeId: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === "OK") {
    const location = data.result.geometry.location;
    return {
      name: data.result.formatted_address,
      latitude: location.lat,
      longitude: location.lng,
    };
  }
  throw new Error("Failed to fetch location details");
};
