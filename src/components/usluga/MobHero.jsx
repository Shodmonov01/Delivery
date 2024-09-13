import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../context/ServiceContext";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import CalSectionInput from "../UI/CalInput";
import { Switch } from "@mui/material";

const MOB_Hero = ({ hero, card, id }) => {
  const userCookie = localStorage.getItem("user");

  const [st, setSt] = useState();
  const [st2, setSt2] = useState();
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
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
    var distance = R * c; // Masoitemap.xmlfa kilometrda

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
    <div
      className="relative top-[-70px] h-screen sm:hidden"
      style={{
        // backgroundImage: "url('./Rectangle 44.svg')",
        objectFit: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* <img src={'/Rectangle 44.svg'} alt="logo" className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30" /> */}
      {id == 4 && (
        <img
          src={"/Rectangle 44.webp"}
          alt="Hero image"
          className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30"
        />
      )}

      {id == 5 && (
        <img
          src={"/aw.webp"}
          alt="Hero image"
          className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30"
        />
      )}

      {id == 6 && (
        <img
          src={"/ww2.webp"}
          alt="Hero image"
          className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30"
        />
      )}

      {id == 7 && (
        <img
          src={"/ww1.svg"}
          alt="Hero image"
          className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30"
        />
      )}
      {id == 8 && (
        <img
          src={"/Rectangle 44(1).png"}
          alt="Hero image"
          className="object-cover absolute top-0 left-0 md:hidden h-[100%] -z-30"
        />
      )}

      <form
        onSubmit={quickDelivery}
        className="flex flex-col py-6 md:hidden w-[80%] mx-auto pt-[60px]"
      >
        <span className=" w-[90%] lg:w-[50%]">
          <span className="leading-[30px] lg:leading-[70.44px] inline z-[3] ml-4 lg:ml-0 lg:font-bold text-[24px] md:text-[28px] lg:text-[45px] text-white">
            {renderElement(i18n?.language, hero[0])}{" "}
          </span>
          <span className="leading-[10px] lg:leading-[70.44px] inline z-[3] sm:ml-4 lg:ml-0 lg:font-bold text-[24px] md:text-[28px] lg:text-[45px] text-white">
            {renderElement(i18n?.language, hero[0]) && t(`sto.st34`)}
          </span>
        </span>
        <p className="text-[15px] mob:text-[18px] font-normal text-white text-center mt-4">
          {t(`sto.st1`)}
        </p>

        <div className="w-full flex flex-col gap-y-4 justify-between mt-[20px] px-4 ">
          <select
            required
            onChange={(e) =>
              setLocation({ ...location, id: parseInt(e.target.value) })
            }
            class="py-3 px-4 pr-9 w-full block  border-gray-200 rounded-md outline-none border text-sm  font-raleway font-medium text-[17px] md:text-[14px] lg:text-[20px] bg-white"
          >
            <option className="text-lightGreey">{t(`sto.st2`)}</option>

            {card?.map((c, index) => (
              <option key={index} value={c?.id}>
                {c?.name}
              </option>
            ))}
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
            className="w-full bg-Primary py-2 rounded-md text-white font-medium text-[18px]"
          >
            {t(`sto.btn`)}
          </button>
        </div>
        <div className="flex md:flex-row flex-col gap-x-6 mt-4 px-4">
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
      {!userCookie && (
        <div className="lg:h-[88px] bg-modalBg w-full flex items-center absolute bottom-0 py-2 z-[1]">
          <div className="w-[90%] py-2 gap-y-2 lg:w-[55%] mx-auto flex flex-col justify-between items-center">
            <p className="font-medium text-white text-[12px] md:text-[14px] lg:text-[19px] font-raleway">
              {t(`sto.st38`)}
            </p>
            <button className="w-auto px-3 bg-Primary rounded-md py-2 text-white font-medium text-[12px] md:text-[14px] lg:text-[20px]">
              {t(`sto.st39`)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MOB_Hero;
