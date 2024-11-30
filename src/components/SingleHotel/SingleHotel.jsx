import { useParams } from "react-router-dom";
import "./single-hotel.css";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:3001/hotels/${id}`);

  if (isLoading) return <Loader />;
  return (
    <div className="room">
      <div className="room-detail">
        <img
          className="room-detail__img"
          src={data.xl_picture_url}
          alt={data.name}
        />
        <h2 className="room-detail__title">{data.name}</h2>
        <h3 className="room-detail__sub-title">
          {data.number_of_reviews} reviews
          {Number(data.number_of_reviews) === 0
            ? ""
            : ` with ${data.review_scores_rating}/100 rating `}
          &nbsp;&bull; {data.smart_location}
        </h3>
        <div className="room-detail__desc">{data.description}</div>
      </div>
    </div>
  );
}
export default SingleHotel;
