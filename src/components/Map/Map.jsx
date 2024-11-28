import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotelsContext } from "../../contexts/HotelsProvider";
import Loader from "../Loader/Loader";
import "./map.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const { isLoading, hotels } = useHotelsContext();
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(12);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingGeoPosition,
    position: geoLocationPosition,
    getPosition: getGeoPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
      setZoom(12);
    } else {
      setMapCenter(calcHotelsAveragePosition(hotels));
      setZoom(5);
    }
  }, [hotels, lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  const handelGeoPosition = () => {
    getGeoPosition();
    setZoom(12);
  };

  if (isLoading) return <Loader />;
  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <button onClick={handelGeoPosition} className="get-location">
          {isLoadingGeoPosition ? "Loading..." : "Use your location ?"}
        </button>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} zoom={zoom} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}

function calcHotelsAveragePosition(hotels) {
  if (!hotels.length) return [0, 0];

  const lat = hotels.map((hotel) => Number(hotel.latitude));
  const lng = hotels.map((hotel) => Number(hotel.longitude));
  const avgLat = lat.reduce((a, b) => a + b, 0) / lat.length;
  const avgLng = lng.reduce((a, b) => a + b, 0) / lng.length;

  return [avgLat, avgLng];
}

export default Map;
