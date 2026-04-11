export const getCoordinatesFromGoogle = async (location) => {
    const API_KEY = "AIzaSyB_jPvLNk0zo1a--dgI4MZ4OtOZ19hXrDY"; // Replace with your API key
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${API_KEY}`
      );
      const data = await response.json();
  
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.log("Location not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  
  