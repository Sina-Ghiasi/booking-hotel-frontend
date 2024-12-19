import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const HotelsContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("guest"))?.room;

  //current backend does not support date
  //const date = JSON.parse(searchParams.get("date"));

  const { isLoading, data: hotels } = useFetch(
    `${SERVER_BASE_URL}/hotels`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelsContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export function useHotelsContext() {
  return useContext(HotelsContext);
}
