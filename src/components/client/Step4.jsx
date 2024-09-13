import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MapComponent from "./GoogleMap";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { ServiceContext } from "../../context/ServiceContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Profile2 from "./Profile2";
import FinishInput from "../UI/finish-input";
import { useCalc } from "../../hooks/useCalc";
import { useMediaQuery } from "usehooks-ts";

const Step4 = ({
  postData,
  setStep,
  step,
  category1,
  category2,
  servicePrice,
  price,
  price_za_km,
  homeData,
  setHomeData,
  isNext,
  setIsNext,
  isQuick,
}) => {
  const { price_km } = useCalc();
  console.log(price_km);
  const [t] = useTranslation("global");
  const form = useRef();
  const [allWeight, setAllWeight] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [context, setContext] = useState("");
  const [result, setResult] = useState(null);
  const [isEMail, setIsEmail] = useState(false);
  const navigate = useNavigate();
  const { location, setLocation } = useContext(ServiceContext);
  const { user } = useContext(AuthContext);
  const [euro, setEuro] = useState({ price: "", km: "" });
  const [isModal, setIsModal] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isActive, setIsActive] = useState(false);
  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const fetchData = useCallback(async () => {
    try {
      let a = 0;
      let count = 0;
      const res2 = await axios.get(
        `${BASE_URL}/a_api/admin_panel/serive_price/`
      );
      const res4 = await axios.get(`${BASE_URL}/a_api/admin_panel/kilomter/`);

      setEuro({
        ...euro,
        price: res2?.data[0]?.price,
        km: res4?.data[0]?.price,
      });
      postData?.product?.map((item, index) => {
        a += parseInt(item.weight) * parseInt(item?.count);
        count += parseInt(item?.count);
      });
      setAllWeight(a);
      setAllCount(count);
    } catch (error) {
      console.log(error);
    }
  }, [postData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const editRoute2 = () => {
    setStep((prev) => ({
      ...prev,
      step4: false,
      step1: false,
      step2: true,
      step3: false,
      active3: false,
      active2: false,
    }));
  };
  const editRoute3 = () => {
    if (isQuick) {
      navigate("/");
      setTimeout(() => {
        !isMobile
          ? window.scrollTo({ top: 2100 })
          : window.scrollTo({ top: 2400 });
      }, 1000);
    }
    setStep((prev) => ({
      ...prev,
      step4: false,
      step1: false,
      step2: false,
      step3: true,
      active3: false,
      active4: false,
    }));
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        homeData.street &&
        // homeData.house &&
        homeData.house_num &&
        homeData.street1 &&
        // homeData.house1 &&
        homeData.house_num1
      ) {
        let token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
          },
        };

        const user = await axios.get(
          `${BASE_URL}/a_api/admin_panel/user_profiles_views/`,
          config
        );
        if (user?.data?.email.length > 0) {
          finish();
        } else {
          toast.error("Введите свои личные данные для заказа");
          setIsEmail(true);
        }
      } else {
        toast.error("Введите адрес");
      }
    } catch (error) {
      toast.error("Пожалуйста, зарегистрируйтесь");
      console.log(error);
    }
  };

  const finish = async () => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + (token ? JSON.parse(token) : ""),
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/b_api/sayts/delivery_list_views/`,
        postData,
        config
      );
      setResult(data);

      postData?.product?.map((item, index) => {
        setContext(
          `${index + 1}) Ваш заказ: \n имя: ${item?.name}, \n высота: ${
            item?.height
          }, \n длина: ${item?.length}, \n вес: ${item?.weight}, \n ширина: ${
            item?.width
          } \n цена: ${String(result?.price)} \n ---------- \n`
        );
      });

      toast.success(t(`спасибо за заявку, в ближайшее время свяжемся с вами`));
      setStep({
        ...step,
        active4: true,
      });
      navigate("/thank-you");
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_ovt2v6r",
        "template_m1l7k5l",
        form.current,
        "K8gC84NVYlkyMzioU"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="sm:mt-12 relative">
      {/* Modal Section */}
      {isModal && (
        <div className="fixed top-0 left-0 h-screen w-full bg-modalBg z-50 flex items-center justify-center">
          <div className="w-[96%] sm:w-[94%] md:w-[40%] mx-auto bg-white min-h-[30vh] rounded-md p-4">
            <form className="flex flex-col gap-y-4">
              {/* clear button */}
              <div className="flex w-[100%] justify-end">
                <div
                  onClick={() => setIsModal(false)}
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
              <p className="mb-2 font-normal text-[18px] sm:text-[22px] text-lightGreey">
                {t(`sto.st14`)}
              </p>

              <FinishInput
                state={homeData}
                setState={setHomeData}
                name="street1"
                pl={t(`calc3.a1`)}
              />
              {/* <input
                value={homeData.house1}
                onChange={(e) =>
                  setHomeData({ ...homeData, house1: e.target.value })
                }
                type="text"
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                placeholder={t(`calc3.a2`)}
                required
              /> */}
              <input
                value={homeData.house_num1}
                onChange={(e) =>
                  setHomeData({ ...homeData, house_num1: e.target.value })
                }
                type="text"
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                placeholder={t(`calc3.a3`)}
                required
              />
              <p className="mb-2 font-normal text-[18px] sm:text-[22px] text-lightGreey">
                {t(`sto.st15`)}
              </p>
              <FinishInput
                state={homeData}
                setState={setHomeData}
                name="street"
                pl={t(`calc3.a1`)}
              />

              {/* <input
                value={homeData.house}
                onChange={(e) =>
                  setHomeData({ ...homeData, house: e.target.value })
                }
                type="text"
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                placeholder={t(`calc3.a2`)}
                required
              /> */}
              <input
                value={homeData.house_num}
                onChange={(e) =>
                  setHomeData({ ...homeData, house_num: e.target.value })
                }
                type="text"
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                placeholder={t(`calc3.a3`)}
                required
              />
              <div className="w-[100%] flex justify-center">
                <button
                  type="button"
                  onClick={SubmitHandler}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  className={`mt-3 md:mt-10 bg-heroPrimary transition duration-200 ease-in-out text-white font-semibold text-[18px] py-1 md:py-3 px-8 md:px-24 rounded-md ${
                    isActive ? "bg-opacity-50" : "hover:bg-Primary"
                  }`}
                >
                  {t(`services.hover1`)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <p className="text-center font-montserrat font-semibold text-[17px] lg:hidden">
        Краткие сведения
      </p>
      <p className="text-center font-normal text-lightGreey mb-6 text-[15px] mt-2 sm:text-[20px]">
        {t("sto.blog.ikki")}{" "}
        {category1?.length > 0 ? category1 : location?.categoryName}
      </p>
      {isEMail && <Profile2 setIsEmail={setIsEmail} />}
      {/* <button type="button" onClick={() => setIsEmail(prev => !prev)}>check</button> */}
      {/* <button type="button" onClick={() => setIsEmail(prev => !prev)}>check email</button> */}
      <div className="flex justify-center sm:justify-end mb-8">
        <button
          type="button"
          onClick={() => setIsModal((prev) => !prev)}
          className="bg-heroPrimary  hover:bg-Primary w-[300px] transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-1 sm:px-8 rounded-lg"
        >
          {t(`cal.form.btn`)}
        </button>
      </div>

      {/* Bottom section */}
      <div className="mt-8 border  sm:shadow-2xl flex flex-col w-[100%] md:w-[60%] rounded-lg p-2 sm:p-4 sm:hidden">
        <div className="flex items-center">
          <p className="font-medium mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            Категория
          </p>
          <p className="font-medium sm:font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            {category1}
          </p>
        </div>

        <div className="flex items-center mt-4 sm:mt-8 ">
          <p className="font-medium mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            НАЗВАНИЕ ОБЪЯВЛЕНИЯ
          </p>
          <p className="font-medium sm:font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey flex items-center">
            {category1} x{allCount}
            <div className="ml-2">
              {" "}
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.41185 5.32237L2 12.7341V16.44L5.70593 16.44L13.1178 9.02823M9.41185 5.32237L12.0696 2.66465L12.0712 2.66307C12.437 2.29723 12.6203 2.11398 12.8315 2.04534C13.0176 1.98489 13.2181 1.98489 13.4041 2.04534C13.6152 2.11393 13.7983 2.29697 14.1636 2.6623L15.7755 4.27417C16.1424 4.64106 16.3259 4.8246 16.3947 5.03614C16.4551 5.22221 16.4551 5.42265 16.3946 5.60872C16.326 5.82011 16.1427 6.00337 15.7763 6.36974L15.7755 6.37053L13.1178 9.02823M9.41185 5.32237L13.1178 9.02823"
                  stroke="#2F2E40"
                  strokeOpacity="0.8"
                  strokeWidth="2.014"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 md:flex-row justify-between">
        <div className="border sm:shadow-xl bg-white rounded-xl w-[100%] md:w-[60%] hidden sm:flex flex-col md:flex-row justify-between p-4">
          <div className="w-[100%] md:w-[30%] flex flex-col">
            <p className="font-normal text-[15px] sm:text-[18px] text-lightGreey">
              {t(`sto.st21`)}
            </p>
            <div className="flex flex-col mt-4 md:mt-8">
              <div className="flex mb-4 items-center">
                <div className="w-[17px] h-[22px]">
                  <img
                    src={"/loc2.svg"}
                    alt="map"
                    width={100}
                    height={100}
                    className="w-[100%] h-[100%] sm:mb-8"
                  />
                </div>
                <p className="font-semibold text-[#000] line-clamp-1 ml-4 text-[15px] sm:text-[17px] md:text-[19px]">
                  {postData?.city?.name?.split(" ")[0]}
                </p>
              </div>

              <div className="flex mb-4 items-center">
                <div className="w-[17px] h-[22px]">
                  <img
                    src={"/loc1.svg"}
                    alt="map"
                    className="w-[100%] h-[100%] sm:mb-8"
                  />
                </div>
                <p className="font-semibold text-[#000] line-clamp-1 ml-4 text-[15px] sm:text-[17px] md:text-[19px]">
                  {postData?.city?.name2?.split(" ")[0]}
                </p>
              </div>

              {postData?.product?.map((item) => (
                <div className="flex items-center mb-4 sm:mb-0">
                  <p>{t(`sto.st35`)}:</p>
                  <p className="font-semibold text-[#000] ml-4 line-clamp-1 mb-4text-[15px] sm:text-[17px] md:text-[19px]">
                    {item?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[100%] md:w-[68%] flex flex-col">
            <div className="z-[1]">
              <button
                onClick={editRoute2}
                className="flex justify-end items-center mb-4 md:mb-0"
              >
                <svg
                  width={18}
                  height={17}
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.41185 4.40235L2 11.8141V15.52L5.70593 15.52L13.1178 8.10822M9.41185 4.40235L12.0696 1.74464L12.0712 1.74306C12.437 1.37721 12.6203 1.19397 12.8315 1.12533C13.0176 1.06487 13.2181 1.06487 13.4041 1.12533C13.6152 1.19392 13.7983 1.37696 14.1636 1.74228L15.7755 3.35415C16.1424 3.72105 16.3259 3.90458 16.3947 4.11612C16.4551 4.3022 16.4551 4.50263 16.3946 4.68871C16.326 4.9001 16.1427 5.08335 15.7763 5.44973L15.7755 5.45051L13.1178 8.10822M9.41185 4.40235L13.1178 8.10822"
                    stroke="#23A879"
                    strokeWidth="2.014"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <button
                  type="button"
                  className="font-normal sm:font-medium text-[14.44px] ml-3 text-[#23A879]"
                >
                  {t(`sto.st22`)}
                </button>
              </button>
              <MapComponent
                city1Coords={postData?.location?.name}
                city2Coords={postData?.location?.name2}
              />
            </div>
          </div>
        </div>
        <div className="border sm:shadow-2xl bg-white rounded-xl w-[100%] md:w-[38%] p-2 sm:p-4 mt-8 sm:mt-0">
          <div className="flex justify-between mt-3 sm:mt-6">
            <p className=" sm:font-medium text-[12px] sm:text-[14.44px] ml-3 text-lightGreey">
              {t("sto.st23")}
            </p>
            <button
              type="button"
              onClick={editRoute3}
              className="flex justify-end items-center mb-2 md:mb-0"
            >
              <svg
                width={18}
                height={17}
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.41185 4.40235L2 11.8141V15.52L5.70593 15.52L13.1178 8.10822M9.41185 4.40235L12.0696 1.74464L12.0712 1.74306C12.437 1.37721 12.6203 1.19397 12.8315 1.12533C13.0176 1.06487 13.2181 1.06487 13.4041 1.12533C13.6152 1.19392 13.7983 1.37696 14.1636 1.74228L15.7755 3.35415C16.1424 3.72105 16.3259 3.90458 16.3947 4.11612C16.4551 4.3022 16.4551 4.50263 16.3946 4.68871C16.326 4.9001 16.1427 5.08335 15.7763 5.44973L15.7755 5.45051L13.1178 8.10822M9.41185 4.40235L13.1178 8.10822"
                  stroke="#23A879"
                  strokeWidth="2.014"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-normal hidden sm:flex  sm:font-medium text-[14.44px] ml-3 text-[#23A879]">
                {t(`sto.st22`)}
              </span>
            </button>
          </div>
          <div className="p-2">
            <table className="w-[100%] mt-4">
              <thead>
                <th className="text-[#ABAFB6] w-[70%] text-start text-[12px] sm:text-[18px] font-normal">
                  {t(`sto.st24`)}
                </th>
                <th className="text-[#ABAFB6] w-[15%] text-start text-[12px] sm:text-[18px] font-normal">
                  {t(`sto.st25`)}
                </th>
                <th className="text-[#ABAFB6] w-[15%] text-start text-[12px] sm:text-[18px] font-normal">
                  {t(`sto.st26`)}
                </th>
              </thead>
              <tbody>
                {postData?.product?.map((item, index) => (
                  <tr>
                    <td>
                      <p className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                        {item?.name?.slice(0, 11)}
                      </p>
                      <p className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                        {item?.length} x {item?.width} x {item?.height} см
                      </p>
                    </td>
                    <td className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                      {item?.weight} {t(`calsection.kg`)}
                    </td>
                    <td className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                      {item?.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex p-2">
            <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway">
              {t(`sto.st27`)}
            </p>
            <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway">
              {t(`cal.step2.yes`)}
            </p>
          </div>
          <div
            className="my-4 mx-12"
            style={{ border: "1px dashed #2F2E40" }}
          />

          <div className="mt-8 flex">
            <p className="text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway">
              {t(`sto.st28`)}
            </p>
            <p className="text-[12px] font-montserrat ml-5 sm:text-[16px] md:text-[18px] text-lightGreey font-semibold">
              {allWeight} {t(`calsection.kg`)}
            </p>
          </div>

          <div className="mt-4 flex">
            <p className="text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway">
              {t(`sto.st29`)}
            </p>
            <p className="text-[12px] font-montserrat ml-5 sm:text-[16px] md:text-[18px] text-lightGreey font-semibold">
              {category2?.length > 0 ? category2 : t(`sto.st30`)}
            </p>
          </div>
          <div className="my-4 flex items-center gap-x-2 md:gap-x-4">
            <p className="text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway uppercase">
              {t(`calsection.w1`)}
            </p>
            <p className="font-semibold text-[14px] md:text-[18px] text-[#2F2E40CC]/80">
              {euro?.price} €
            </p>
          </div>
          <div className="mb-4 flex items-center gap-x-2 md:gap-x-4">
            <p className="text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey font-normal font-raleway uppercase">
              {t(`calsection.w2`)}
            </p>
            <p className="font-semibold text-[14px] md:text-[18px] text-[#2F2E40CC]/80">
              {price_za_km || price_km} €
            </p>
          </div>
          <div className="flex w-full rounded-[5px] items-center justify-between px-3 md:px-6 lg:px-8 lg:h-[98px] md:h-[62px] h-[51px] bgImage text-white">
            <p className="font-semibold md:font-bold lg:font-extrabold font-raleway text-[16px] md:text-[21px] text-white">
              {t(`calsection.w3`)}
            </p>
            <p className="font-semibold md:font-bold lg:font-extrabold font-raleway text-[16px] md:text-[21px] text-white">
              {Math.floor(price)} €
            </p>
          </div>
          {/* )} */}
        </div>

        <div className="border shadow-xl rounded-xl w-[100%] md:w-[60%] flex sm:hidden flex-col md:flex-row justify-between p-4">
          <div className="w-[100%] bg-white md:w-[30%] flex flex-col">
            <p className="font-normal text-[15px] sm:text-[18px] text-lightGreey">
              {t(`sto.st21`)}
            </p>
            <div className="flex flex-col mt-4 md:mt-8">
              <div className="flex mb-4 items-center">
                <div className="w-[17px] h-[22px]">
                  <img
                    src={"/loc2.svg"}
                    alt="map"
                    width={100}
                    height={100}
                    className="w-[100%] h-[100%] sm:mb-8"
                  />
                </div>
                <p className="font-semibold text-[#000] line-clamp-1 ml-4 text-[15px] sm:text-[17px] md:text-[19px]">
                  {postData?.city?.name?.split(" ")[0]}
                </p>
              </div>

              <div className="flex mb-4 items-center">
                <div className="w-[17px] h-[22px]">
                  <img
                    src={"/loc1.svg"}
                    alt="map"
                    className="w-[100%] h-[100%] sm:mb-8"
                  />
                </div>
                <p className="font-semibold text-[#000] line-clamp-1 ml-4 text-[15px] sm:text-[17px] md:text-[19px]">
                  {postData?.city?.name2?.split(" ")[0]}
                </p>
              </div>

              {postData?.product?.map((item) => (
                <div className="flex items-center mb-4 sm:mb-0">
                  <p>{t(`sto.st35`)}:</p>
                  <p className="font-semibold text-[#000] ml-4 line-clamp-1 mb-4text-[15px] sm:text-[17px] md:text-[19px]">
                    {item?.name}
                  </p>
                </div>
              ))}

              {/* <div className="flex items-center mb-4 sm:mb-0">
                <p>Доставка:</p>
                <p className="font-semibold text-[#000] ml-4 text-[15px] sm:text-[17px] md:text-[19px]">
                  Гибкие даты
                </p>
              </div> */}
            </div>
          </div>

          <div className="w-[100%] md:w-[68%] flex flex-col">
            <div className="z-[1]">
              <div className="flex justify-end items-center mb-4 md:mb-0">
                <svg
                  width={18}
                  height={17}
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.41185 4.40235L2 11.8141V15.52L5.70593 15.52L13.1178 8.10822M9.41185 4.40235L12.0696 1.74464L12.0712 1.74306C12.437 1.37721 12.6203 1.19397 12.8315 1.12533C13.0176 1.06487 13.2181 1.06487 13.4041 1.12533C13.6152 1.19392 13.7983 1.37696 14.1636 1.74228L15.7755 3.35415C16.1424 3.72105 16.3259 3.90458 16.3947 4.11612C16.4551 4.3022 16.4551 4.50263 16.3946 4.68871C16.326 4.9001 16.1427 5.08335 15.7763 5.44973L15.7755 5.45051L13.1178 8.10822M9.41185 4.40235L13.1178 8.10822"
                    stroke="#23A879"
                    strokeWidth="2.014"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <button
                  onClick={editRoute2}
                  className="font-normal sm:font-medium text-[14.44px] ml-3 text-[#23A879]"
                >
                  Редактировать
                </button>
              </div>
              <MapComponent
                city1Coords={postData?.location?.name}
                city2Coords={postData?.location?.name2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Send Email */}
      <form ref={form} onSubmit={sendEmail} className="hidden">
        <input
          name="user_name"
          type="text"
          value={`${user?.first_name} ${user?.last_name}`}
        />
        <input type="text" className="main-input" value={user?.phone} />
        <input
          name="user_email"
          type="text"
          className="main-input"
          value={user?.email}
        />
        <input
          type="text"
          name="to_name"
          // value={"dostavkadeliver@yandex.ru"}
          value={"dilmuroddelitot@gmail.com"}
        />
        <textarea
          name="message"
          type="text"
          className="main-text h-[120px] w-[100%]"
          value={context}
        />
      </form>

      {/* Bottom section */}
      <div className="mt-8 border shadow-2xl hidden sm:flex bg-white flex-col w-[100%] md:w-[60%] rounded-lg p-2 sm:p-4">
        <div className="flex items-center">
          <p className="font-medium mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            {t(`sto.st31`)}
          </p>
          <p className="font-medium sm:font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            {category1}
          </p>
        </div>

        <div className="flex items-center mt-4 sm:mt-8 ">
          <p className="font-medium mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
            {t(`sto.st32`)}
          </p>
          <p className="font-medium sm:font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey flex items-center">
            {category1} x{allCount}
            <div className="ml-2">
              {" "}
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.41185 5.32237L2 12.7341V16.44L5.70593 16.44L13.1178 9.02823M9.41185 5.32237L12.0696 2.66465L12.0712 2.66307C12.437 2.29723 12.6203 2.11398 12.8315 2.04534C13.0176 1.98489 13.2181 1.98489 13.4041 2.04534C13.6152 2.11393 13.7983 2.29697 14.1636 2.6623L15.7755 4.27417C16.1424 4.64106 16.3259 4.8246 16.3947 5.03614C16.4551 5.22221 16.4551 5.42265 16.3946 5.60872C16.326 5.82011 16.1427 6.00337 15.7763 6.36974L15.7755 6.37053L13.1178 9.02823M9.41185 5.32237L13.1178 9.02823"
                  stroke="#2F2E40"
                  strokeOpacity="0.8"
                  strokeWidth="2.014"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Step4);
