"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FBPixelTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
     // console.log("FB Pixel: PageView triggered");
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
