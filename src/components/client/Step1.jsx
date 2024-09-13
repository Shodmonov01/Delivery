import { BASE_URL } from "../../service/auth";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Step1 = ({ setID, setStep, step, setCategory1, category1 }) => {
  const [data, setData] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [t, i18n] = useTranslation("global");
  const stepHandler = useCallback((e) => {
    e.preventDefault();
    if (isValidated) {
      const newStep = {
        ...step,
        step2: !step.step2,
        step1: false,
        step3: false,
        step4: false,
        active1: true,
      };
      setStep(newStep);
      window.scrollTo({ top: 0 });
    } else {
      toast("выберите одну из категорий");
    }
  }, [isValidated, step, setStep]);

  const [loader, setLoader] = useState(false);
  const getCardData = useCallback(async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/service_get_post_views/`
      );
      setLoader(false);
      setData(data?.data?.results);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCardData();
  }, [getCardData]);

  const toggleCard = useCallback((cardId) => {
    data?.map((c) => c.id == cardId && setCategory1(renderElement(i18n?.language, c)));
    setData((prevCards) =>
      prevCards.map((card) =>
        card?.id === cardId
          ? { ...card, visible: !card.visible, subData: data }
          : card
      )
    );
    setData((prevCards) =>
      prevCards.map((card) =>
        card?.id != cardId ? { ...card, visible: false } : card
      )
    );
  }, [data, setCategory1, i18n?.language]);

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

  console.log(data[0]?.translations);

  return loader ? (
    <Loader />
  ) : (
    <div className="sm:mt-12">
      <p className="text-center font-montserrat font-semibold text-[17px] lg:hidden text-lightGreey">
        {t(`cal.form.t1`)}
      </p>
      <p className="text-center font-normal text-lightGreey mb-6 text-[15px] mt-2 sm:text-[20px]">
        {t(`cal.form.p1`).split(" ")[0]} {category1}
      </p>
      <div className="mb-6 flex w-full justify-end text-white ">
        <button
          onClick={stepHandler}
          className="py-2 px-6 text-[18px] font-montserrat bg-Primary rounded-md mt-8 md:mt-0"
        >
          {t(`cal.form.btn`)}
        </button>
      </div>
      {/* <p className="text-center font-montserrat font-semibold text-[17px] mt-2 text-lightGreey mb-6 md:mb-12">
        {t(`cal.form.hero`)}
      </p> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 ">
        {data?.map((item, index) => (
          <div
            onClick={() => {
              setID(String(item?.id));
              setIsValidated(true);
              toggleCard(item?.id);
            }}
            key={index}
            className={`${
              item?.visible && "border-2 border-Primary bg-white"
            } cursor-pointer hover:placeholder:border-2 border bg-white h-[220px] sm:h-[320px] rounded-lg shadow-xl flex justify-center items-center`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="w-[80%]">
                <img
                  src={item?.img_service}
                  className="h-[141px] w-[146px]  mx-auto"
                  alt={"cal1"}
                />
              </div>
              <p className="mt-8 text-center font-normal line-clamp-1 text-[17px] sm:text-[20px] px-4 text-lightGreey">
                {item?.id == 5 && t(`stepone.bir`) || item?.id == 6 && t(`stepone.ikki`) || item?.id == 7 && t(`stepone.uch`) || item?.id == 8 && t(`stepone.turt`) || renderElement(i18n?.language, data[index])}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="hidden sm:flex w-full justify-end text-white ">
        <button
          onClick={stepHandler}
          className="py-2 px-6 text-[18px] font-montserrat bg-Primary rounded-md mt-8 md:mt-0"
        >
          {t(`cal.form.btn`)}
        </button>
      </div> */}
    </div>
  );
};

export default memo(Step1);
