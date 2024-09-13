import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Hero2 = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();
  const sendCalc = () => {
    navigate("/calculator");
    window.scrollTo({ top: 0 });
  };
  return (
    <div className="flex lg:flex-row md:justify-between flex-col w-[100%] mx-auto pt-[40px]">
      <div className="w-[90%] mx-auto lg:w-[40%] 2xl:w-[820px] pl-4 sm:pl-0 sm:px-0 sm:ml-[5%]  z-40 lg:mt-6">
        <p
          className="hidden md:flex font-semibold md:leading-[60px] md:font-bold text-[18px] sm:mb-0 sm:text-[24px] md:text-[40px] 2xl:text-[55px] "
          style={{ color: "rgba(47, 46, 64, 1)" }}
        >
          {t(`hero2.title`)}
        </p>
        <p className="flex md:hidden text-center font-semibold md:font-bold text-[22px] mb-4 sm:mb-0 sm:text-[24px] md:text-[28px] lg:text-[65px] text-[#2F2E40]">
          {t(`hero2.title`)}
        </p>
        <p className="font-normal mt-4 text-[18px] 2xl:text-[21px] text-lightGreey">
          {t(`hero2.title2`)}
        </p>
        <p className="mt-4 md:mt-8 font-normal text-[18px] 2xl:text-[21px] text-lightGreey">
          {t(`hero2.title3`)}
        </p>
        <div className="w-[95%] mx-auto flex flex-col pb-6 pt-3 sm:pt-0">
          <div className="w-[100%] md:w-[90%] flex flex-col lg:pt-6">
            <div
              role="button"
              onClick={sendCalc}
              className="bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  md:w-[100%]  text-white flex items-center py-2 justify-around sm:py-4 px-1 sm:px-4 rounded-lg"
            >
              <p className="flex font-montserrat text-[18px] sm:text-[14px] 2xl:text-[17px]">
                <p className="mr-2">{t(`hero1.btn.left`)}</p>
                <div className="hidden lg:flex">{t(`hero1.btn.right`)}</div>
              </p>
              <div className="w-[30px] h-[30px] md:w-[38.89px] md:h-[38.89px]">
                <img
                  className="sm:ml-3 ml-1"
                  src={"/calc.svg"}
                  alt="calc"
                  height={100}
                  width={100}
                />
              </div>
            </div>
          </div>
          {/* <p className="mt-2 lg:mt-3 text-[12px] lg:text-[20px] font-medium text-lightGreey font-montserrat">
              {t(`hero1.btn.text`)}
            </p> */}
        </div>
      </div>
      <div className="w-[100%] lg:w-[40%] 2xl:w-[660px] hidden mb-24 xl:flex justify-end relative">
        <div className="z-20 absolute right-0 bottom-0 md:w-[80%]">
          <img
            src={"/hero3.png"}
            alt={"hero"}
            width={700}
            height={718}
            className="z-20 object-cover"
          />
        </div>

        <div className="absolute right-0 bottom-0 w-[320px] lg:w-[100%] z-10">
          <img
            src={"/fullRight.svg"}
            width={850}
            alt={"check"}
            height={718}
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Hero2);
