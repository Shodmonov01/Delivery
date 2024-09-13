import { Link } from "react-router-dom";
import UserLayout from "../../components/layouts/UserLayout";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DropContext } from "../../context/DropdownContext";
import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
const Profile2 = ({setIsEmail}) => {
  const [t, i18n] = useTranslation("global");

  const { setUser, user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [lang, setLang] = useState("ru");
  const [postData, setPostData] = useState({
    address: user?.address || "",
    context: user?.context || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    id: Number,
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    pochta_index: user?.pochta_index || "",
    uidd: "",
    id_city: user?.id_city || "",
    street: user?.street || "",
    number: user?.number || "",
  });

  const { setDrop, drop } = useContext(DropContext);

  const getData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token ? (JSON.parse(token)) : ""}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/a_api/admin_panel/user_profiles_views/`,
      config
    );
    setUserData(data);

    // setDrop({...drop, })

    setUser({
      username: data?.username,
      id: data?.id,
      groups: data?.groups,
      email: data?.email,
      first_name: data?.first_name,
      last_name: data?.last_name,
      pochta_index: data?.pochta_index,
      phone: data?.phone,
      id_city: data?.id_city,
    });
    let user = {
      username: data?.username,
      id: data?.id,
      groups: data?.groups,
      email: data?.email,
      first_name: data?.first_name,
      last_name: data?.last_name,
      pochta_index: data?.pochta_index,
      phone: data?.phone,
      id_city: data?.id_city,
    };
    localStorage.setItem("user", JSON.stringify(user));
  };

  const submitData = async (e) => {
    e.preventDefault();
    localStorage.setItem("drop", JSON.stringify(postData));

    try {
      const data = await axios.put(
        `${BASE_URL}/a_api/admin_panel/user_pofile_update_views/${user?.id}/`,
        postData
      );
      setDrop({
        ...drop,
        email: postData.email,
        address: postData.address,
        first_name: postData.first_name,
        last_name: postData.last_name,
        pochta_index: postData.pochta_index,
        uidd: userData?.uidd,
        username: userData?.username,
        id: userData?.id,
      });
      getData();
      setIsEmail(false)
      toast.success("Success");
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChangeLanguage = () => {
    i18n.changeLanguage(lang);
    localStorage.setItem("user_lang", lang);
  };

  useEffect(() => {
    handleChangeLanguage();
  }, [lang]);

  return (
    <div className="bg-modalBg w-full fixed top-0 left-0 h-screen flex justify-center items-center z-[99999]">
      <div className="relative min-h-[60vh] mt-6 w-[98%] sm:w-[80%] h-[90%] flex justify-center">
        <div className="bg-white relative shadow-xl border mb-12 rounded-md w-[95%] md:w-[89%] p-8 overflow-y-auto">
          
          <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setIsEmail(prev => !prev)}>
             <CloseIcon />   
          </div>

          <p className="text-[20px] text-center md:text-[28px] lg:text-[40px] lg:font-semibold text-[#2F2E40CC]">
            Заполните свой профиль сейчас
          </p>
          <p className="mt-1 sm:flex hidden text-[15px] font-normal sm:font-medium md:font-semibold text-[#2F2E40CC]">
            Здесь вы можете проверить и исправить свои личные данные.
            Пожалуйста, обратите внимание, что предоставление актуальной
            информации является обязательным для использования UK2EU.
          </p>

          <form onSubmit={submitData}>
            <div className="w-[100%] mt-8 mb-4 sm:mb-0 flex flex-col">
              <p className="mb-2 text-[#344054] font-medium">Имя и фамилия </p>
              <div className="flex md:flex-row flex-col md:justify-between gap-y-4">
                <input
                  type="text"
                  className="border w-[100%] py-2 md:w-[49%] rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Имя"}
                  name="first_name"
                  value={postData.first_name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="border w-[100%] py-2 md:w-[49%] rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"фамилия"}
                  name="last_name"
                  value={postData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="w-[100%] mt-4 mb-4 sm:mb-0 flex flex-col gap-y-4 md:flex-row justify-between">
              <div className="md:w-[49%] w-full">
                <p className="mb-2 text-[#344054] font-medium">
                  Электронная почта
                </p>
                <input
                  type="text"
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"alexander111@gmail.com"}
                  name="email"
                  value={postData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="md:w-[49%] w-full">
                <p className="mb-2 text-[#344054] font-medium">Город</p>
                <input
                  type="text"
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Город"}
                  name="id_city"
                  value={postData.id_city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="w-[100%] mt-4 mb-4 sm:mb-0 flex flex-col">
              <div className="flex md:flex-row flex-col items-center justify-between gap-y-4">
                <div className="md:w-[49%] w-full">
                  <p className="mb-2 text-[#344054] font-medium">Страна</p>
                  <input
                    type="text"
                    value={postData?.address}
                    name="address"
                    onChange={handleInputChange}
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                    placeholder={"Страна"}
                  />
                </div>
                <div className="md:w-[49%] w-full">
                  <p className="mb-2 text-[#344054] font-medium">Телефон</p>
                  <input
                    type="tel"
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                    placeholder={"Телефон"}
                    name="phone"
                    value={postData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-[100%] mt-4 mb-4 sm:mb-0 flex flex-col">
              <p className="mb-2 text-[#344054] font-medium">Язык</p>
              <select
                onChange={(e) => setLang(e.target.value)}
                className="border w-[100%] py-2 rounded-md text-[#667085] bg-white text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              >
                <option disabled>Язык</option>
                <option value="ru">Russian</option>
                <option value="gl">Netherlands</option>
                <option value="fr">France</option>
                <option value="en">England</option>
              </select>
            </div>

            <div className="flex w-full justify-between md:flex-row flex-col gap-y-4">
              <div className="w-[100%] md:w-[68%] md:mt-4 md:mb-4 sm:mb-0 flex flex-col">
                <p className="mb-2 text-[#344054] font-medium">Улица</p>
                <input
                  type="text"
                  name="street"
                  value={postData.street}
                  onChange={handleInputChange}
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Улица"}
                />
              </div>

              <div className="w-[100%] md:w-[30%] md:mt-4 mb-4 sm:mb-0 flex flex-col">
                <p className="mb-2 text-[#344054] font-medium">Номер</p>
                <input
                  type="text"
                  value={postData.number}
                  name="number"
                  onChange={handleInputChange}
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Номер"}
                />
              </div>
            </div>

            <div className="flex w-full justify-between md:flex-row flex-col gap-y-4">
              <div className="w-[100%] md:w-[30%] md:mt-4 md:mb-4 sm:mb-0 flex flex-col">
                <p className="mb-2 text-[#344054] font-medium">
                  Почтовый индекс
                </p>
                <input
                  type="text"
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Почтовый индекс"}
                  name="pochta_index"
                  value={postData.pochta_index}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="w-[100%] md:w-[68%] md:mt-4 md:mb-4 sm:mb-0 flex flex-col">
                <p className="mb-2 text-[#344054] font-medium">Примечания</p>
                <input
                  type="text"
                  value={postData?.context}
                  name="context"
                  onChange={handleInputChange}
                  className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  placeholder={"Примечания"}
                />
              </div>
            </div>

            <div className="w-full inline-flex justify-center mt-8">
              <button
                type="submit"
                className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  text-white flex items-center py-2 justify-around sm:py-4 px-1 sm:px-4 rounded-lg"
              >
                <p className="flex font-montserrat text-[15px] px-4 sm:text-[17px] md:text-[20px]">
                  <p>Сохранить изменения</p>
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile2;
