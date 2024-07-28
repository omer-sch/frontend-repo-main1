import React, { useEffect, useState } from 'react';
import { getUserLocation } from '../../services/userlocation-service';
import GoogleMaps from './GoogleMaps';

const UserLocation: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const locationData = await getUserLocation(localStorage.getItem('userId') as string); // Fetch user location data from backend
        setUserLocation({ latitude: locationData.latitude, longitude: locationData.longitude });
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <div>
      <h2>User Location</h2>
      <GoogleMaps latitude={userLocation.latitude} longitude={userLocation.longitude} />
    </div>
  );
};

export default UserLocation;
