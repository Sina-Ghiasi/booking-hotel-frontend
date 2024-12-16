import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3001";

const BookmarksContext = createContext();
function BookmarksProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  useEffect(() => {
    async function getBookmarks() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (err) {
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    getBookmarks();
  }, []);

  const getBookmark = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBookmark = async (newBookmark) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      setBookmarks((prev) => [...prev, data]);
      setCurrentBookmark(data);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBookmark = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;

export function useBookmarksContext() {
  return useContext(BookmarksContext);
}
