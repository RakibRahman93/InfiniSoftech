
"use client";
import { useEffect, useState } from "react";

export default function ViewPDF() {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    // Extract the URL parameter from the query string
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    setPdfUrl(url);
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {pdfUrl ? (
        <iframe
          src={`${pdfUrl}#toolbar=0`} // Hide the toolbar
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
