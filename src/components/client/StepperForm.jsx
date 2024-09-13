import { memo, useCallback, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Step1, Step2, Step3, Step4 } from ".";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import StepHero from "./StepHero";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { carWeights } from "./constants";

const StepperForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isStepTrue = queryParams.get("step") === "true";
  const isQuick = queryParams.get("quick") === "true";
  const isActive = queryParams.get("active");
  const isStepOne = queryParams.get("step") === "1";

  const quickProduct = isQuick && queryParams.get("product");
  const quickService = isStepTrue && queryParams.get("service");
  const newStartCity = isQuick && queryParams.get("startCity");
  const newEndCity = isQuick && queryParams.get("endCity");
  const newSt = isQuick && queryParams.get("st");
  const newSt2 = isQuick && queryParams.get("st2");

  // for step (patxod)
  const newStartCityService = isStepTrue && queryParams.get("startCity");
  const newEndCityService = isStepTrue && queryParams.get("endCity");
  const newStService = isStepTrue && queryParams.get("st");
  const newSt2Service = isStepTrue && queryParams.get("st2");
  const newkm = isStepTrue && queryParams.get("km");
  const [homeData, setHomeData] = useState({
    street: "",
    // house: "",
    house_num: "",
    street1: "",
    // house1: "",
    house_num1: "",
  });
  const [isNext, setIsNext] = useState(false);

  const [step, setStep] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: true,
    active1: false,
    active2: false,
    active3: false,
    active4: false,
  });
  const [t] = useTranslation("global");

  const [price, setPrice] = useState(0);
  const [km, setKm] = useState(0);
  const [checked, setChecked] = useState(false);
  const [is_avto, setIsAvto] = useState(false);
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState(false);
  const [sendDate, setSendDate] = useState("");
  const [getDate, setGetDate] = useState("");
  const [id, setID] = useState("");
  const [st, setSt] = useState();
  const [st2, setSt2] = useState();
  const [id_cargo, setIdCargo] = useState();
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [isAccurate, setIsAccurate] = useState(false);
  const [newField, setNew] = useState({
    transport: true,
    isCargo: false,
    cargo: null,
  });
  const [price_za_km, setPriceZaKm] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name_yur: "",
    inn: "",
    kpp: "",
    ogrn: "",
    bik: "",
  });
  const [product, setProduct] = useState({
    name: "",
    count: 1,
    length: "",
    width: "",
    height: "",
    weight: "",
  });
  const [multipleProduct, setMultipleProduct] = useState([
    {
      id: uuidv4(),
      name: "",
      count: 1,
      length: Number,
      width: Number,
      height: Number,
      weight: Number,
    },
  ]);

  const quickProductData = JSON.parse(quickProduct);

  const multipleProductHandler = () => {
    let checkedItem = [...multipleProduct];
    let del = checkedItem?.pop();
    if (
      multipleProduct.length == 0 ||
      (del?.name?.length > 0 && del?.height > 0,
      del?.length > 0 && del?.weight > 0 && del?.width > 0)
    ) {
      setMultipleProduct([
        ...multipleProduct,
        {
          id: uuidv4(),
          name: "",
          count: 1,
          length: "",
          width: "",
          height: "",
          weight: "",
        },
      ]);
    }
  };

  let postData = {
    location: {
      name: st,
      name2: st2,
    },
    name_yur: userInfo.name_yur,
    inn: userInfo.inn,
    kpp: userInfo.kpp,
    ogrn: userInfo.ogrn,
    bik: userInfo.bik,
    city: {
      name: startCity,
      name2: endCity,
    },
    is_data: checked,
    acceptance_date: sendDate || null,
    delivery_date: getDate || null,
    product: multipleProduct,
    id_service: parseInt(id),
    id_cargo,
    isAccurate: false,
    is_transport: newField.transport,
    is_cargo: newField.isCargo,
    cargo: newField.cargo,
    is_avto,
    street: homeData.street,
    house: homeData.house,
    house_num: homeData.house_num,
    street1: homeData.street1,
    house1: homeData.house1,
    house_num1: homeData.house_num1,
    id_status: 1,
  };

  useEffect(() => {
    if (isStepTrue) {
      setStep({
        ...step,
        step2: false,
        step1: false,
        step3: true,
        step4: false,
        step5: false,
      });
      setStartCity(newStartCityService);
      setEndCity(newEndCityService);
      setSt(JSON.parse(newStService));
      setSt2(JSON.parse(newSt2Service));
      setID(JSON.parse(quickService)?.id);
      setKm(Math.floor(newkm));
      setNew({
        ...newField,
        transport: JSON.parse(quickService)?.is_transport,
        isCargo: JSON.parse(quickService)?.is_cargo,
      });
      console.log(Math.floor(newkm));
    }
    if (isStepOne) {
      setStep({
        ...step,
        step2: true,
        step1: false,
        step3: false,
        step4: false,
        active1: true,
      });
    }
  }, [isStepTrue]);

  const deleteProduct = () => {
    const deletedArr = [...multipleProduct];
    deletedArr.pop();
    setMultipleProduct(deletedArr);
  };

  let postData2 = {
    id_status: 1,
    location: {
      name: JSON.parse(newSt),
      name2: JSON.parse(newSt2),
    },
    name_yur: userInfo.name_yur,
    inn: userInfo.inn,
    kpp: userInfo.kpp,
    ogrn: userInfo.ogrn,
    bik: userInfo.bik,
    city: {
      name: newStartCity,
      name2: newEndCity,
    },
    is_data: checked,
    acceptance_date: sendDate || null,
    delivery_date: getDate || null,
    product: [quickProductData],
    id_service: parseInt(id),
    id_cargo,
    isAccurate: false,
    is_transport: quickProductData.is_transport,
    is_cargo: quickProductData.is_cargo,
    cargo: quickProductData.cargo,
    is_avto,
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

      const km = parseInt(quickProductData.km);
      const length = parseInt(quickProductData.length);
      const width = parseInt(quickProductData.width);
      const height = parseInt(quickProductData.height);
      const weight = parseInt(quickProductData.weight);

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
    } catch (error) {
      toast.error("Произошло ошибка");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isQuick) {
      validateSum();
      setStep((prevStep) => ({
        ...prevStep,
        step5: false,
        step3: false,
        step1: false,
        step2: false,
        step4: true,
        active1: true,
        active2: true,
        active3: true,
      }));
    }
  }, [isQuick]);

  const toStep1 = useCallback(() => {
    window.scrollTo({ top: 0 });
    setStep({
      ...step,
      step5: false,
      step3: false,
      step1: false,
      step2: false,
      step4: true,
    });
  }, [step]);

  const toStep2 = useCallback(() => {
    window.scrollTo({ top: 0 });
    setStep({
      ...step,
      step5: true,
      step3: false,
      step1: false,
      step2: false,
      step4: false,
    });
  }, [step, setStep]);

  useEffect(() => {
    const savedStep = localStorage.getItem("postData");
    if (savedStep) {
      postData = JSON.parse(savedStep);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      setStep({
        ...step,
        step5: true,
        step3: false,
        step1: false,
        step2: false,
        step4: false,
      });
    }
  }, [isActive]);

  return (
    <div className="w-[96%] sm:w-[94%] mx-auto">
      {!step.step5 && (
        <div className="flex w-[100%] items-center justify-center mb-2 pb-6">
          {/* Step 1 */}
          <div className="relative">
            {step.active1 ? (
              <CheckCircleIcon sx={{ color: "#1348F9", marginBottom: "3px" }} />
            ) : (
              <button
                className={`h-[20px] w-[20px] ${
                  step.step1
                    ? "bg-white border-2 border-[#1348F9]"
                    : "bg-[#7A7E86] "
                } rounded-full`}
              ></button>
            )}

            <p
              className={`${
                step.step1 ? "text-[#1348F9]" : "text-lightGreey"
              } absolute top-[20px] hidden w-[200px] lg:flex ml-[-80px] justify-center font-medium lg:text-[18px]`}
            >
              {t(`sto.st9`)}
            </p>
          </div>
          <div className="h-[2px] bg-[#7A7E86] w-[25%] mb-2"></div>
          {/* Step2 */}
          <div className="relative">
            {step.active2 ? (
              <CheckCircleIcon sx={{ color: "#1348F9", marginBottom: "3px" }} />
            ) : (
              <button
                className={`h-[20px] w-[20px] ${
                  step.step2
                    ? "bg-white border-2 border-[#1348F9]"
                    : "bg-[#7A7E86] "
                } rounded-full`}
              ></button>
            )}

            <p
              className={`${
                step.step2 ? "text-[#1348F9]" : "text-lightGreey"
              } absolute top-[20px] hidden w-[200px] lg:flex ml-[-80px] justify-center font-medium lg:text-[18px]`}
            >
              {t(`sto.st10`)}
            </p>
          </div>
          <div className="h-[2px] bg-[#7A7E86] w-[25%] mb-2"></div>
          {/* Step3 */}
          <div className="relative">
            {step.active3 ? (
              <CheckCircleIcon sx={{ color: "#1348F9", marginBottom: "3px" }} />
            ) : (
              <button
                className={`h-[20px] w-[20px] ${
                  step.step3
                    ? "bg-white border-2 border-[#1348F9]"
                    : "bg-[#7A7E86] "
                } rounded-full`}
              ></button>
            )}

            <p
              className={`${
                step.step3 ? "text-[#1348F9]" : "text-lightGreey"
              } absolute top-[20px] hidden w-[300px] lg:flex ml-[-80px] justify-center font-medium lg:text-[18px]`}
            >
              {t(`sto.st11`)}
            </p>
          </div>
          <div className="h-[2px] bg-[#7A7E86] w-[25%] mb-2"></div>
          {/* Step4 */}
          <div className="relative">
            {step.active4 ? (
              <CheckCircleIcon sx={{ color: "#1348F9", marginBottom: "3px" }} />
            ) : (
              <button
                className={`h-[20px] w-[20px] ${
                  step.step4
                    ? "bg-white border-2 border-[#1348F9]"
                    : "bg-[#7A7E86] "
                } rounded-full`}
              ></button>
            )}

            <p
              className={`${
                step.step4 ? "text-[#1348F9]" : "text-lightGreey"
              } absolute top-[20px] hidden w-[300px] lg:flex ml-[-80px] justify-center font-medium lg:text-[18px]`}
            >
              {t(`sto.st12`)}
            </p>
          </div>
        </div>
      )}
      <form>
        {/* Step Hero */}
        {step?.step5 && (
          <StepHero
            newField={newField}
            setNew={setNew}
            category1={category1}
            setID={setID}
            setStep={setStep}
            step={step}
            setCategory1={setCategory1}
          />
        )}
        {/* Step1 section */}
        <div>
          {step.step1 && (
            <Step1
              category1={category1}
              setID={setID}
              setStep={setStep}
              step={step}
              setCategory1={setCategory1}
            />
          )}
        </div>
        {/* Step2 section */}
        <div>
          {step.step2 && (
            <Step2
              toStep2={toStep2}
              km={km}
              setKm={setKm}
              category1={category1}
              setID={setID}
              isStepTrue={isStepTrue}
              setStep={setStep}
              step={step}
              checked={checked}
              startCity={startCity}
              endCity={endCity}
              sendDate={sendDate}
              getDate={getDate}
              setChecked={setChecked}
              setStartCity={setStartCity}
              setEndCity={setEndCity}
              setSendDate={setSendDate}
              setGetDate={setGetDate}
              st={st}
              st2={st2}
              setSt={setSt}
              setSt2={setSt2}
            />
          )}
        </div>
        {/* Step3 section */}
        <div>
          {step.step3 && (
            <Step3
              is_avto={is_avto}
              setIsAvto={setIsAvto}
              toStep1={toStep1}
              category2={category2}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setPriceZaKm={setPriceZaKm}
              km={km}
              price={price}
              setPrice={setPrice}
              newField={newField}
              setNew={setNew}
              category1={category1}
              setCategory2={setCategory2}
              deleteProduct={deleteProduct}
              multipleProductHandler={multipleProductHandler}
              setMultipleProduct={setMultipleProduct}
              multipleProduct={multipleProduct}
              setStep={setStep}
              step={step}
              setIdCargo={setIdCargo}
              product={product}
              setProduct={setProduct}
              postData={postData}
              isAccurate={isAccurate}
              setIsAccurate={setIsAccurate}
            />
          )}
        </div>
        {/* Step4 section */}
        <div>
          {step.step4 && (
            <Step4
              isNext={isNext}
              setIsNext={setIsNext}
              homeData={homeData}
              setHomeData={setHomeData}
              price_za_km={price_za_km}
              price={price}
              postData={isQuick ? postData2 : postData}
              setStep={setStep}
              step={step}
              category1={category1}
              category2={category2}
              isQuick={isQuick}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default memo(StepperForm);
