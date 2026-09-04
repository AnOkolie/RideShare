import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export const DisplayMap = () => {
  const defaultPosition = { lat: 40.7128, lng: -74.006 }; // New York City
  return (
    <>
      <Map
        defaultZoom={3}
        defaultCenter={defaultPosition}
        mapId={import.meta.env.VITE_MAP_ID} // Required for Advanced Markers
        style={{ width: "100%", height: "500px" }}
      >
        <AdvancedMarker position={defaultPosition}>
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      </Map>
    </>
  );
};
