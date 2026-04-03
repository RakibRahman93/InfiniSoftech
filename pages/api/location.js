// pages/api/location.js

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Local development and private-network requests cannot be geolocated reliably.
  // Default them to Bangladesh so pricing previews work as expected on localhost.
  if (
    !ip ||
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip.startsWith("::ffff:127.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  ) {
    return res.status(200).json({ country: "Bangladesh" });
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    if (data.status === 'fail') {
      return res.status(404).json({ error: 'Location not found' });
    } else {
      return res.status(200).json({ country: data.country });
    }
  } catch (error) {
    console.error('Error fetching from ip-api:', error);
    res.status(500).json({ error: 'Failed to fetch geolocation data' });
  }
}
