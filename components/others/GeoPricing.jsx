"use client";
import { useLocation } from "@/context/LocationContext"; 

export default function GeoPricing() {
  const { location, pricing } = useLocation();
  // Handle loading state when data is still null or being fetched
  if (!location || !pricing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Geo Pricing</h1>
     
      <p>Geo Price: {pricing.geoPrice}</p> 
    </div>
  );
}
