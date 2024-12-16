import "./bookmarks.css";
import { useBookmarksContext } from "../../contexts/BookmarksProvider";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function Bookmarks() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarksContext();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (bookmarks.length === 0) return <p>No bookmarks yet</p>;
  return (
    <div className="bookmark-list">
      <h2 className="bookmark-list__title">Bookmark List</h2>
      {bookmarks.map((item) => {
        return (
          <Link
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            key={item.id}
          >
            <div
              className={`bookmark-item ${
                item.id === currentBookmark?.id ? "bookmark-item--current" : ""
              } `}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => handleDelete(e, item.id)}>
                <HiTrash className="trash" />
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default Bookmarks;
