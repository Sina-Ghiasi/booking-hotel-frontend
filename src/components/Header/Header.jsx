import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { MdLocationPin } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Header() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [guestOptionsToggle, setGuestOptionsToggle] = useState(false);
  const [guestOptions, setGuestOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [dateOption, setDateOption] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateOptionToggle, setDateOptionToggle] = useState(false);
  const navigate = useNavigate();

  const handleGuestOptions = (name, operation) => {
    setGuestOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      destination,
      date: JSON.stringify(dateOption?.[0]),
      guest: JSON.stringify(guestOptions),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="header-search">
        <div className="header-search__item">
          <MdLocationPin className="header-icon location-icon" />
          <input
            type="text"
            placeholder="Where to go?"
            className="header-search__input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="separator"></span>
        </div>
        <div className="header-search__item">
          <HiCalendar className="header-icon date-icon" />
          <div
            className="date-dropdown"
            id="date-range-option-dropdown"
            onClick={() => setDateOptionToggle((prev) => !prev)}
          >
            {`${format(dateOption[0].startDate, "MM/dd/yyyy")} to ${format(
              dateOption[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>

          {dateOptionToggle && (
            <DateRangeOption
              dateOption={dateOption}
              setDateOption={setDateOption}
              setDateOptionToggle={setDateOptionToggle}
            />
          )}
          <span className="separator"></span>
        </div>
        <div className="header-search__item">
          <div
            id="guest-options-drop-down"
            onClick={() => setGuestOptionsToggle((prevToggle) => !prevToggle)}
          >
            {guestOptions.adult} adult &bull; {guestOptions.children} children
            &bull; {guestOptions.room} room
          </div>
          {guestOptionsToggle && (
            <GuestOptions
              guestOptions={guestOptions}
              setGuestOptionsToggle={setGuestOptionsToggle}
              handleGuestOptions={handleGuestOptions}
            />
          )}
          <span className="separator"></span>
          <button className="header-search__btn" onClick={handleSearch}>
            <HiSearch className="header-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptions({
  guestOptions,
  handleGuestOptions,
  setGuestOptionsToggle,
}) {
  const guestOptionsRef = useRef();
  useOutsideClick(guestOptionsRef, "guest-options-drop-down", () =>
    setGuestOptionsToggle(false)
  );
  return (
    <div className="guest-options" ref={guestOptionsRef}>
      <GuestOptionsItem
        guestOptions={guestOptions}
        handleGuestOptions={handleGuestOptions}
        type="adult"
        minLimit={1}
      />
      <GuestOptionsItem
        guestOptions={guestOptions}
        handleGuestOptions={handleGuestOptions}
        type="children"
        minLimit={0}
      />
      <GuestOptionsItem
        guestOptions={guestOptions}
        handleGuestOptions={handleGuestOptions}
        type="room"
        minLimit={1}
      />
    </div>
  );
}

function GuestOptionsItem({
  guestOptions,
  handleGuestOptions,
  type,
  minLimit,
}) {
  return (
    <div className="guest-options__item">
      <div className="guest-options__item-text">{type}</div>
      <div className="guest-options__counter">
        <div className="guest-options__counter-btn">
          <button
            disabled={guestOptions[type] <= minLimit}
            onClick={() => handleGuestOptions(type, "dec")}
          >
            <HiMinus className="counter-icon" />
          </button>
        </div>
        <span>{guestOptions[type]}</span>
        <div className="guest-options__counter-btn">
          <button onClick={() => handleGuestOptions(type, "inc")}>
            <HiPlus className="counter-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DateRangeOption({ dateOption, setDateOption, setDateOptionToggle }) {
  const dateRangeOptionRef = useRef();
  useOutsideClick(dateRangeOptionRef, "date-range-option-dropdown", () =>
    setDateOptionToggle(false)
  );
  return (
    <div ref={dateRangeOptionRef} className="date-range-option-wrapper">
      <DateRange
        ranges={dateOption}
        minDate={new Date()}
        moveRangeOnFirstSelection={true}
        onChange={(item) => setDateOption([item.selection])}
      />
    </div>
  );
}
