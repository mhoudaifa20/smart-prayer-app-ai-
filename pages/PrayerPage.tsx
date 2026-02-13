import React, { useEffect, useState } from 'react';
import { MapPin, Bell, BellOff, Loader2 } from 'lucide-react';
import { Coordinates, PrayerTimings } from '../types';
import { fetchPrayerTimes } from '../services/prayerService';

export default function PrayerPage() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [locationName, setLocationName] = useState<string>("Locating...");
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [timeToNext, setTimeToNext] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationName("Current Location");
        },
        (error) => {
          console.error(error);
          setLocationName("Default: Makkah");
          setCoords({ latitude: 21.4225, longitude: 39.8262 }); // Default Makkah
        }
      );
    } else {
      setLocationName("Default: Makkah");
      setCoords({ latitude: 21.4225, longitude: 39.8262 });
    }
  }, []);

  useEffect(() => {
    if (coords) {
      setLoading(true);
      fetchPrayerTimes(coords, new Date()).then((data) => {
        setTimings(data);
        setLoading(false);
      });
    }
  }, [coords]);

  // Determine next prayer
  useEffect(() => {
    if (!timings) return;

    const now = new Date();
    const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let foundNext = false;

    for (const prayer of prayerOrder) {
      const timeStr = timings[prayer as keyof PrayerTimings];
      const [hours, minutes] = timeStr.split(':').map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(hours, minutes, 0, 0);

      if (prayerDate > now && prayer !== 'Sunrise') {
        setNextPrayer(prayer);
        foundNext = true;
        
        const diffMs = prayerDate.getTime() - now.getTime();
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        setTimeToNext(`${diffHrs}h ${diffMins}m`);
        break;
      }
    }

    if (!foundNext) {
      setNextPrayer("Fajr");
      setTimeToNext("Tomorrow");
    }

  }, [timings]);

  const PrayerRow = ({ name, time, isNext }: { name: string; time: string; isNext?: boolean }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl mb-3 transition-all ${
      isNext 
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 transform scale-[1.02]' 
        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${isNext ? 'bg-white' : 'bg-primary-500'}`}></div>
        <span className={`font-semibold ${isNext ? 'text-lg' : 'text-base'}`}>{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`font-mono ${isNext ? 'text-lg font-bold' : 'text-base'}`}>{time}</span>
        <button className={`p-1.5 rounded-full ${isNext ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
          <Bell size={16} />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="animate-spin text-primary-600" size={40} />
        <p className="text-gray-500">Calculating prayer times...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-500 rounded-2xl p-6 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 opacity-90 text-sm mb-1">
            <MapPin size={14} />
            <span>{locationName}</span>
          </div>
          <h2 className="text-3xl font-bold mt-2 mb-1">{nextPrayer}</h2>
          <p className="opacity-80">Next prayer in {timeToNext}</p>
        </div>
      </div>

      {/* Date */}
      <div className="mb-4 flex items-center justify-between px-1">
        <h3 className="font-bold text-gray-800 dark:text-gray-100">Today's Schedule</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      {/* List */}
      <div className="space-y-1">
        {timings && (
          <>
            <PrayerRow name="Fajr" time={timings.Fajr} isNext={nextPrayer === 'Fajr'} />
            <PrayerRow name="Sunrise" time={timings.Sunrise} />
            <PrayerRow name="Dhuhr" time={timings.Dhuhr} isNext={nextPrayer === 'Dhuhr'} />
            <PrayerRow name="Asr" time={timings.Asr} isNext={nextPrayer === 'Asr'} />
            <PrayerRow name="Maghrib" time={timings.Maghrib} isNext={nextPrayer === 'Maghrib'} />
            <PrayerRow name="Isha" time={timings.Isha} isNext={nextPrayer === 'Isha'} />
          </>
        )}
      </div>
    </div>
  );
}
