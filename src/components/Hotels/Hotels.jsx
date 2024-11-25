import "./hotels.css";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("guest"))?.room;

  //current backend does not support date
  //const date = JSON.parse(searchParams.get("date"));

  const { isLoading, data } = useFetch(
    "http://localhost:3001/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) return <Loader />;
  return (
    <div className="search-list">
      <h2>Search results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="search_item">
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
