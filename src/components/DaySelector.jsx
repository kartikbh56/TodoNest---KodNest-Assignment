import { useContext } from "react";
import { DateContext } from "./context";

function DaySelector() {
  // retrieve the currentDate object and the dispatch function to update the currentDate
  const {
    day: { currentDate },
    dispatchDate,
  } = useContext(DateContext);

  // destructure dayString, monthString, date, and year returned from currentDate.toDateString()
  const [dayStr, monthStr, date, year] = new Date(currentDate).toDateString().split(" "); // "Thu Nov 28 2024" ->  ["Thu", "Nov", "28", "2024"]

  const handleNextDayClick = () => dispatchDate({ type: "nextDay" }); // jump to next day
  const handlePreviousDayClick = () => dispatchDate({ type: "previousDay" }); // jump to previous day

  return (
    <div className="day-selector">
      <button
        className="day-selector__button day-selector__button--prev"
        onClick={handlePreviousDayClick}
        title="Previous day"
      >
        {"<"}
      </button>
      <div className="day-selector__date">
        <span className={`date-format day-string`}>{dayStr}</span>
        <span className="date-format">{monthStr}</span>
        <span className="date-format">{date}</span>
        <span className="date-format">{year}</span>
      </div>
      <button
        className="day-selector__button day-selector__button--next"
        onClick={handleNextDayClick}
        title="Next day"
      >
        {">"}
      </button>
    </div>
  );
}

export default DaySelector;
