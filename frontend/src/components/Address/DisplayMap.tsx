import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { IconCar, IconCurrentLocation } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import classes from "./DisplayMap.module.css";

type MapPosition = { lat: number; lng: number };

type DisplayMapProps = {
  lat?: number;
  lng?: number;
  zoom?: number;
  height?: CSSProperties["height"];
  className?: string;
  marker?: "car" | "pin";
  markerContent?: ReactNode;
  showCurrentLocationButton?: boolean;
};

export const DisplayMap = ({
  lat,
  lng,
  zoom = 13,
  height = 500,
  className,
  marker = "pin",
  markerContent,
  showCurrentLocationButton = false,
}: DisplayMapProps) => {
  const position: MapPosition = { lat: lat ?? 40.7128, lng: lng ?? -74.006 };
  const [center, setCenter] = useState<MapPosition>(position);
  const hasReceivedLocation = useRef(false);
  const hasLocation = lat !== undefined && lng !== undefined;

  useEffect(() => {
    if (!hasLocation || hasReceivedLocation.current) return;

    setCenter(position);
    hasReceivedLocation.current = true;
  }, [hasLocation, position.lat, position.lng]);

  const centerOnCurrentLocation = () => {
    if (!hasLocation) return;
    setCenter(position);
  };

  return (
    <div className={`${classes.wrapper} ${className ?? ""}`} style={{ height }}>
      <Map
        center={center}
        defaultZoom={zoom}
        mapId={import.meta.env.VITE_MAP_ID}
        onCameraChanged={(event) => setCenter(event.detail.center)}
        style={{ height: "100%", width: "100%" }}
      >
        <AdvancedMarker position={position}>
          {markerContent ??
            (marker === "car" ? <CarMarker /> : <DefaultPin />)}
        </AdvancedMarker>
      </Map>

      {showCurrentLocationButton && (
        <button
          aria-label="Center map on your current location"
          className={classes.currentLocationButton}
          disabled={!hasLocation}
          onClick={centerOnCurrentLocation}
          title={
            hasLocation
              ? "Center map on your current location"
              : "Waiting for your location"
          }
          type="button"
        >
          <IconCurrentLocation size={20} />
        </button>
      )}
    </div>
  );
};

const DefaultPin = () => (
  <Pin background="#FBBC04" borderColor="#000" glyphColor="#000" />
);

const CarMarker = () => (
  <div className={classes.carMarker} aria-label="Your vehicle location">
    <IconCar aria-hidden size={22} stroke={2.2} />
  </div>
);
