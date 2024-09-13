import { memo } from "react";
import { useTranslation } from "react-i18next";

const Onas = () => {
  const [t] = useTranslation("global");
  return (
    <div className="w-[100%] md:w-[90%] mx-auto mt-12 relative">
      <div className="w-[100%] flex flex-col justify-center items-center">
        <p className="font-medium text-center text-[24px] sm:text-[28px] md:text-[35px] lg:text-[45px] text-lightGreey">
          {t(`section3.title`)}
        </p>
        <div className="w-[75%]">
          <p className="font-normal text-[18px] text-center md:text-[22px] text-lightGreey">
            {t(`section3.text`)}
          </p>
        </div>
        <div className="w-[75%] flex justify-end my-8 sm:ml-[6%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
            <div>
              <div className="relative">
                <img
                  src={"/avto1.svg"}
                  className="w-[70%] mx-auto h-[70%]"
                  alt={"avto1"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="font-medium text-center text-[15px] md:text-[18px] mt-3 text-lightGreey">
                {t(`section3.card.title`)}
              </p>
              <p className="text-center font-medium text-[18px] sm:text-[19px] text-lightGreey">
                160 x 120 x 120 {t(`section3.card.len`)},
                {t(`section3.card.weight`)}, {t(`section3.card.sum`)}{" "}
                {t(`section3.card.count`)}
              </p>
              <p className="text-center text-[#1348F9] mt-6 font-medium text-[16px] md:text-[22px]">
                {t(`section3.card.sum`)} 49,- €
              </p>
            </div>

            <div>
              <div className="relative">
                <img
                  src={"/avto2.svg"}
                  className="w-[70%] mx-auto h-[70%]"
                  alt={"avto1"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="font-medium text-center text-[15px] md:text-[18px] mt-3 text-lightGreey">
                {t(`section3.card2.title`)}
              </p>
              <p className="text-center font-medium text-[18px] sm:text-[19px] text-lightGreey">
                320 x 130 x 160 {t(`section3.card2.len`)},
                {t(`section3.card2.weight`)}, {t(`section3.card2.sum`)}{" "}
                {t(`section3.card2.count`)}
              </p>
              <p className="text-center text-[#1348F9] mt-6 font-medium text-[16px] md:text-[22px]">
                {t(`section3.card.sum`)} 69,- €
              </p>
            </div>

            <div>
              <div className="relative">
                <img
                  src={"/avto3.svg"}
                  className="w-[70%] mx-auto h-[70%]"
                  alt={"avto1"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="font-medium text-center text-[15px] md:text-[18px] mt-3 text-lightGreey">
                {t(`section3.card3.title`)}
              </p>
              <p className="text-center font-medium text-[18px] sm:text-[19px] text-lightGreey">
                420 x 210 x 210 {t(`section3.card3.len`)},
                {t(`section3.card3.weight`)}, {t(`section3.card3.sum`)}{" "}
                {t(`section3.card3.count`)}
              </p>
              <p className="text-center text-[#1348F9] mt-6 font-medium text-[16px] md:text-[22px]">
                {t(`section3.card.sum`)} 119,- €
              </p>
            </div>

            <div>
              <div className="relative">
                <img
                  src={"/avto4.svg"}
                  className="w-[70%] mx-auto h-[70%]"
                  alt={"avto1"}
                  width={100}
                  height={100}
                />
              </div>
              <p className="font-medium text-center text-[15px] md:text-[18px] mt-3 text-lightGreey">
                {t(`section3.card4.title`)}
              </p>
              <p className="text-center font-medium text-[18px] sm:text-[19px] text-lightGreey">
                420 x 210 x 210 {t(`section3.card4.len`)},
                {t(`section3.card4.weight`)}, {t(`section3.card4.sum`)}{" "}
                {t(`section3.card4.count`)}
              </p>
              <p className="text-center text-[#1348F9] mt-6 font-medium text-[16px] md:text-[22px]">
                {t(`section3.card.sum`)} 179,- €
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 odd:bg-[#F4F4F4] even:bg-white w-[90%] items-center mr-[10%] mx-auto">
        <div className="flex items-center bg-[#F4F4F4]">
          <div className="w-[60%] sm:w-[17%] flex justify-center justify-between items-center">
            <div className="py-4 px-4">
              <p className="font-normal sm:font-semibold text-[14px] md:text-[20px] lg:text-[22px]">
                {t(`section4.li1`)}
              </p>
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center ">
          <div className="w-[60%] sm:w-[17%] flex justify-between items-center">
            <div className="py-4 px-4">
              <p className="font-normal sm:font-semibold text-[14px] md:text-[20px] lg:text-[22px]">
                {t(`section4.li2`)}
              </p>
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="w-[10px] md:w-[30px] h-[10px] sm:h-[30px] bg-[#C4C4C4] flex items-center justify-center rounded-full text-[10px] sm:text-[20px] font-bold text-white">
              x
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="w-[10px] md:w-[30px] h-[10px] sm:h-[30px] bg-[#C4C4C4] flex items-center justify-center rounded-full text-[10px] sm:text-[20px] font-bold text-white">
              x
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center bg-[#F4F4F4]">
          <div className="w-[60%] sm:w-[17%] flex justify-center justify-between flex items-center">
            <div className="py-4 px-4">
              <p className="font-normal sm:font-semibold text-[14px] md:text-[20px] lg:text-[22px]">
                {t(`section4.li3`)}
              </p>
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="w-[10px] md:w-[30px] h-[10px] sm:h-[30px] bg-[#C4C4C4] flex items-center justify-center rounded-full text-[10px] sm:text-[20px] font-bold text-white">
              x
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="w-[10px] md:w-[30px] h-[10px] sm:h-[30px] bg-[#C4C4C4] flex items-center justify-center rounded-full text-[10px] sm:text-[20px] font-bold text-white">
              x
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="w-[10px] md:w-[40px] h-[10px] sm:h-[40px]">
              <img
                src={"/match.svg"}
                className="w-[70%] mx-auto h-[70%]"
                alt="match"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="w-[10px] md:w-[30px] h-[10px] sm:h-[30px] bg-[#C4C4C4] flex items-center justify-center rounded-full text-[10px] sm:text-[20px] font-bold text-white">
              x
            </p>
          </div>
        </div>

        <div className="flex items-center ">
          <div className="w-[60%] sm:w-[17%] flex justify-center justify-between flex items-center">
            <div className="py-4 px-4">
              <p className="hidden md:flex font-normal sm:font-semibold text-[14px] md:text-[20px] lg:text-[22px]">
                {t(`section4.li4`)}
              </p>
              <p className="flex md:hidden font-normal sm:font-semibold text-[14px] md:text-[20px] lg:text-[22px]">
                {t(`section4.li4`)}
              </p>
            </div>
          </div>
          <div className="w-[20%] flex justify-center z-20">
            <p className="md:font-medium text-[14px] font-normal sm:text-[18px] md:text-[20px] text-lightGreey">
              {t(`section4.no`)}
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="md:font-medium text-[14px] font-normal sm:text-[18px] md:text-[20px] text-lightGreey">
              {t(`section4.no`)}
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <p className="md:font-medium text-[14px] font-normal sm:text-[18px] md:text-[20px] text-lightGreey">
              {t(`section4.no`)}
            </p>
          </div>
          <div className="w-[20%] flex justify-center">
            <div className="">
              <p className="font-normal z-[999] md:font-medium text-center text-[14px] sm:text-[18px] md:tetx-[20px] text-lightGreey">
                {t(`section4.desc`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Onas);
