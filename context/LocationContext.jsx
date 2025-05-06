"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the Location Context
const LocationContext = createContext(null); // Initialize context with null

// Custom hook to use the Location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

// Pricing data for Geo and Hero categories
const pricingData = {
  GeoPriceCategory: {
    Bangladesh: {
      geoPrice: "100 BDT",
    },
    USA: {
      geoPrice: "2 USD",
    },
  },
  HeroCategory: {
    Bangladesh: {
      heroPrice: "BDT 2,500",
    },
    USA: {
      heroPrice: "$399",
    },
  },
};

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Initialize with null
  const [pricing, setPricing] = useState(null); // Initialize with null

  // Fetch location based on IP address
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("/api/location");  // Fetch the location API
        const data = await res.json();
        setLocation(data);  // Set the location based on the API response

        const country = data.country || "USA";  // Default to USA if country is undefined

        // Determine pricing based on country
        const geoPrices = pricingData.GeoPriceCategory[country] || pricingData.GeoPriceCategory["USA"];
        const heroPrices = pricingData.HeroCategory[country] || pricingData.HeroCategory["USA"];

        setPricing({
          geoPrice: geoPrices.geoPrice,
          heroPrice: heroPrices.heroPrice,
        });
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();  // Fetch location data on component mount
  }, []);

  return (
    <LocationContext.Provider value={{ location, pricing }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;

