import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "./map.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { HiBookmark } from "react-icons/hi";

function Map({ markerLocations, currentLocation }) {
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
      setZoom(8);
    } else if (currentLocation) {
      setMapCenter(currentLocation);
      setZoom(5);
    } else {
      setMapCenter(calcHotelsAveragePosition(markerLocations));
      setZoom(5);
    }
  }, [markerLocations, currentLocation, lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  const handelGeoPosition = () => {
    getGeoPosition();
    setZoom(12);
  };

  return (
    <div className="map">
      <Link to="/bookmarks" className="map__bookmarks">
        <HiBookmark className="map__bookmark-icon" /> Your bookmarks
      </Link>
      <button onClick={handelGeoPosition} className="map__get-location">
        {isLoadingGeoPosition ? "Loading..." : "Use your location ?"}
      </button>
      <MapContainer
        className="map__container"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickDetector />
        <ChangeCenter position={mapCenter} zoom={zoom} />
        {markerLocations.map((item) => (
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

function ClickDetector() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

function calcHotelsAveragePosition(markerLocations) {
  if (!markerLocations.length) return [0, 0];

  const lat = markerLocations.map((item) => Number(item.latitude));
  const lng = markerLocations.map((item) => Number(item.longitude));
  const avgLat = lat.reduce((a, b) => a + b, 0) / lat.length;
  const avgLng = lng.reduce((a, b) => a + b, 0) / lng.length;

  return [avgLat, avgLng];
}

export default Map;
