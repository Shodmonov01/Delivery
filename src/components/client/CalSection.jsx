import { Switch } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useTranslation } from "react-i18next";
import CalSectionInput from "../UI/CalInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCalc } from "../../hooks/useCalc";
import Loader from "./Loader";

const CalSection = () => {
  const [isLoading] = useState(false);
  const [st, setSt] = useState();
  const [st2, setSt2] = useState();
  const [startCity, setStartCity] = useState("");
  const [endCity, setEndCity] = useState("");
  const [t] = useTranslation("global");
  const [isSelect, setIsSelect] = useState(false);
  const navigate = useNavigate();
  const {
    setCalcData,
    oldId,
    name,
    count,
    length,
    width,
    height,
    weight,
    is_transport,
    is_cargo,
    cargo,
    oldKm,
    price_km,
    oldStartCity,
    oldEndCity,
    oldSt,
    oldSt2,
  } = useCalc();
  const storageData = {
    id: oldId,
    name,
    count,
    length,
    width,
    height,
    weight,
    is_transport,
    is_cargo,
    cargo,
    km: oldKm,
    price_km,
  };
  const [product, setProduct] = useState(
    storageData || {
      oldId: uuidv4(),
      name: "snelle levering",
      count: 1,
      length: "",
      width: "",
      height: "",
      weight: "",
      is_transport: true,
      is_cargo: false,
      cargo: "",
      oldKm: "",
      price_km: 0,
    }
  );

  const calculateDistance = useCallback(
    (lat1, lon1, lat2, lon2) => {
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
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c; // Masofa kilometrda
      setProduct((prevProduct) => ({
        ...prevProduct,
        km: distance,
      }));
      return distance;
    },
    [setProduct]
  );

  useEffect(() => {
    if (st && st2) {
      calculateDistance(st[0], st[1], st2[0], st2[1]);
    }
  }, [calculateDistance, st, st2]);

  const quickDelivery = async (e) => {
    e.preventDefault();
    if (product.length && product.width && product.height && product.weight) {
      setCalcData({
        oldId: product.id,
        name: "snelle levering",
        count: 1,
        length: product.length,
        width: product.width,
        height: product.height,
        weight: product.weight,
        is_transport: product.is_transport,
        is_cargo: product.is_cargo,
        cargo: product.cargo,
        oldKm: product.km,
        oldStartCity: startCity,
        oldEndCity: endCity,
        oldSt: st,
        oldSt2: st2,
      });
      window.scrollTo({ top: 0 });

      navigate(
        `/calculator?quick=true&startCity=${startCity}&endCity=${endCity}&st=${JSON.stringify(
          st
        )}&st2=${JSON.stringify(st2)}&product=${JSON.stringify(product)}`
      );
    } else {
      toast.error("Заполните все поля");
    }
  };
  useEffect(() => {
    setStartCity(oldStartCity);
    setEndCity(oldEndCity);
    setSt(oldSt);
    setSt2(oldSt2);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={quickDelivery}
      className={`mt-12 mb-36 mx-auto w-[96%] md:w-[90%] flex flex-col gap-y-6 relative shadow-lg rounded-[20px] p-6 md:min-h-[254px]`}
    >
      <div className="absolute bottom-0 right-0  -z-10 md:z-[1] md:flex hidden">
        <svg
          width="211"
          height="190"
          viewBox="0 0 211 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M66.1405 0.172649C69.4724 1.05418 72.6004 4.22391 73.2602 7.38722C74.3427 12.5773 72.0259 17.6658 67.5125 20.012C65.9645 20.8167 65.8521 20.8367 62.9509 20.8251C60.1657 20.814 59.8836 20.7668 58.5193 20.0862C56.8446 19.2504 54.7769 17.4846 54.5385 16.6864C54.449 16.3866 54.0271 15.5881 53.6008 14.9117C52.8344 13.6953 52.8258 13.6464 52.8258 10.4633C52.8258 8.21265 52.9333 6.9844 53.1836 6.37966C54.1743 3.98444 56.388 1.48394 58.366 0.526049C59.3303 0.0589659 64.7753 -0.188413 66.1405 0.172649ZM28.0153 10.9576C31.7005 12.2244 32.3115 12.7997 67.62 48.2421C84.9784 65.6665 102.295 82.9765 106.101 86.7085C109.907 90.4407 114.435 94.9956 116.163 96.8306C117.891 98.6656 120.951 101.724 122.963 103.627C124.975 105.53 127.317 107.865 128.168 108.817C130.169 111.055 132.625 113.194 134.151 114.026C135.226 114.613 135.552 114.673 137.08 114.563C139.181 114.412 140.441 113.633 141.573 111.782C142.24 110.691 142.329 110.328 142.329 108.683C142.33 107.007 142.248 106.685 141.511 105.471C141.06 104.728 139.858 103.12 138.841 101.897C137.824 100.674 123.311 85.9382 106.591 69.1516C80.1851 42.6416 76.0132 38.3546 74.8444 36.53C72.2601 32.4955 71.7421 30.3299 72.6793 27.4787C74.6565 21.4637 80.8284 18.2648 86.3531 20.3916C87.3058 20.7584 88.549 21.37 89.1159 21.7509C89.6827 22.1317 90.2701 22.4434 90.421 22.4434C90.5719 22.4434 101.315 33.0526 114.294 46.0192C127.273 58.9858 140.888 72.5589 144.55 76.1816C148.211 79.8043 162.192 93.7543 175.617 107.182C202.498 134.066 202.316 133.901 205.039 133.901C207.422 133.901 208.57 133.226 209.823 131.091C210.192 130.462 210.608 129.947 210.747 129.947C210.918 129.947 211 139.639 211 159.973V173.104C211 182.435 203.435 190 194.104 190H177.868C177.471 190 177.114 189.754 176.973 189.382C176.844 189.042 176.653 188.764 176.548 188.764C176.443 188.764 176.06 188.458 175.697 188.084C172.968 185.275 170.668 182.983 169.313 181.721C168.438 180.905 166.084 178.539 164.083 176.463C162.082 174.387 160.115 172.487 159.713 172.242C159.31 171.997 158.656 171.36 158.258 170.827C157.019 169.167 150.755 162.892 149.912 162.466C149.472 162.243 149.111 161.935 149.111 161.781C149.111 161.432 143.817 155.96 140.185 152.554C139.602 152.008 137.072 149.4 134.564 146.759C128.864 140.759 106.586 118.289 57.5276 69.0577C36.5172 47.9733 18.78 30.0551 18.112 29.2395C15.4489 25.9885 14.4717 22.9057 14.9781 19.3542C15.9245 12.7201 21.9164 8.86088 28.0153 10.9576ZM24.3399 55.7231C25.2174 56.054 26.5388 56.7915 27.2765 57.3619C28.0143 57.9322 43.8842 73.6917 62.5431 92.3829C96.5817 126.48 103.445 133.28 105.961 135.401C106.707 136.03 109.814 138.984 112.865 141.967C115.917 144.949 119.634 148.544 121.125 149.955C122.617 151.366 124.021 152.819 124.244 153.184C124.468 153.549 125.239 154.336 125.959 154.933C127.192 155.956 129.702 158.434 134.902 163.762C136.14 165.03 137.929 166.827 138.878 167.754C139.828 168.682 141.113 169.979 141.735 170.638C142.358 171.297 143.417 172.281 144.089 172.824C144.761 173.368 146.138 174.749 147.149 175.893C148.161 177.037 150.479 179.428 152.302 181.206C154.125 182.984 155.9 184.751 156.247 185.132C156.594 185.514 157.682 186.648 158.666 187.653C159.649 188.658 160.453 189.597 160.453 189.74C160.453 189.921 148.129 190 119.953 190H80.1991C79.7442 190 79.3313 189.734 79.1429 189.32C78.9725 188.946 78.0437 187.974 77.0788 187.158C76.114 186.342 75.0927 185.397 74.8089 185.057C74.4088 184.578 70.5793 180.743 66.5849 176.821C66.4226 176.662 65.4795 175.654 64.489 174.582C63.4988 173.51 61.7634 171.817 60.6327 170.82C59.5019 169.823 58.2693 168.587 57.8938 168.074C57.2315 167.169 53.9765 163.899 51.7162 161.868C51.106 161.32 50.4028 160.651 50.1537 160.382C49.7185 159.912 43.9165 154.088 42.692 152.892C42.3656 152.573 40.795 150.936 39.2021 149.253C37.609 147.571 34.4749 144.46 32.2373 142.34C27.6156 137.961 24.1254 134.068 22.0914 131.025C19.7986 127.594 19.1321 124.058 20.1536 120.743C21.1194 117.608 23.8283 115.234 27.264 114.51C30.1915 113.892 32.0908 114.054 34.9495 115.163C37.1309 116.009 38.6417 117.304 45.552 124.25C57.5197 136.28 59.8286 138.441 61.6345 139.305C62.5278 139.733 63.7513 140.15 64.3534 140.232C66.5558 140.535 68.9921 138.784 69.9616 136.202C71.0179 133.388 70.1794 130.776 67.2787 127.846C66.3368 126.894 61.9785 122.538 57.5935 118.165C33.7433 94.382 12.9955 73.3225 12.473 72.3671C12.1552 71.7863 11.7417 71.0294 11.554 70.6848C9.84212 67.542 9.90869 63.8897 11.7365 60.6875C12.5591 59.2468 15.4498 56.3007 16.0411 56.3007C16.2428 56.3007 17.0015 56.0236 17.7269 55.6853C19.515 54.851 22.066 54.8656 24.3399 55.7231ZM192.095 76.4139C193.598 76.9507 194.909 77.6061 195.547 78.1399C196.113 78.6131 199.643 82.0505 203.392 85.7783C207.141 89.5063 210.386 92.6249 210.604 92.7087C210.962 92.8463 211 94.4144 211 109.056C211 119.042 210.911 125.251 210.767 125.251C210.64 125.251 210.168 124.786 209.719 124.217C209.271 123.648 204.688 118.918 199.535 113.705C179.543 93.4812 179.257 93.1708 177.902 90.2163C177.254 88.803 177.137 88.2518 177.13 86.5664C177.123 84.8802 177.244 84.2752 177.939 82.548C178.655 80.7676 178.979 80.3077 180.541 78.8492C182.721 76.8135 184.861 75.8756 187.78 75.6772C189.495 75.5605 189.899 75.6295 192.095 76.4139ZM13.8373 91.1779C19.0618 92.724 22.1442 97.7603 21.0494 102.961C19.6504 109.606 14.0676 113.186 7.69621 111.523C4.00705 110.56 1.89297 108.168 0.421936 103.293C-0.271652 100.995 -0.147629 99.7908 1.07436 96.9712C2.23201 94.2994 4.19765 92.2653 6.42934 91.4297C8.54219 90.6384 11.6569 90.5326 13.8373 91.1779Z"
            fill="url(#paint0_linear_21_446)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_21_446"
              x1="373.736"
              y1="-28.8199"
              x2="-50.3468"
              y2="-26.7911"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.174199" stop-color="#1348F9" />
              <stop offset="0.774517" stop-color="#1E86FA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="font-raleway md:text-start text-center font-semibold xl:font-bold md:text-[35px] text-[24px] text-[#2F2E40] mt-3">
        {t(`calsection.title`)}
      </h3>
      <div className="grid md:w-[80%] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-2 gap-x-6">
        <CalSectionInput
          setState={setStartCity}
          state={startCity}
          setLocation={setSt}
          placeholder={t(`calsection.cl1`)}
        />
        <CalSectionInput
          setState={setEndCity}
          state={endCity}
          setLocation={setSt2}
          placeholder={t(`calsection.cl2`)}
        />

        <div
          onClick={() => setIsSelect((prev) => !prev)}
          className="h-[50px] md:h-[61.67px] relative flex items-center justify-between bgImage rounded-lg md:rounded-[9px] cursor-pointer outline-none border border-[#D0D5DD] text-base md:text-[17px]  text-[#fff] placeholder:text-[16px] px-4 font-semibold placeholder:font-semibold"
        >
          {t(`calsection.cl3`)}
          <svg
            onClick={() => setIsSelect((prev) => !prev)}
            width="19"
            height="10"
            viewBox="0 0 19 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isSelect && "rotate-180"}`}
          >
            <path
              d="M17.4746 1L9.47461 9L1.47461 1"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/* Select section */}
          {isSelect && (
            <div
              // role="button"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[50px] w-full md:top-[61.67px] rounded-b-[14px] shadow-md left-0 z-30 flex flex-col gap-y-4 md:gap-y-6 p-3 md:p-4 bg-white"
            >
              <div className="flex justify-between gap-x-3 w-full items-center">
                <p className="text-base text-[#2F2E40CC]/80 w-[30%] font-raleway font-semibold">
                  {t(`calsection.a1`)}
                </p>
                <input
                  type="number"
                  required
                  value={product.length}
                  onChange={(e) =>
                    setProduct({ ...product, length: e.target.value })
                  }
                  placeholder={t(`calsection.sm`)}
                  className="h-[42px] w-[70%] outline-none text-[#2F2E40CC] px-3 focus:border-2 focus:border-Primary bg-[#CAC9C91A]/10 rounded-[14px] border"
                />
              </div>
              <div className="flex justify-between gap-x-3 w-full items-center">
                <p className="text-base text-[#2F2E40CC]/80 w-[30%] font-raleway font-semibold">
                  {t(`calsection.a2`)}
                </p>
                <input
                  type="number"
                  required
                  value={product.width}
                  onChange={(e) =>
                    setProduct({ ...product, width: e.target.value })
                  }
                  placeholder={t(`calsection.sm`)}
                  className="h-[42px] w-[70%] outline-none text-[#2F2E40CC] px-3 focus:border-2 focus:border-Primary bg-[#CAC9C91A]/10 rounded-[14px] border"
                />
              </div>
              <div className="flex justify-between gap-x-3 w-full items-center">
                <p className="text-base text-[#2F2E40CC]/80 w-[30%] font-raleway font-semibold">
                  {t(`calsection.a3`)}
                </p>
                <input
                  type="number"
                  required
                  value={product.height}
                  onChange={(e) =>
                    setProduct({ ...product, height: e.target.value })
                  }
                  placeholder={t(`calsection.sm`)}
                  className="h-[42px] w-[70%] outline-none text-[#2F2E40CC] px-3 focus:border-2 focus:border-Primary bg-[#CAC9C91A]/10 rounded-[14px] border"
                />
              </div>
              <div className="flex justify-between gap-x-3 w-full items-center">
                <p className="text-base text-[#2F2E40CC]/80 w-[30%] font-raleway font-semibold">
                  {t(`calsection.a4`)}
                </p>
                <input
                  type="number"
                  required
                  value={product.weight}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      weight: e.target.value,
                      cargo: e.target.value,
                    })
                  }
                  placeholder={t(`calsection.kg`)}
                  className="h-[42px] w-[70%] outline-none text-[#2F2E40CC] px-3 focus:border-2 focus:border-Primary bg-[#CAC9C91A]/10 rounded-[14px] border"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSelect(false)}
                className="bgImage h-[47px] text-center text-white rounded-[10px] w-full"
              >
                {t(`calsection.cl7`)}
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="h-[50px] md:h-[61.67px] flex items-center justify-center bgImage rounded-lg md:rounded-[9px] cursor-pointer outline-none border border-[#D0D5DD] text-base md:text-[17px]  text-[#fff] placeholder:text-[16px] px-4 font-semibold placeholder:font-semibold"
        >
          {t(`calsection.cl4`)}
        </button>
      </div>
      <div className="flex md:flex-row flex-col gap-x-6">
        <div className="flex gap-x-2 items-center">
          <Switch
            checked={product.is_transport}
            onClick={() =>
              setProduct({ ...product, is_transport: true, is_cargo: false })
            }
          />
          <p className="text-[#2F2E40] font-medium text-base font-raleway">
            {t(`calsection.cl5`)}
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <Switch
            checked={product.is_cargo}
            onClick={() =>
              setProduct({ ...product, is_transport: false, is_cargo: true })
            }
          />
          <p className="text-[#2F2E40] font-medium text-base font-raleway">
            {t(`calsection.cl6`)}
          </p>
        </div>
      </div>
    </form>
  );
};

export default memo(CalSection);
