import { useNavigate, useSearchParams } from "react-router-dom";
import "./add-new-bookmark.css";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import toast from "react-hot-toast";
import { useBookmarksContext } from "../../contexts/BookmarksProvider";

function AddNewBookmark() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createBookmark } = useBookmarksContext();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { isLoading, data } = useFetch(
    "https://api-bdc.net/data/reverse-geocode-client",
    `latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );

  useEffect(() => {
    if (data.length === 0) return;
    if (!data.countryCode) {
      toast("Location is not in a country! Please click somewhere else.", {
        icon: "⚠️",
      });
    }
    setCity(data.city || data.locality || "");
    setCountry(data.countryName);
    setCountryCode(data.countryCode);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !country || !countryCode) return;

    const newBookmark = {
      latitude: lat,
      longitude: lng,
      host_location: `${city}, ${country}`,
      cityName: city,
      country,
      countryCode,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoading) return <Loader />;
  return (
    <div className="add-new-bookmark">
      <h2 className="add-new-bookmark__title">Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form__control">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="form__buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}
export default AddNewBookmark;
