export interface UserPreferences {
    email: string
    preferences: string[]
    location: {
      latitude: number
      longitude: number
    }
  }
  
  export interface LocationSearchResult {
    name: string
    latitude: number
    longitude: number
  }
  
  