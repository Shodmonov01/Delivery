import { BASE_URL } from "../../service/auth";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import axios from "axios";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { ServiceContext } from "../../context/ServiceContext";
import { carWeights } from "./constants";

const Step3 = ({
  setPriceZaKm,
  toStep1,
  category2,
  userInfo,
  setUserInfo,
  km,
  newField,
  setPrice,
  price,
  setNew,
  setCategory2,
  isAccurate,
  setIsAccurate,
  setIdCargo,
  product,
  setProduct,
  step,
  setStep,
  multipleProduct,
  setMultipleProduct,
  multipleProductHandler,
  deleteProduct,
  category1,
  postData,
  is_avto,
  setIsAvto,
}) => {
  const [checked2, setChecked2] = useState(true);
  const [data, setData] = useState([]);
  const [t] = useTranslation("global");
  const [isStop, setIsStop] = useState({
    length: false,
    width: false,
    height: false,
    weight: false,
  });

  const { location } = useContext(ServiceContext);

  const getCardData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/cargo_quality_views/`
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getCardData();
  }, [getCardData, step]);

  const SubmitHandler = () => {
    if (!isStop.length && !isStop.width && !isStop.height && !isStop.weight) {
      if (
        multipleProduct[0]?.weight > 0 &&
        multipleProduct[0]?.name.length &&
        multipleProduct[0]?.count > 0 &&
        multipleProduct[0]?.length > 0 &&
        multipleProduct[0]?.width > 0 &&
        multipleProduct[0]?.height > 0
      ) {
        let a = 0;
        multipleProduct.forEach((c) => {
          a += parseInt(c?.weight);
        });
        setNew({ ...newField, cargo: a });
        validateSum();
        setStep({
          ...step,
          step4: !step.step4,
          step1: false,
          step2: false,
          step3: false,
          active3: true,
        });

        window.scrollTo({ top: 0 });
      } else {
        toast.error("Заполните все поля");
        window.scrollTo({ top: 200 });
      }
    } else {
      toast.error("Превышены размеры груза");
    }
  };

  const writeToArray = (cardId, e) => {
    console.log(cardId);
    const { name, value } = e.target;
    setMultipleProduct((prevCards) =>
      prevCards.map((card) =>
        card?.id == cardId ? { ...card, [name]: value } : card
      )
    );
  };

  const step2Handler = () => {
    setStep({
      ...step,
      step4: false,
      step1: false,
      step2: !step.step2,
      step3: false,
      // active3: true,
    });
    // toast.success("Success");
    window.scrollTo({ top: 0 });
  };

  const writeToArray2 = (cardId, value) => {
    setMultipleProduct((prevCards) =>
      prevCards.map((card) =>
        card?.id === cardId ? { ...card, count: value } : card
      )
    );
  };

  const handleAccurate = (id) => {
    setMultipleProduct((prevCards) =>
      prevCards.map((card) =>
        card?.id === id ? { ...card, isAccurate } : card
      )
    );
  };

  const handleSum = (id) => {
    setMultipleProduct((prevCards) =>
      prevCards.map((card) =>
        card?.id === id ? { ...card, count: card?.count + 1 } : card
      )
    );

    const newCards = multipleProduct.map((card) =>
      card?.id === id ? { ...card, count: card?.count + 1 } : card
    );

    setProduct({
      ...product,
      count: newCards.find((el) => el.id === id)?.count || 0,
    });

    writeToArray2(id, newCards.find((el) => el.id === id)?.count || 0);
  };

  const handleSumMinus = (id) => {
    setMultipleProduct((prevCards) =>
      prevCards.map((card) =>
        card?.id === id
          ? { ...card, count: Math.max(card?.count - 1, 0) }
          : card
      )
    );

    const newCards = multipleProduct.map((card) =>
      card?.id === id ? { ...card, count: Math.max(card?.count - 1, 0) } : card
    );

    setProduct({
      ...product,
      count: newCards.find((el) => el.id === id)?.count || 0,
    });

    writeToArray2(id, newCards.find((el) => el.id === id)?.count || 0);
  };

  const calcSum = (weight, distance, carWeight, carFee, serviceFee) => {
    if (newField.transport) {
      return (carWeight / weight) * distance * carFee;
    } else {
      return (weight / carWeight) * carFee * distance + serviceFee;
    }
  };

  // don't change
  const validateSum = async () => {
    try {
      let sum = 0;
      const price = await axios.get(
        `${BASE_URL}/a_api/admin_panel/serive_price/`
      );
      const priceKm = await axios.get(
        `${BASE_URL}/a_api/admin_panel/kilomter/`
      );

      let length = 0;
      let width = 0;
      let height = 0;
      let weight = 0;
      multipleProduct.forEach((c) => {
        length = length + parseInt(c?.length);
        width = width + parseInt(c?.width);
        height = height + parseInt(c?.height);
        weight = weight + parseInt(c?.weight);
      });

      if (is_avto) {
        if (length <= 420 && width <= 210 && height <= 210 && weight <= 800) {
          setPriceZaKm(priceKm?.data[3]?.price);
          sum = calcSum(
            weight,
            km,
            carWeights[3],
            priceKm?.data[3]?.price,
            price.data[0]?.price
          );
          setPrice(Math.floor(sum));
        } else {
          toast.error("Превышены размеры груза");
        }
      } else {
        if (length <= 160 && width <= 120 && height <= 120 && weight <= 400) {
          setPriceZaKm(priceKm?.data[0]?.price);
          sum = calcSum(
            weight,
            km,
            carWeights[0],
            priceKm?.data[0]?.price,
            price.data[0]?.price
          );
          setPrice(Math.floor(sum));
          console.log({ sum });
        } else if (
          length <= 320 &&
          width <= 130 &&
          height <= 160 &&
          weight <= 800
        ) {
          setPriceZaKm(priceKm?.data[1]?.price);
          sum = calcSum(
            weight,
            km,
            carWeights[1],
            priceKm?.data[1]?.price,
            price.data[0]?.price
          );
          setPrice(Math.floor(sum));
        } else if (
          length <= 420 &&
          width <= 210 &&
          height <= 210 &&
          weight <= 1200
        ) {
          setPriceZaKm(priceKm?.data[2]?.price);
          sum = calcSum(
            weight,
            km,
            carWeights[2],
            priceKm?.data[2]?.price,
            price.data[0]?.price
          );
          setPrice(Math.floor(sum));
        } else {
          toast.error("Превышены размеры груза");
        }
      }
    } catch (error) {
      toast.error("Произошло ошибка");
      console.log(error);
    }
  };

  return (
    <div className="sm:mt-12">
      <div>
        <p className="text-center font-montserrat font-semibold text-[17px] lg:hidden">
          {t("sto.st17")}
        </p>
        <p className="text-center font-normal text-lightGreey mb-6 text-[15px] mt-2 sm:text-[20px]">
          {t("sto.blog.ikki")}{" "}
          {category1?.length > 0 ? category1 : location?.categoryName}
        </p>
        <div className="mb-6 flex w-full justify-end">
          <button
            type="button"
            onClick={SubmitHandler}
            className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  font-semibold text-white text-[15px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-3 sm:px-8 rounded-lg"
          >
            {t(`cal.form.btn`)}
          </button>
        </div>

        <div className="space-y-4 bg-white">
          {multipleProduct?.map((item, index) => (
            <div
              key={index}
              className="w-[100%] shadow-md md:shadow-xl border p-3 rounded-md flex flex-col"
            >
              <div className="flex flex-col mb-3 ">
                <p className="font-medium  mb-3 text-[18px] sm:text-[20px] text-lightGreey">
                  {t("sto.st18")}
                </p>
                <div className="flex sm:flex-row flex-col gap-y-4 justify-between items-center">
                  <div className="sm:w-[80%] w-[100%]">
                    <input
                      type="text"
                      value={item?.name}
                      name="name"
                      onChange={(e) => {
                        setProduct({ ...product, name: e.target.value });
                        writeToArray(item?.id, e);
                      }}
                      placeholder={t(`sto.st20`)}
                      className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                      required
                    />
                  </div>
                  <div className="sm:w-[18%] border py-2 rounded-lg px-4 w-[100%]">
                    <div className="flex justify-between">
                      <div
                        className="w-[22px] h-[22px] cursor-pointer"
                        onClick={() => handleSumMinus(item?.id)}
                      >
                        <img
                          src={"/minus1.svg"}
                          alt="map"
                          width={100}
                          height={100}
                          className="w-[100%] h-[100%]"
                        />
                      </div>
                      <p>{item?.count}</p>
                      <div
                        className="w-[22px] h-[22px] cursor-pointer"
                        onClick={() => handleSum(item?.id)}
                      >
                        <img
                          src={"/plus1.svg"}
                          alt="map"
                          width={100}
                          height={100}
                          className="w-[100%] h-[100%]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
                <div className="flex flex-col">
                  <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                    {t(`sto.st19`)}
                  </p>
                  <input
                    type="number"
                    value={item.length}
                    name="length"
                    onChange={(e) => {
                      if (parseInt(e.target.value) > 320) {
                        setIsStop({ ...isStop, length: true });
                      } else {
                        setIsStop({ ...isStop, length: false });
                      }
                      setProduct({ ...product, length: e.target.value });
                      writeToArray(item?.id, e);
                    }}
                    placeholder={`СМ`}
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                    {t(`cal.step3.f3`)}
                  </p>
                  <input
                    name="width"
                    value={item.width}
                    onChange={(e) => {
                      if (parseInt(e.target.value) > 130) {
                        setIsStop({ ...isStop, width: true });
                      } else {
                        setIsStop({ ...isStop, width: false });
                      }
                      setProduct({ ...product, width: e.target.value });
                      writeToArray(item?.id, e);
                    }}
                    placeholder={t(`cal.step3.p2`)}
                    type="number"
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                    {t(`cal.step3.f4`)}
                  </p>
                  <input
                    name="height"
                    value={item.height}
                    onChange={(e) => {
                      if (parseInt(e.target.value) > 160) {
                        setIsStop({ ...isStop, height: true });
                      } else {
                        setIsStop({ ...isStop, height: false });
                      }
                      setProduct({ ...product, height: e.target.value });
                      writeToArray(item?.id, e);
                    }}
                    placeholder={t(`cal.step3.p2`)}
                    type="number"
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                    {t(`cal.step3.f5`)}
                  </p>
                  <input
                    type="number"
                    value={item.weight}
                    name="weight"
                    onChange={(e) => {
                      console.log(parseInt(e.target.value));
                      if (parseInt(e.target.value) > 800) {
                        setIsStop({ ...isStop, weight: true });
                      } else {
                        setIsStop({ ...isStop, weight: false });
                      }
                      setProduct({ ...product, weight: e.target.value });
                      writeToArray(item?.id, e);
                    }}
                    placeholder={t(`cal.step3.p3`)}
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                    required
                  />
                </div>
              </div>
              <div className="mt-8 flex flex-row">
                <p className="to-lightGreey text-[16px] sm:text-[20px]  mr-3 sm:mr-7 font-medium">
                  {t(`cal.step3.ask`)}
                </p>
                <div className="flex items-center ">
                  <Switch
                    value={setIsAccurate}
                    onClick={() => {
                      handleAccurate(item.id);
                      setChecked2(!checked2);
                    }}
                  />
                  <p className="ml-2 sm:ml-8 font-normal font-montserrat text-[15px] sm:text-[20px] text-lightGreey mr-2">
                    {!checked2 ? t(`cal.step3.yes`) : t(`cal.step3.no`)}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-row">
                <p className="to-lightGreey text-[16px] sm:text-[20px]  mr-3 sm:mr-7 font-medium">
                  {t(`calc3.title`)}
                </p>
                <div className="flex items-center ">
                  <Switch
                    value={is_avto}
                    onClick={() => {
                      // handleAccurate(item.id);
                      setIsAvto(!is_avto);
                    }}
                  />
                  <p className="ml-2 sm:ml-8 font-normal font-montserrat text-[15px] sm:text-[20px] text-lightGreey mr-2">
                    {!is_avto ? t(`cal.step3.yes`) : t(`cal.step3.no`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-[100%] mt-8 justify-end flex-col relative mb-24">
          <button
            onClick={deleteProduct}
            type="button"
            className="mb-3 flex items-center absolute right-0 top-3"
          >
            <p className="font-semibold mr-3 text-red-800 text-[20px]">
              <svg
                width={23}
                height={23}
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden md:flex"
              >
                <path
                  d="M3.18088 3.15723L11.3381 11.3377M11.3381 11.3377L19.4954 19.5181M11.3381 11.3377L3.15767 19.4949M11.3381 11.3377L19.5186 3.18045"
                  stroke="#C61521"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width={15}
                height={15}
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden"
              >
                <path
                  d="M3.18088 3.15723L11.3381 11.3377M11.3381 11.3377L19.4954 19.5181M11.3381 11.3377L3.15767 19.4949M11.3381 11.3377L19.5186 3.18045"
                  stroke="#C61521"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
            <p className="font-semibold mr-3 text-red-800 text-[17px] md:text-[20px]">
              {t(`cal.step3.del`)}
            </p>
          </button>
          <button
            onClick={multipleProductHandler}
            type="button"
            className="flex absolute right-0 top-12 items-center"
          >
            <p className="font-semibold mr-3 text-blue-800 text-[20px]">
              <svg
                width={15}
                height={15}
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden"
              >
                <path
                  d="M3 14.3377L14.5525 14.3377M14.5525 14.3377H26.105M14.5525 14.3377V25.8901M14.5525 14.3377L14.5525 2.78516"
                  stroke="url(#paint0_linear_98_242)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_98_242"
                    x1="-14.82"
                    y1="-0.71949"
                    x2="31.6183"
                    y2="-0.519443"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.174199" stopColor="#1348F9" />
                    <stop offset="0.774517" stopColor="#1E86FA" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width={23}
                height={23}
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:flex hidden"
              >
                <path
                  d="M3 14.3377L14.5525 14.3377M14.5525 14.3377H26.105M14.5525 14.3377V25.8901M14.5525 14.3377L14.5525 2.78516"
                  stroke="url(#paint0_linear_98_242)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_98_242"
                    x1="-14.82"
                    y1="-0.71949"
                    x2="31.6183"
                    y2="-0.519443"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.174199" stopColor="#1348F9" />
                    <stop offset="0.774517" stopColor="#1E86FA" />
                  </linearGradient>
                </defs>
              </svg>
            </p>
            <p className="font-semibold mr-3 text-blue-800 text-[17px] md:text-[20px]">
              {t(`cal.step3.p4`)}
            </p>
          </button>
        </div>

        <div className="shadow-lg md:shadow-xl pt-3 bg-white border p-3 rounded-lg">
          <div className="flex flex-col">
            <p className="mb-3 font-normal text-[17px] md:text-[20px] lg:text-[22px] font-montserrat text-lightGreey">
              {" "}
              {t(`cal.step3.p5`)}
            </p>
            <FormControl className="m-1 md:w-[300px] w-full">
              <InputLabel id="demo-multiple-chip-label"></InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                defaultValue={"Выберите"}
                onChange={(e) => setIdCargo(e.target.value)}
              >
                <MenuItem value={"Выберите"} disabled>
                  {t(`cal.step3.p6`)}
                </MenuItem>
                {data?.map((item) => {
                  const getName = (id) => {
                    data?.map((item) => {
                      if (item?.id == id) {
                        setCategory2(item?.translations?.nl?.name);
                      }
                    });
                  };
                  return (
                    <MenuItem
                      value={item?.id}
                      onClick={() => {
                        getName(item.id);
                      }}
                    >
                      {item?.translations?.nl?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        {category2 === "Компания" && (
          <div className="shadow-lg bg-white md:shadow-xl border gap-x-[1%] p-3 rounded-lg mt-6 md:mt-12 flex flex-col sm:flex-row gap-y-3 sm:gap-y-6 sm:flex-wrap">
            <div className="flex flex-col w-[48%]">
              <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                Название
              </p>
              <input
                value={userInfo?.name_yur}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name_yur: e.target.value })
                }
                placeholder={"Название"}
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                required
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                ИНН
              </p>
              <input
                value={userInfo?.inn}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, inn: e.target.value })
                }
                placeholder={"ИНН"}
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                required
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                КПП
              </p>
              <input
                value={userInfo?.kpp}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, kpp: e.target.value })
                }
                placeholder={"КПП"}
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                required
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                ОГРН
              </p>
              <input
                value={userInfo?.ogrn}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, ogrn: e.target.value })
                }
                placeholder={"ОГРН"}
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                required
              />
            </div>
            <div className="flex flex-col w-[48%]">
              <p className="font-normal sm:font-medium  text-[16px] text-lightGreey">
                БИК
              </p>
              <input
                value={userInfo?.bik}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, bik: e.target.value })
                }
                placeholder={"БИК"}
                className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-4 font-medium"
                required
              />
            </div>
          </div>
        )}
        <div className="mt-12 flex w-[100%] justify-center">
          <button
            type="button"
            className="bg-[#85858538] rounded-lg mr-5"
            onClick={step2Handler}
          >
            <div className="flex flex-col w-[100%] py-1 px-4 sm:py-3 sm:px-8">
              <img
                src={"/leftleft.svg"}
                alt="map"
                width={100}
                height={100}
                className="w-[100%] h-[100%]"
              />
            </div>
          </button>

          <div className="flex md:items-center flex-col gap-y-3 md:flex-row  w-full justify-between">
            <button
              type="button"
              onClick={toStep1}
              className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  font-semibold text-white text-[15px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-3 sm:px-8 rounded-lg"
            >
              {t("cal.step2.btn1")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Step3);
