import { Coordinates, PrayerTimings } from "../types";

// Fallback method using Aladhan API if we don't want to bundle a heavy calculation library
export const fetchPrayerTimes = async (coords: Coordinates, date: Date): Promise<PrayerTimings | null> => {
  try {
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${coords.latitude}&longitude=${coords.longitude}&method=2`; 
    // Method 2 is ISNA (North America), usually a safe default or configurable. 
    // For general purpose we can use 3 (Muslim World League) or others.
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.code === 200 && data.data && data.data.timings) {
      return data.data.timings;
    }
    return null;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
};

export const getQiblaDirection = (coords: Coordinates): number => {
  // Calculate Qibla direction (bearing to Mecca)
  const KAABA_LAT = 21.422487;
  const KAABA_LONG = 39.826206;

  const lat1 = coords.latitude * (Math.PI / 180);
  const long1 = coords.longitude * (Math.PI / 180);
  const lat2 = KAABA_LAT * (Math.PI / 180);
  const long2 = KAABA_LONG * (Math.PI / 180);

  const y = Math.sin(long2 - long1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(long2 - long1);
  
  let bearing = Math.atan2(y, x);
  bearing = bearing * (180 / Math.PI);
  
  return (bearing + 360) % 360;
};
