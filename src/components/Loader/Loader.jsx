import "./loader.css";
import { LoaderIcon } from "react-hot-toast";
function Loader() {
  return (
    <div className="loader">
      <p className="loader__text">Loading Data...</p>
      <LoaderIcon className="loader__icon" />
    </div>
  );
}

export default Loader;
