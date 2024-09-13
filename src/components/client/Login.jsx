import { Checkbox } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = ({ setIsLogin, setIsRegister, setIsForgotPassword }) => {
  const [checkedproccess, setCheckedProccess] = useState(false);
  const [t] = useTranslation("global");
  const [postData, setPostData] = useState({ username: "", password: "" });
  const handleClick = () => {
    setIsRegister(true);
    setIsLogin(false);
  };
  const handleForgotPassword = () => {
    setIsLogin(false);
    setIsForgotPassword(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/token/`, postData);
      localStorage.setItem("token", JSON.stringify(data?.access));
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      };
      console.log(config);
      const res = await axios.get(
        `${BASE_URL}/a_api/admin_panel/user_profiles_views/`,
        config
      );
      console.log(res.data);
      const isGrops = res?.data?.groups[0]?.name;
      if (isGrops === "admin") {
        localStorage.setItem("admin", data?.access);
        localStorage.setItem("Admin", JSON.stringify(postData));
        setIsLogin(false);
        setIsRegister(false);
        navigate("/admin");
        toast.success("Вы успешно вошли в");
      } else {
        let auth = {
          username: res?.data?.username,
          uidd: "",
          isUser: true,
          id: 0,
          adress: "",
          context: "",
          email: "",
          first_name: "",
          side: false,
          last_name: "",
          groups: res?.data?.groups,
        };
        localStorage.setItem("user", JSON.stringify(auth));
        setUser(auth);
        setIsLogin(false);
        setIsRegister(false);
        toast.success("Вы успешно вошли в");
      }
    } catch (error) {
      toast.error("Логин или пароль неверный");
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setIsLogin(false)}
      className="fixed top-0 left-0 flex justify-center items-center bg-modalBg z-[999] w-[100%] h-[100%]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] sm:w-[70%] lg:w-[36%] overflow-y-auto min-h-[50vh] bg-white flex flex-col p-3 sm:p-6 rounded-lg"
      >
        <form onSubmit={submitHandler}>
          <div className="flex w-[100%] justify-end">
            <div
              onClick={() => setIsLogin(false)}
              className="w-[12px] h-[12px] sm:w-[18.84px] sm:h-[18.84px] cursor-pointer"
            >
              <img
                src={"/clear.svg"}
                alt="clear"
                width={100}
                height={100}
                className="w-[100%] h-[100%]"
              />
            </div>
          </div>
          <div className="my-2 sm:my-4 flex items-center">
            <p className="font-semibold text-[16px] sm:text-[24px] md:text-[26px] lg:text-[30px] text-lightGreey font-montserrat">
              {t(`login.title`)}
            </p>
            <div className="flex items-center sm:mt-2">
              <p className="text-[14px] sm:text-[20px] ml-5 mr-2 font-montserrat">
                {t(`login.ask1`)}
              </p>
              <button
                onClick={handleClick}
                className="ml-1 text-[14px] sm:text-[20px] text-blue-400 font-montserrat"
              >
                {t(`login.res1`)}
              </button>
            </div>
          </div>
          <div className="mb-2 mt-2 sm:mt-3 sm:mb-3 flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              {t(`registration.ui1`)}
            </p>
            <input
              name="username"
              value={postData.username}
              onChange={handleInputChange}
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder={t(`registration.pl1`)}
              required
            />
          </div>

          <div className="mb-2 mt-2 sm:mt-3 sm:mb-3 flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              {t(`registration.ui2`)}
            </p>
            <input
              name="password"
              value={postData.password}
              onChange={handleInputChange}
              type="password"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder={t(`registration.pl2`)}
              required
            />
          </div>
          <button
            onClick={handleForgotPassword}
            className="text-Primary text-sm font-montserrat"
          >
            {t(`calsection.w4`)}
          </button>

          <div className="flex w-[100%] items-center">
            <div className="w-[10%]">
              <Checkbox
                checked={checkedproccess}
                onClick={() => setCheckedProccess((prev) => !prev)}
              />
            </div>
            <div className="w-[100%] sm:w-[66%]">
              <p className="ml-3 sm:ml-0 font-medium text-lightGreey text-[12px] sm:text-[17px]  font-montserrat">
                {t(`login.ask2`)}
              </p>
            </div>
          </div>

          <div className="w-[100%] flex justify-center mt-4">
            <button
              type="submit"
              className="md:mt-4 bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out text-white font-semibold text-[17px] sm:text-[18px] py-1 md:py-3 px-8 md:px-24 rounded-md"
            >
              {t(`login.btn`)}
            </button>
          </div>

          {/* <button
          type="button"
          onClick={handleForgotPassword}
          className="mt-4 text-[#23A879] text-[14px] font-montserrat"
        >
          {t(`login.forgot`)}
        </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
