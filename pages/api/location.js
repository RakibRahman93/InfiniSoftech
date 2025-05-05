export default async function handler(req, res) {
    // Get the user's IP address (supports proxies, etc.)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     const ip = '103.247.100.100';  
// console.log('Request IP:', ip);
  
    try {
      // Fetch geolocation data from ip-api
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      console.log('ip-api response:', data);  
      // Check if ip-api was able to resolve the location
      if (data.status === 'fail') {
        return res.status(404).json({ error: 'Location not found' });
      } else {
        // Send the country code back to the frontend
        return res.status(200).json({ country: data.country });
      }
    } catch (error) {
      console.error('Error fetching from ip-api:', error);
      res.status(500).json({ error: 'Failed to fetch geolocation data' });
    }
  }
  