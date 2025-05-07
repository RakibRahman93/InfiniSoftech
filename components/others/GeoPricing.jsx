"use client";
import { useLocation } from "@/context/LocationContext";

export default function GeoPricing() {
  const { location, pricing } = useLocation(null);

  return (
    <div>
      <h1>Geo Pricing</h1>

      <p>Geo Price: {pricing ? pricing.geoPrice : "Loading.."}</p>
    </div>
  );
}
