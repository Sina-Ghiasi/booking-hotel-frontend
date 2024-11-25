import "./hotel-layout.css";
import { Outlet } from "react-router-dom";

function HotelLayout() {
  return (
    <div className="hotel-layout">
      <div className="hotel-layout__sidebar">
        <Outlet />
      </div>
      <div>map</div>
    </div>
  );
}

export default HotelLayout;
