import React, { useEffect, useState } from 'react';
import { Compass, Navigation } from 'lucide-react';
import { Coordinates } from '../types';
import { getQiblaDirection } from '../services/prayerService';

export default function QiblaPage() {
  const [direction, setDirection] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // 1. Get Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          const qibla = getQiblaDirection({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
          });
          setDirection(qibla);
        },
        (err) => {
          setError("Please enable location to see Qibla direction.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    // 2. Listen to device orientation (Mobile Only)
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      const heading = (event as any).webkitCompassHeading || (360 - (event.alpha || 0));
      setDeviceHeading(heading);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Net rotation for the compass arrow to point to Qibla relative to device North
  // If we know device heading (N), and Qibla bearing (Q), the arrow should point to (Q - N)
  const arrowRotation = direction - deviceHeading;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold dark:text-white">Qibla Finder</h2>
        <p className="text-gray-500 text-sm">Align arrow to face Kaaba</p>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Static Compass Dial */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${-deviceHeading}deg)` }}
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 font-bold text-gray-400">N</div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-bold text-gray-400">S</div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold text-gray-400">W</div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold text-gray-400">E</div>
        </div>

        {/* Qibla Indicator Arrow */}
        <div 
          className="absolute w-full h-full flex justify-center items-center transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        >
           <div className="relative h-full w-8">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                 <Navigation size={40} className="fill-primary-600 text-primary-600" />
              </div>
              <div className="absolute top-0 left-1/2 h-1/2 w-0.5 bg-primary-600/20 -translate-x-1/2"></div>
           </div>
        </div>
        
        {/* Kaaba Icon Center */}
        <div className="z-10 bg-gray-900 dark:bg-black rounded-lg w-16 h-16 flex items-center justify-center shadow-lg border-2 border-primary-500">
          <div className="w-10 h-10 border border-gray-600 relative">
             <div className="absolute top-2 w-full h-0.5 bg-accent-400"></div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        {error ? (
          <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm">{error}</p>
        ) : (
          <div className="space-y-2">
             <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
               <span className="font-semibold">Qibla Angle:</span>
               <span>{Math.round(direction)}°</span>
             </div>
             {deviceHeading === 0 && (
               <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                 Device orientation not detected. Use manual compass.
               </p>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
