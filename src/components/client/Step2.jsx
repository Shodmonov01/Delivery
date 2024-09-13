import { Switch } from "@mui/material";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "leaflet/dist/leaflet.css";
import Loader from "./Loader";
import "./send.css";
import MapComponent from "./GoogleMap";
import { useTranslation } from "react-i18next";
import { ServiceContext } from "../../context/ServiceContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LocationSearchInput from "../UI/loadInput";
import CustomDateInput from "./cuscal";
import CustomDateInput2 from "./cal2";

const Step2 = ({
  toStep2,
  st,
  setID,
  category1,
  st2,
  isStepTrue,
  setSt,
  setSt2,
  checked,
  startCity,
  endCity,
  sendDate,
  getDate,
  setChecked,
  setStartCity,
  setEndCity,
  setSendDate,
  setGetDate,
  step,
  setStep,
  setKm,
  km,
}) => {
  let lot1 = [];
  let lot2 = [];
  const [loader, setLoader] = useState(true);
  const [t] = useTranslation("global");
  const [categoryName1, setCategoryName1] = useState("");
  const { location, setLocation } = useContext(ServiceContext);
  const KEY = "96b947a45d33d7dc1c49af3203966408";
  const getData = useCallback(
    async (city) => {
      try {
        const base = "https://api.openweathermap.org/data/2.5/weather";
        const query = `?q=${city}&units=metric&appid=${KEY}`;
        const req = await fetch(base + query);
        const data = await req.json();
        let a = data.coord.lat;
        let b = data.coord.lon;
        let lot1 = [a, b];
        setSt(lot1);
      } catch (error) {
        console.log(error);
      }
    },
    [setSt]
  );
  useEffect(() => {
    getData("London");
  }, [getData]);
  const getData2 = async (city) => {
    const base = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${city}&units=metric&appid=${KEY}`;
    const req = await fetch(base + query);
    const data = await req.json();
    let a = data?.coord?.lat;
    let b = data?.coord?.lon;
    lot2 = [a, b];
    setSt2(lot2);
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  useEffect(() => {
    if (isStepTrue) {
      setStartCity(location.from);
      setEndCity(location.to);
      getData(startCity);
      getData2(endCity);
      setID(location?.id);
      // setView(true);
    }
    if (isStepTrue == 1) {
      setID(location?.id);
      setCategoryName1(location?.categoryName);
    }
    console.log(location);
  }, [isStepTrue]);

  const navigate = useNavigate();

  const stepHandler = (e) => {
    if (startCity?.length > 0 && endCity?.length > 0) {
      setStep((prevStep) => ({
        ...prevStep,
        step3: !prevStep.step3,
        step1: false,
        step2: false,
        step4: false,
        active2: true,
      }));
      window.scrollTo({ top: 0 });
      navigate("/calculator");
    } else {
      toast("Введите адрес");
    }
  };

  // Don't change this function!
  function calculateDistance(lat1, lon1, lat2, lon2) {
    function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    var R = 6371; // Yer radiusi kilometrda
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Masofa kilometrda
    setKm(distance);
    return distance;
  }

  useEffect(() => {
    calculateDistance(st && st[0], st && st[1], st2 && st2[0], st2 && st2[1]);
  }, [st, st2]);

  return loader ? (
    <Loader />
  ) : (
    <div className="sm:mt-12">
      <p className="text-center font-montserrat font-semibold text-[17px] lg:hidden">
        {t("cal.form.t2")}
      </p>
      <p className="text-center font-normal text-lightGreey mb-6 text-[15px] mt-2 sm:text-[20px]">
        {t("cal.form.p1").split(" ")[0]}{" "}
        {category1?.length > 0 ? category1 : location.categoryName}
      </p>
      <div className="mb-6">
        <div className="flex w-full justify-end text-white ">
          <button
            onClick={stepHandler}
            type="button"
            className="py-2 px-6 text-[18px] font-montserrat bg-Primary rounded-md mt-8 md:mt-0"
          >
            {t(`cal.form.btn`)}
          </button>
        </div>
      </div>
      {/* <p className="text-center font-montserrat font-semibold text-[17px] mt-2 text-lightGreey mb-4">
        {t(`cal.step2.hero`)}
      </p> */}

      <div className="flex md:flex-row flex-col justify-between">
        <div className="w-[100%] md:w-[35%]">
          <div className="flex flex-col">
            <div className="w-[100%] mb-6 p-6 bg-white md:p-12 shadow-lg border rounded-lg flex flex-col justify-center items-center">
              <div className="w-[100%] mb-4">
                <p className="mb-2 font-normal text-[18px] sm:text-[22px] text-lightGreey">
                  {t(`sto.st14`)}
                </p>

                <LocationSearchInput
                  img={"/loc1.svg"}
                  setState={setStartCity}
                  setLocation={setSt}
                  startCity={startCity}
                />
              </div>
              <div className="w-[100%]">
                <p className="mb-2 font-normal text-[18px] sm:text-[22px] text-lightGreey">
                  {t(`sto.st15`)}
                </p>
                <LocationSearchInput
                  img={"/loc2.svg"}
                  setState={setEndCity}
                  setLocation={setSt2}
                  startCity={endCity}
                />
              </div>
              {/* <button
                type="button"
                className="mt-4 bg-Primary text-white py-2 px-8 rounded-lg font-bold"
                // onClick={getFullData}
              >
                {t(`cal.step2.search`)}
              </button> */}
            </div>

            <div className="w-[100%] bg-white mb-6 p-6 md:p-12 shadow-lg border rounded-lg flex flex-col justify-center items-center">
              <div className="w-[100%] mb-4">
                <div className="flex items-center ">
                  <p className=" sm:font-normal text-[15px] font-montserrat sm:text-[18px] md:text-[20px] font-semibold text-lightGreey mr-5">
                    {t(`cal.step2.d1`)}
                  </p>
                  <div className="flex items-center">
                    <Switch
                      defaultChecked={checked}
                      onClick={() => setChecked((prev) => !prev)}
                    />
                    <p className="ml-2 sm:ml-8 font-normal font-montserrat text-[15px] sm:text-[18px] text-lightGreey mr-2">
                      {checked ? t(`cal.step2.yes`) : t(`cal.step2.no`)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex min-[1750px]:flex-row flex-col justify-between mt-3 sm:items-center">
                    <p className="text-[14px] sm:text-[15px] font-montserrat font-normal text-lightGreey mb-2 sm:mb-0">
                      {t(`cal.step2.d2`)}
                    </p>
                    <div>
                      <CustomDateInput
                        // text={"Выберите дату"}
                        state={sendDate}
                        setState={setSendDate}
                      />
                      <input
                        disabled={!checked}
                        value={sendDate}
                        onChange={(e) => setSendDate(e.target.value)}
                        type="date"
                        placeholder="Выберите дату"
                        className="border w-[100%] hidden py-2 rounded-md text-[#667085] font-montserrat text-[14px]  focus:outline-[#1348F9] px-6 sm:px-12 font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex min-[1750px]:flex-row flex-col justify-between mt-3 sm:items-center">
                    <p className="text-[14px] sm:text-[15px]  font-montserrat font-normal text-lightGreey">
                      {t(`cal.step2.d3`)}
                    </p>
                    <div>
                      <CustomDateInput2
                        // text={"Выберите дату"}
                        state={getData}
                        setState={setGetDate}
                      />
                      <input
                        value={getDate}
                        onChange={(e) => setGetDate(e.target.value)}
                        disabled={!checked}
                        type="date"
                        placeholder="Выберите дату"
                        className="border w-[100%] hidden py-2 font-montserrat rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-6 sm:px-12 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] md:w-[62%] flex flex-col z-[1]">
          {!(st && st2) ? (
            <MapComponent
              city1Coords={[55.7522, 37.6156]}
              city2Coords={[55.7522, 37.6156]}
            />
          ) : (
            <MapComponent city1Coords={st} city2Coords={st2} />
          )}
          {km && (
            <p className="pt-3 text-Primary font-semibold">
              {Math.floor(km)} km
            </p>
          )}
        </div>
      </div>
      <div className="mt-12 flex w-[100%] justify-center">
        <button
          onClick={toStep2}
          type="button"
          className="bg-[#85858538] rounded-lg mr-5"
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

        <button
          type="button"
          onClick={stepHandler}
          className="bg-heroPrimary max-h-[69px] hover:bg-Primary transition duration-200 ease-in-out  font-semibold text-white text-[15px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-3 sm:px-8 rounded-lg"
        >
          {t(`cal.step2.btn1`)}
        </button>
      </div>
      {/* <div className="flex w-full justify-end text-white ">
        <button
          onClick={stepHandler}
          type="button"
          className="py-2 px-6 text-[18px] font-montserrat bg-Primary rounded-md mt-8 md:mt-0"
        >
          {t(`cal.form.btn`)}
        </button>
      </div> */}
    </div>
  );
};

export default memo(Step2);
