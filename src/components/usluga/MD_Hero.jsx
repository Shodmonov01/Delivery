import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../../context/ServiceContext";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import CalSectionInput from "../UI/CalInput";
import { Switch } from "@mui/material";

const MD_Hero = ({ hero, id }) => {
  const [st, setSt] = useState();
  const [st2, setSt2] = useState();
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
  const userCookie = localStorage.getItem("user");
  const [product, setProduct] = useState({
    is_transport: true,
    is_cargo: false,
    id: "",
    km: 0,
  });
  const { location, setLocation } = useContext(ServiceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getCardData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/service_get_post_views/`
      );
      console.log(data);
      setData(data?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  function renderElement(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.name}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.name}</div>;
      case "en":
        return <div>{item?.translations?.en?.name}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.name}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

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

    return distance;
  }

  const quickDelivery = () => {
    let a = calculateDistance(
      st && st[0],
      st && st[1],
      st2 && st2[0],
      st2 && st2[1]
    );
    console.log(a);
    setProduct({ ...product, km: a });
    window.scrollTo({ top: 0 });
    navigate(
      `/calculator?step=true&startCity=${startCity}&endCity=${endCity}&st=${JSON.stringify(
        st
      )}&st2=${JSON.stringify(st2)}&service=${JSON.stringify(product)}&km=${a}`
    );
  };

  return (
    <div className="w-full h-[180px] hidden md:flex sm:h-[300px] lg:h-[700px] 2xl:h-[742px] relative">
      {id == 4 && (
        <img
          src={"/Rectangle 44.webp"}
          alt="Hero image"
          className="w-full h-full object-cover bg-no-repeat"
        />
      )}

      {id == 5 && (
        <img
          src={"/aw.webp"}
          alt="Hero image"
          className="w-full h-full object-cover bg-no-repeat"
        />
      )}

      {id == 6 && (
        <img
          src={"/ww2.webp"}
          alt="Hero image"
          className="w-full h-full object-cover bg-no-repeat"
        />
      )}

      {id == 7 && (
        <img
          src={"/ww1.svg"}
          alt="Hero image"
          className="w-full h-full object-cover bg-no-repeat"
        />
      )}
      {id == 8 && (
        <img
          src={"/Rectangle 44(1).png"}
          alt="Hero image"
          className="w-full h-full object-cover bg-no-repeat"
        />
      )}

      <div className=" absolute top-0 left-0 h-full w-full flex items-center justify-center">
        <form
          onSubmit={quickDelivery}
          className="w-[100%] lg:w-[70%] tracking-[0.27px] h-[60%]"
        >
          <span className=" w-[90%] lg:w-[50%]">
            <span className="leading-[10px] lg:leading-[70.44px] inline z-[3] ml-4 lg:ml-0 lg:font-bold text-[24px] md:text-[28px] lg:text-[45px] text-white">
              {renderElement(i18n?.language, hero[0])}{" "}
            </span>
            <span className="leading-[10px] lg:leading-[70.44px] inline z-[3] ml-4 lg:ml-0 lg:font-bold text-[24px] md:text-[28px] lg:text-[45px] text-white">
              {renderElement(i18n?.language, hero[0]) && t(`sto.st34`)}
            </span>
          </span>
          <p className="leading-[42.19px] ml-4 lg:ml-0 mt-[30px] z-[3] font-raleway tetx-[18px] md:text-[21px] lg:text-[25px] text-white lg:font-bold">
            {t(`sto.st1`)}
          </p>

          <div className="w-full grid grid-cols-4 gap-x-3 z-[999999999999] flex-row items-start mt-[20px] lg:mt-[50px] px-4 lg:px-0">
            <select
              required
              onChange={(e) => setProduct({ ...product, id: e.target.value })}
              className="py-3 text-lightGreey px-4 pr-9 h-[50px] md:h-[61.67px] block w-full border-gray-200 rounded-md outline-none text-sm  font-raleway font-medium text-[17px] md:text-[16px] bg-white"
            >
              <option className="text-lightGreey">{t(`sto.st2`)}</option>
              {data?.map((c, index) => {
                return (
                  <option className="text-lightGreey" value={c?.id}>
                    {renderElement(i18n?.language, c)}
                  </option>
                );
              })}
            </select>

            <CalSectionInput
              setState={setStartCity}
              setLocation={setSt}
              placeholder={t(`calsection.cl1`)}
            />
            <CalSectionInput
              setState={setEndCity}
              setLocation={setSt2}
              placeholder={t(`calsection.cl2`)}
            />
            <button
              type="submit"
              // onClick={}
              className="h-[50px] w-full md:h-[61.67px] bg-Primary rounded-md text-white font-medium text-[17px] md:text-[14px] lg:text-[20px]"
            >
              {t(`sto.btn`)}
            </button>
          </div>

          <div className="flex md:flex-row flex-col gap-x-6 mt-4">
            <div className="flex gap-x-2 items-center">
              <Switch
                checked={product.is_transport}
                onClick={() =>
                  setProduct({
                    ...product,
                    is_transport: true,
                    is_cargo: false,
                  })
                }
              />
              <p className="text-[#fff] font-medium text-base font-raleway">
                {t(`calsection.cl5`)}
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <Switch
                checked={product.is_cargo}
                onClick={() =>
                  setProduct({
                    ...product,
                    is_transport: false,
                    is_cargo: true,
                  })
                }
              />
              <p className="text-[#fff] font-medium text-base font-raleway">
                {t(`calsection.cl6`)}
              </p>
            </div>
          </div>
        </form>
      </div>
      {!userCookie && (
        <div className="lg:h-[88px] bg-modalBg w-full flex items-center absolute bottom-0 z-[1]">
          <div className="w-[90%] py-2 lg:w-[55%] mx-auto flex justify-between items-center">
            <p className="font-medium text-white text-[12px] md:text-[14px] lg:text-[19px] font-raleway">
              {t(`sto.st38`)}
            </p>
            <button className="w-[30%] bg-Primary rounded-md py-2 text-white font-medium text-[12px] md:text-[14px] lg:text-[20px]">
              {t(`sto.st39`)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MD_Hero;
