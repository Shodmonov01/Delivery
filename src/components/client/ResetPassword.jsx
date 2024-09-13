import React, { useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { slug, id } = useParams();
  const [t] = useTranslation("global");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const submitHandler = async () => {
    try {
      if(password.length > 0 ) {
        const postData = {
            password,
            token: id,
            uidb64: slug,
          };
          const { data } = await axios.patch(
            `${BASE_URL}/a_api/admin_panel/verification/email`,
            postData
          );
          navigate('/')
          toast.success("Пароль изменен")
      } else {
        toast.error("Введите новый пароль")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RootLayout>
      <div className="w-full min-h-48 flex items-center justify-center">
        <div className="w-[95%] mx-auto md:w-[60%] xl:w-[30%] flex flex-col justify-center gap-y-6 my-16 md:my-[100px]">
          <p className="text-center font-raleway font-semibold text-2xl md:text-xl xl:text-4xl">
            {t(`calsection.res`)}
          </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
            placeholder={t(`calsection.res2`)}
          />
          <div className="w-[100%] flex justify-center">
            <button
              type="button"
              onClick={submitHandler}
              className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out text-white font-semibold text-[18px] py-1 md:py-3 px-8 md:px-24 rounded-md"
            >
              {t(`calsection.res`)}
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ResetPassword;
