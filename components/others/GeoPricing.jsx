"use client"
import { useEffect, useState } from 'react';

export default function GeoPricing() {
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // Fetch location data from the API route
    const fetchLocation = async () => {
      const res = await fetch('/api/location');  // Call the location API
      const data = await res.json();

      if (data.country === 'Bangladesh') {
        setPrice('100 BDT');
      } else {
        setPrice('2 USD');
      }

      setLocation(data);
    };

    fetchLocation();
  }, []);

  if (!location) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pricing Page</h1>
      <p>Your location: {location.country}</p>
      <p>Price: {price}</p>
    </div>
  );
}
