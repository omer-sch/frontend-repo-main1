import apiClient from './api-client';

// Define the base URL for the user location endpoints
const USER_LOCATION_BASE_URL = '/user-locations';

// Function to fetch user location data by user ID
export const getUserLocation = async (userId: string) => {
  try {
    const response = await apiClient.get(`${USER_LOCATION_BASE_URL}/${userId}`);
    return response.data; // Assuming the response contains user location data
  } catch (error) {
    throw new Error('Failed to fetch user location');
  }
};

// Function to update user location data
export const updateUserLocation = async (userId: string, locationData: { latitude: number; longitude: number }) => {
  try {
    const response = await apiClient.put(`${USER_LOCATION_BASE_URL}/${userId}`, locationData);
    return response.data; // Assuming the response contains updated user location data
  } catch (error) {
    throw new Error('Failed to update user location');
  }
};

// Function to delete user location data
export const deleteUserLocation = async (userId: string) => {
  try {
    const response = await apiClient.delete(`${USER_LOCATION_BASE_URL}/${userId}`);
    return response.data; // Assuming the response contains confirmation message
  } catch (error) {
    throw new Error('Failed to delete user location');
  }
};
