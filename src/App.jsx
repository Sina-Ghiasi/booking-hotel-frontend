import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import HotelLayout from "./components/HotelLayout/HotelLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./contexts/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<HotelLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
