import { useNavigate, useParams } from "react-router-dom";
import { useBookmarksContext } from "../../contexts/BookmarksProvider";
import "./single-bookmark.css";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

function SingleBookmark() {
  const { id } = useParams();
  const { isLoading, getBookmark, currentBookmark } = useBookmarksContext();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id, getBookmark]);

  if (isLoading || !currentBookmark) return <Loader />;

  return (
    <div className="single-bookmark">
      <h2 className="single-bookmark__title">
        Country : {currentBookmark.country}
      </h2>
      <div className="single-bookmark__geo">
        Latitude : {currentBookmark.latitude}
        <br />
        Longitude : {currentBookmark.longitude}
      </div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
    </div>
  );
}
export default SingleBookmark;
