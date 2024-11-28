import { useState } from "react";
import toast from "react-hot-toast";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});

  function getPosition() {
    if (!navigator.geolocation)
      return toast.error("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        toast.error(err?.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, getPosition };
}
