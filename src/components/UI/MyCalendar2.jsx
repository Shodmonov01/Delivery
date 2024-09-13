import { useState } from "react";
import Calendar from "react-calendar";
import "./cal.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { BASE_URL } from "../../service/auth";

export default function MyCalendar2({setProg}) {
    const [filter, setFilter] = useState({end_d:"", start_d:""})
    const handleINputChange = e => {
        const {name, value} = e.target
        setFilter({...filter, [name]: value})
    }
    const clearData = () => setFilter({...filter, end_d:"", start_d:""})

    const filterHandler = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`${BASE_URL}/c_dashboard/delivery_filter_views/${filter.start_d}/${filter.end_d}/`)
            console.log(data)
            setProg(data)
        } catch (error) {
            console.log(error)
        }
    }
   
  return (
    <form onSubmit={filterHandler} className="flex flex-col space-y-4">
      <div>
        <input
        name="start_d"
          value={filter.start_d}
          onChange={handleINputChange}
          type="date"
          placeholder="Выберите дату"
          className="border w-[100%] py-2 rounded-md text-[#667085] font-montserrat text-[14px]  focus:outline-[#1348F9] px-6 font-medium"
        />
      </div>
      <div>
        <input
          name="end_d"
          value={filter.end_d}
          onChange={handleINputChange}
          type="date"
          placeholder="Выберите дату"
          className="border w-[100%] py-2 rounded-md text-[#667085] font-montserrat text-[14px]  focus:outline-[#1348F9] px-6 font-medium"
        />
      </div>

      <div className="flex md:flex-row flex-col justify-between md:space-x-4 space-y-2 md:space-y-0 items-center">
        <button type="button" onClick={clearData} style={{background:"rgba(231, 234, 238, 1)"}} className="w-full border font-medium text-[16px] text-lightGreey p-2 rounded-lg">Очистить</button>
        <button
        type="submit"
        className="border font-medium w-full text-[16px] flex items-center justify-center gap-2 text-white p-2 rounded-lg bg-Primary"
        >

          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.5203 0.258767C15.8376 0.592119 15.8246 1.1196 15.4912 1.43692L5.86162 10.6036C5.69717 10.7601 5.47597 10.8428 5.24916 10.8325C5.02236 10.8222 4.80958 10.7197 4.66003 10.5489L0.956328 6.31814C0.653177 5.97184 0.68815 5.44537 1.03444 5.14222C1.38073 4.83907 1.90721 4.87404 2.21036 5.22033L5.34178 8.79737L14.3421 0.229749C14.6755 -0.0875763 15.2029 -0.0745843 15.5203 0.258767Z"
              fill="white"
            />
          </svg>
          Показать
        </button>
      </div>
    </form>
  );
}
