const ADPULSE_ENDPOINT =
  "https://insight-hub-infinisoft.lovable.app/api/track";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(ADPULSE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok && response.status !== 204) {
      const message = await response.text();
      console.error("AdPulse tracking failed:", response.status, message);
    }

    return res.status(204).end();
  } catch (error) {
    console.error("AdPulse tracking proxy error:", error);
    return res.status(204).end();
  }
}
