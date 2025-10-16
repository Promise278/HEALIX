"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing icons in Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper: recenter map when position updates
function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function UserLiveLocationMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device.");
      return;
    }

    // ✅ 1️⃣ Get the initial position once
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(pos.coords.accuracy);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location.");
      },
      {
        enableHighAccuracy: true, // ask for GPS/Wi-Fi
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // ✅ 2️⃣ Then start watching in real time
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(pos.coords.accuracy);
      },
      (err) => {
        console.error(err);
        setError("Please enable location permission to view your position.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Cleanup watcher on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="w-full h-[500px] border border-gray-300 rounded-xl overflow-hidden shadow-md relative">
      <MapContainer
        center={position || [0, 0]}
        zoom={15}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {position && (
          <>
            <RecenterAutomatically lat={position[0]} lng={position[1]} />
            <Marker position={position}></Marker>
            <Circle
              center={position}
              radius={accuracy}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.2,
              }}
            />
          </>
        )}
      </MapContainer>

      {!position && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-gray-600">
          {error || "Locating you... 🛰"}
        </div>
      )}
    </div>
  );
}
