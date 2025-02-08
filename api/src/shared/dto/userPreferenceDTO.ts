export interface UserPreferencesDTO {
    email: string;
    preferences: string[];
    location: {
      latitude: number;
      longitude: number;
    };
  }