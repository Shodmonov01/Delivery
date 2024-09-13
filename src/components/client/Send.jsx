import { useTranslation } from "react-i18next";
import "./send.css";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import CardSkeleton from "../UI/cardskleton";
import { Link, useNavigate } from "react-router-dom";
import { ServiceContext } from "../../context/ServiceContext";

const Send = () => {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    const { data } = await axios.get(
      `${BASE_URL}/b_api/sayts/servise_all_views/`
    );
    setData(data?.data?.results);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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
  const toggleCard2 = (cardId) => {
    setData((prevCards) =>
      prevCards.map((card) =>
        card?.id === cardId ? { ...card, visible: true } : card
      )
    );
  };

  const toggleCardOver = (cardId) => {
    setData((prevCards) =>
      prevCards.map((card) =>
        card?.id === cardId ? { ...card, visible: !card.visible } : card
      )
    );
    console.log(data);
  };

  const { location, setLocation } = useContext(ServiceContext);
  const navigate = useNavigate();

  const sendService = (item) => {
    setLocation({
      ...location,
      id: item?.id,
      categoryName: item?.translations?.nl?.name,
    });
    navigate("/calculator?step=1");
    window.scrollTo({ top: 0 });
  };
  console.log(`send component re-render`); 
  return (
    <div className="w-[90%] mx-auto zpt-12 lg:pt-24 relative">
      <p className="text-center text-lightGreey text-[20px] sm:text-[28px] md:text-[35px] lg:text-[55px] font-bold ">
        {t(`section5.title`)}
      </p>
      <div className="md:w-[90%] w-[100%] mx-auto mt-12 sm:mt-24 px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div className={` relative`} key={item?.id}>
                <div
                  className={`h-52 md:h-[309px] max-w-[540px] flex justify-center rounded`}
                  onMouseEnter={() => toggleCard2(item?.id)}
                  onMouseOut={() => toggleCardOver(item?.id)}
                >
                  <img
                    src={`${item?.img}`}
                    className={`w-[100%] h-[100%] object-cover rounded-lg ${item?.visible && "blur-sm"
                      }`}
                    alt="card"
                  />
                  {/* <p className="mt-2 font-semibold text-[18px] sm:text-[22px] text-lightGreey">
                      {renderElement(i18n?.language, item)}
                    </p> */}
                </div>
                {item?.visible && (
                  <div
                    onMouseLeave={() => toggleCard2(item?.id)}
                    onMouseEnter={() => toggleCard2(item?.id)}
                    className="absolute top-[30%]  w-[100%] blur-0 flex justify-center flex-col items-center"
                  >
                    <p className="mt-2 font-semibold mb-2 md:mb-4 text-base dm:text-[18px] md:text-[22px] text-white line-clamp-1">
                      {/* {renderElement(i18n?.language, item)} */}
                    </p>
                    <button
                      onClick={() => sendService(item)}
                      className="bg-[#1348F9] rounded-lg py-1 md:py-2 px-3 md:px-6 text-white"
                    >
                      {t(`services.hover1`)}
                    </button>
                    <Link
                      to={`/services/${item?.id}`}
                      className="text-[16px] text-white mt-3"
                    >
                      {t(`services.hover2`)}
                    </Link>
                  </div>
                )}
                <p className="mt-4 font-semibold mb-2 md:mb-4 text-base dm:text-[17px] md:text-[20px] text-[#2F2E40CC]/80 line-clamp-1">
                  {renderElement(i18n?.language, item)}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="gap-x-4 md:w-[80%] gap-y-4 mx-auto hidden md:flex">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
              <div className="flex md:hidden gap-x-4 md:w-[80%] gap-y-4 mx-auto">
                <CardSkeleton />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Send);
