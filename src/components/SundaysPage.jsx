import React, { useState } from "react";
import {
  format,
  differenceInCalendarDays,
  isSunday,
  addDays,
  subYears,
} from "date-fns";

const SundaysPage = () => {
  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1);
  const maxYear = currentYear + 2;
  const tomorrow = addDays(new Date(), 1);
  const maxDate = addDays(tomorrow, 730);

  const [startDate, setStartDate] = useState(tomorrow);
  const [endDate, setEndDate] = useState(null);
  const [sundayDates, setSundayDates] = useState([]);
  const [sundayDates1, setSundayDates1] = useState([]);
  const [error, setError] = useState(null);

  const calculateSundays = (start, end) => {
    if (start && end) {
      // Check if the difference between start and end dates is approximately 1 year (365 days)
      const daysBetween = differenceInCalendarDays(end, start);

      if (daysBetween >= 730 || daysBetween >= 732) {
        const sundays = [];
        const sundays1 = [];
        for (let i = 0; i <= daysBetween; i++) {
          const currentDate = addDays(start, i);

          if (isSunday(currentDate) && currentDate.getDate() < 28) {
            sundays.push(currentDate);
          }

          if (isSunday(currentDate) && currentDate.getDate() > 28) {
            sundays1.push(currentDate);
          }
        }

        setSundayDates1(sundays1);
        setSundayDates(sundays);
        setError(null);
      } else {
        setError("Please choose dates that are 2 years apart.");
        setSundayDates([]);
        setSundayDates1([]);
      }
    } else {
      setError(null);
      setSundayDates([]);
      setSundayDates1([]);
    }
  };

  const handleCalculateClick = () => {
    calculateSundays(startDate, endDate);
  };

  return (
    <div className="mainDiv">
      <div className="container">
        <h1>Sundays Counter</h1>

        <div className="dateForm">
          <label>Start Date:</label>
          <input
            type="date"
            value={format(startDate, "yyyy-MM-dd")}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            min={format(tomorrow, "yyyy-MM-dd")}
            max={format(maxDate, "yyyy-MM-dd")}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            min={format(subYears(startDate, 1), "yyyy-MM-dd")}
            // max={format(maxDate, "yyyy-MM-dd")}
          />
          <button onClick={handleCalculateClick}>Calculate Sundays</button>
        </div>

        {error && <p>{error}</p>}
        <div className="result">
          <div className="sunday_test">
            {sundayDates.length > 0 && (
              <>
                <p>
                  Number of Sundays between the selected dates:{" "}
                  <span>{sundayDates.length}</span>
                </p>
                <p>Sunday Dates:</p>
                <div>
                  {sundayDates.map((date, indx) => (
                    <span key={date.toISOString()}>
                      {(indx ? ", " : "") + format(date, "yyyy-MM-dd")}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="sunday_test">
            {sundayDates1.length > 0 && (
              <>
                <p>
                  Number of Excluded Sundays between the selected dates:{" "}
                  <span>{sundayDates1.length}</span>
                </p>
                <p>Excluded Sunday Dates:</p>
                <div>
                  {sundayDates1.map((date, indx) => (
                    <span className="executed_dates" key={date.toISOString()}>
                      {(indx ? ", " : "") + format(date, "yyyy-MM-dd")}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SundaysPage;
