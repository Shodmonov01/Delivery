import axios from "axios";
import { useState, FormEvent } from "react";
import { BASE_URL } from "../../service/auth";

const AddDispatchComp = () => {
  const [data, setData] = useState({
    idd: "",
    first_name: "",
    last_name: "",
    phone: "+",
    subject: "Доставка",
    text: "Доставка",
    html: "",
    recipient_list: "",
  });

  const [pratsent, setPratsent] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendMailData = async (e) => {
    e.preventDefault();
    setData({ ...data, html: "Доставка " + pratsent + "%" });

    await axios.post(`${BASE_URL}/c_dashboard/send_email_API_views/`, data);
  };

  return (
    <form onSubmit={sendMailData} className="bg-white">
      <div className="my-4 mt-12 grid grid-cols-1 p-8 gap-x-8 gap-y-4">
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px] font-montserrat">
            Идентификатор грузоотправителей
          </p>
          <input
            name="idd"
            value={data.idd}
            onChange={handleInputChange}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Идентификатор грузополучателя"
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Имя
          </p>
          <input
            name="first_name"
            value={data.first_name}
            onChange={handleInputChange}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Имя"
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Фамилия
          </p>
          <input
            name="last_name"
            value={data.last_name}
            onChange={handleInputChange}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Фамилия "
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Телефон
          </p>
          <input
            name="phone"
            value={data.phone}
            onChange={handleInputChange}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Телефон"
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Электронная почта
          </p>
          <input
            name="recipient_list"
            value={data.recipient_list}
            onChange={handleInputChange}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Телефон"
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Ставка (%)
          </p>
          <input
            value={pratsent}
            onChange={(e) => setPratsent(e.target.value)}
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Ставка (%)"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          type="submit"
          className="bg-heroPrimary min-w-[300px] justify-center hover:bg-Primary transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center py-2 sm:py-3 px-1 sm:px-8 rounded-lg"
        >
          Создать отправку
        </button>
      </div>

      <div className="flex justify-end w-full my-9">
        <p className="font-medium text-[19px] text-Primary m-9">
          Сбросить данные
        </p>
      </div>
    </form>
  );
};

export default AddDispatchComp;
