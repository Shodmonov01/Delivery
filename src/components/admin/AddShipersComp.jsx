import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../service/auth";
import toast from 'react-hot-toast';

const AddShippersComp = () => {
  const [postData, setPostData] = useState({
    address: "",
    context: "",
    date: "",
    email: "",
    full_name: "",
    // id: 1,
    id_country: 0,
    id_city: 0,
    id_group: 1,
    phone: "",
    pochta_index: Number,
    // uidd: "",
  });

  const [country_list, setCountryList] = useState([]);
  const [city_list, setCityList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // get country lists
  const getCountryLists = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/a_api/admin_panel/counrty_list_views/`
    );
    setCountryList(data);
  };
const token = localStorage.getItem("token")
      const config = {headers: {Authorization: "Bearer " + (token) }}
  // get city lists
  const getCityLists = async () => {
    const token = localStorage.getItem("token")
      const config = {headers: {Authorization: "Bearer " + (token) }}
    if (postData.id_country > 0) {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/city_list_views/${postData.id_country}/`, config
      );
      setCityList(data);
    }
  };
  useEffect(() => {
    getCityLists();
  }, [postData.id_country]);

  useEffect(() => {
    getCountryLists();
  }, []);

  // const handleIdCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPostData({
  //     ...postData,
  //     id_country: {
  //       ...postData.id_country,
  //       id: parseInt(e.target.value),
  //     },
  //   });
  // };

  // const handleIdCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPostData({
  //     ...postData,
  //     id_city: {
  //       ...postData.id_city,
  //       id: parseInt(e.target.value),
  //     },
  //   });
  // };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BASE_URL}/c_dashboard/employe_list_views/`, postData)
      toast.success("Success")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={submitHandler} className="bg-white">
      <div className="my-4 mt-12 grid grid-cols-1 p-8 gap-x-8 gap-y-4">
        {/* <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px] font-montserrat">
            Идентификатор грузоотправителей
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Идентификатор грузополучателя"
            name="uidd"
            value={postData.uidd}
            onChange={handleInputChange}
            required
          />
        </div> */}
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Имя
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Имя"
            name="full_name"
            value={postData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Адрес
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Адрес "
            name="address"
            value={postData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
            <div className="flex flex-col gap-x-2">
              <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
                Страна
              </p>
              <select
                onChange={(e) =>
                  setPostData({...postData, id_country: parseInt(e.target.value)})
                }
                name=""
                id=""
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              >
                <option value="null">Страна</option>
                {country_list?.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-x-2">
              <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
                Город
              </p>
              <select
               onChange={(e) =>
                setPostData({...postData, id_city: parseInt(e.target.value)})
              }
                name=""
                id=""
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              >
                <option value="null">Город</option>
                {city_list?.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Почтовый индекс
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Почтовый индекс"
            name="pochta_index"
            // value={postData.pochta_index}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              Страна
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Страна"
            />
          </div> */}
        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Телефон
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Телефон"
            name="phone"
            value={postData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Электронная почта
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Телефон"
            name="email"
            value={postData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Примечания
          </p>
          <input
            type="text"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder="Введите Телефон"
            name="context"
            value={postData.context}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <button type="submit" className="bg-heroPrimary min-w-[300px] justify-center hover:bg-Primary transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center py-2 sm:py-3 px-1 sm:px-8 rounded-lg">
          Добавить грузоотправителей
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

export default AddShippersComp;
