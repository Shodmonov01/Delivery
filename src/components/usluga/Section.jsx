import React from "react";
import { useTranslation } from "react-i18next";

const Section = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-[98%] mt-12 md:mt-24 md:w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="h-[130px]">
            <img src="/Mask group (1).svg" alt="" className="object-cover" />
          </div>
          <p className="h-[80px] mt-6 text-[#1348F9] text-center font-medium leading-[33.49px] font-raleway text-[17px] md:text-[20.34px]">
            {/* Лучшие цены на вашу <br /> доставку */}
            {t(`sto.st5`)}
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="h-[130px]">
            <img src="/Mask group (2).svg" alt="" className="object-cover" />
          </div>
          <p className="h-[80px] mt-6 text-[#1348F9] text-center font-medium leading-[33.49px] font-raleway text-[17px] md:text-[20.34px]">
            {/* Только проверенные поставщики <br /> транспортных услуг */}
            {t(`sto.st6`)}
          </p>
        </div>

        <div className="flex flex-col w-full justify-center items-center">
          <div className="h-[130px]">
            <img src="/Mask group (3).svg" alt="" className="object-cover" />
          </div>
          <p className="h-[80px] mt-6 text-[#1348F9] text-center font-medium leading-[33.49px] font-raleway text-[17px] md:text-[20.34px]">
            {/* 97% довольных <br /> клиентов с 2010 года */}
            {t(`sto.st7`)}
          </p>
        </div>

        <div className="flex flex-col w-full justify-center items-center">
          <div className="h-[130px]">
            <img src="/Mask group (4).svg" alt="" className="object-cover" />
          </div>
          <p className="h-[80px] mt-6 text-[#1348F9] text-center font-medium leading-[33.49px] font-raleway text-[17px] md:text-[20.34px]">
            {/* Мы поддерживаем <br /> экологический транспорт */}
            {t(`sto.st8`)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
