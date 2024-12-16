import { useHotelsContext } from "../../contexts/HotelsProvider";
import Map from "../Map/Map";
import "./hotel-layout.css";
import { Outlet } from "react-router-dom";

function HotelLayout() {
  const { isLoading, hotels } = useHotelsContext();
  return (
    <div className="hotel-layout">
      <div className="hotel-layout__sidebar">
        <Outlet />
      </div>
      <div className="hotel-layout__main">
        <Map isLoading={isLoading} markerLocations={hotels} />
      </div>
    </div>
  );
}

export default HotelLayout;
