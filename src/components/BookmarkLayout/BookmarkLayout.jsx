import { Outlet } from "react-router-dom";
import "./bookmark-layout.css";
import Map from "../Map/Map";
import { useBookmarksContext } from "../../contexts/BookmarksProvider";

function BookmarkLayout() {
  const { bookmarks, currentBookmark } = useBookmarksContext();

  return (
    <div className="bookmark-layout">
      <div className="bookmark-layout__sidebar">
        <Outlet />
      </div>
      <div className="bookmark-layout__main">
        <Map
          markerLocations={bookmarks}
          currentLocation={
            currentBookmark
              ? [currentBookmark.latitude, currentBookmark.longitude]
              : null
          }
        />
      </div>
    </div>
  );
}
export default BookmarkLayout;
