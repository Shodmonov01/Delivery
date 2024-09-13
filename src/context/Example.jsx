import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../service/auth";

const CustomDayCell = ({ day }) => {
  return <div className="react-calendar__day-cell">{day.getDate()}</div>;
};

function Example({setProg, setDate}) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date) => {
    if (!startDate || (startDate && endDate)) {
      setSelectedDates([date]);
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
      if (date < startDate) {
        setStartDate(date);
        setSelectedDates([date]);
      } else {
        setSelectedDates([startDate, date]);
      }
    }
  };



function getMonthName(monthNumber) {
  let monthName = "";

  switch (monthNumber) {
    case 'Jan':
      monthName = '01';
      break;
    case "Feb":
      monthName = '02';
      break;
    case "Mar":
      monthName = '03';
      break;
    case "Apr":
      monthName = '04';
      break;
    case "May":
      monthName = '05';
      break;
    case "Jun":
      monthName = '06';
      break;
    case "Jul":
      monthName = '07';
      break;
    case "Aug":
      monthName = '08';
      break;
    case "Sep":
      monthName = '09';
      break;
    case "Oct":
      monthName = '10';
      break;
    case "Nov":
      monthName = '11';
      break;
    case "Dec":
      monthName = '12';
      break;
    default:
      monthName = "Invalid Month";
  }

  return monthName;
}
  const submitHandler = async (e) => {
    e.preventDefault()
    selectedDates?.map(async c => {
      let res = moment(c[0]).format("YYYY-DD")
      let res2 = moment(c[1]).format("YYYY-DD")
      const options = { month: "long" };
      const a = new Intl.DateTimeFormat("en-US", options).format(c[0]);
      const a2 = new Intl.DateTimeFormat("en-US", options).format(c[1]);
      let b = a[0]+a[1]+a[2]
      let b2 = a2[0]+a2[1]+a2[2]
      let d = getMonthName(b)
      let d2 = getMonthName(b2)
      let last = res.split("-")[0]+"-"+d+"-"+res.split("-")[1]
      let last2 = res.split("-")[0]+"-"+d2+"-"+res2.split("-")[1]
      console.log(last)
      console.log(last2)
      const token = localStorage.getItem("token")
      const config = {headers: {Authorization: "Bearer " + JSON.parse(token) }}
      const {data} = await axios.get(`${BASE_URL}/c_dashboard/delivery_filter_views/${last}/${last2}/`, config)
      console.log(data)
      setProg(data)
  
    })
  }

  const isDateSelected = (date) => {
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  return (
    <div className="bg-white shadow-lg absolute p-3 md:p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
      <Calendar onChange={handleDateChange} value={selectedDates} selectRange  renderDayCell={CustomDayCell} />
      {/* <div>
        <h2>Tanlangan kunlar:</h2>
        <ul>
          {selectedDates.map((dateRange, index) => (
            <li key={index}>
              {dateRange[0].toDateString()} - {dateRange[1].toDateString()} 
              {isDateSelected(dateRange[0]) && <span style={{ color: 'blue' }}> (Tanlangan kunlar)</span>}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="flex gap-x-4 items-center justify-between mt-6">
        <button onClick={() => setDate(false)} style={{background:"rgba(231, 234, 238, 1)"}} className="text-[16px] py-2 rounded-lg text-center w-[48%] cursor-pointer md:text-[19px] text-lightGreey font-medium md:font-semibold">
          Очистить
        </button>
        <button
        style={{background: "rgba(19, 72, 249, 1)", color:"rgba(255, 255, 255, 1)"}}
          onClick={submitHandler}
          className="text-[16px] text-center w-[48%] py-2 rounded-lg cursor-pointer md:text-[19px] text-lightGreey font-medium md:font-semibold"
        >
          Показать
        </button>
      </div>
    </div>
  );
}

export default Example;
