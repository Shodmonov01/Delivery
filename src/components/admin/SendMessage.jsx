
import { Switch } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


const SendMessage = () => {
  const [isMessage, setIsMessage] = useState(true);
  const [isSend, setIsSend] = useState(false);
  const handleMessageClick = () => setIsMessage((prev) => !prev);
  const handleSendClick = () => setIsSend((prev) => !prev);

  return (
    <div className="bg-white p-6 flex flex-col">
      <div className="flex flex-col mb-5">
        <p className="font-normal md:font-medium py-2 lg:font-semibold text-[#000] text-[17px] md:text-[18px] lg:text-[20px]">
          Имя или номер отправителя
        </p>
        <select
          name=""
          id=""
          className="bg-white outline-0 border border-heroLight rounded-[5px] px-3 py-2"
        >
          <option
            value="+7(928)146-15-15"
            className="text-[15px] md:text-[17px] lg:text-[19px] text-lightGreey"
          >
            +7(928)146-15-15
          </option>
        </select>
      </div>

      <div className="flex flex-col">
        <p className="font-normal md:font-medium py-2 lg:font-semibold text-[#000] text-[17px] md:text-[18px] lg:text-[20px]">
          Текст SMS
        </p>
        <textarea className="outline-none border border-heroLight rounded-[5px] p-3 h-[133px]"></textarea>
      </div>

      <div className="flex flex-col">
        <p className="font-normal md:font-medium py-2 lg:font-semibold text-[#000] text-[17px] md:text-[18px] lg:text-[20px]">
          Номер получателя
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <select
            name=""
            id=""
            className="bg-white outline-0 border border-heroLight rounded-[5px] px-3 py-2"
          >
            <option
              value="+7(928)146-15-15"
              className="text-[15px] md:text-[17px] lg:text-[19px] text-lightGreey"
            >
              +7(928)146-15-15
            </option>
          </select>
          <input
            type="text"
            className="outline-none border border-heroLight px-3 rounded-[5px]"
          />
        </div>
      </div>

      <div className="flex items-center mt-8">
        <p className="font-normal md:font-medium py-2 lg:font-semibold text-[#000] text-[17px] md:text-[18px] lg:text-[20px] mr-5">
          Отправить SMS
        </p>
        <Switch checked={isMessage} onClick={handleMessageClick} />
        <p className="font-normal py-2  text-[#000] text-[17px] md:text-[18px] lg:text-[20px] mx-5">
          Немедленно
        </p>
        <Switch checked={isSend} onClick={handleSendClick} />
        <p className="font-normal py-2  text-[#000] text-[17px] md:text-[18px] lg:text-[20px] mr-5">
          Отложить
        </p>
      </div>

      <div className="flex justify-center items-center w-full mt-12">
      <Link to={'/chat'} className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  md:w-[30%] font-semibold text-white text-[18px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-1 sm:px-8 rounded-lg">
        Отправить SMS
      </Link>
      </div>
      <div className="flex justify-end items-center mt-12">
        <p className="text-Primary text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px]">Сбросить данные</p>
      </div>
    </div>
  );
};

export default SendMessage;
