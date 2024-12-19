import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const BookmarksContext = createContext();

const initialState = {
  bookmarks: [],
  currentBookmark: null,
  isLoading: false,
  error: null,
};

const bookmarksReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ),
        currentBookmark:
          state.currentBookmark.id === action.payload
            ? null
            : state.currentBookmark,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
};
function BookmarksProvider({ children }) {
  const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(
    bookmarksReducer,
    initialState
  );

  useEffect(() => {
    async function getBookmarks() {
      try {
        dispatch({ type: "loading" });
        const { data } = await axios.get(`${SERVER_BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        toast.error(err?.message);
        dispatch({ type: "rejected", payload: err?.message });
      }
    }
    getBookmarks();
  }, []);

  const getBookmark = useCallback(async (id) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${SERVER_BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (err) {
      toast.error(err?.message);
      dispatch({ type: "rejected", payload: err?.message });
    }
  }, []);

  const createBookmark = async (newBookmark) => {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/bookmarks`,
        newBookmark
      );
      dispatch({ type: "bookmark/created", payload: data });
    } catch (err) {
      toast.error(err?.message);
      dispatch({ type: "rejected", payload: err?.message });
    }
  };

  const deleteBookmark = async (id) => {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`${SERVER_BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (err) {
      toast.error(err?.message);
      dispatch({ type: "rejected", payload: err?.message });
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
