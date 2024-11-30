import Map from "../Map/Map";
import "./hotel-layout.css";
import { Outlet } from "react-router-dom";

function HotelLayout() {
  return (
    <div className="hotel-layout">
      <div className="hotel-layout__sidebar">
        <Outlet />
      </div>
      <div className="hotel-layout__map-container">
        <Map />
      </div>
    </div>
  );
}

export default HotelLayout;
