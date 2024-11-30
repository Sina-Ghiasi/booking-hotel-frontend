import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./location-list.css";
function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:3001/hotels");
  if (isLoading) <p>Loading...</p>;

  return (
    <div className="nearby-locations">
      <h2>Nearby Locations</h2>
      <div className="location-list">
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div className="location-item" key={item.id}>
                <img
                  className="location-item__img"
                  src={item.picture_url.url}
                  alt={item.name}
                />
                <div className="location-item__desc">
                  <p className="location-item__location">
                    {item.smart_location}
                  </p>
                  <p className="location-item__name">{item.name}</p>
                  <p className="location-item__price">
                    €&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
