import "./hotels.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useHotelsContext } from "../../contexts/HotelsProvider";

function Hotels() {
  const { isLoading, hotels } = useHotelsContext();

  if (isLoading) return <Loader />;
  return (
    <div className="search-list">
      <h2>Search results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="search-item">
              <img
                className="search-item__img"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="search-item__desc">
                <p className="search-item__location">{item.smart_location}</p>
                <p className="search-item__name">{item.name}</p>
                <p className="search-item__price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
