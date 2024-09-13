import React from "react";
import { useTranslation } from "react-i18next";

const Onas = ({ id }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="w-full ">
      <div className="w-[98%] flex justify-center sm:mt-12">
        <p className="font-semibold lg:text-[40px] md:text-[32px] text-[24px] text-lightGreey">
          {t(`sto.st3`)}
        </p>
      </div>

      {id == 4 && (
        <div className="w-[80%] mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
          <div className="flex w-full flex-col">
            <div className="w-full">
              <img
                src="/Rectangle 49 (2).png"
                className="w-full object-cover"
              />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`sto.blog.bir`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`sto.blog.d1`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img
                src="/Rectangle 49 (3).png"
                className="w-full object-cover"
              />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`sto.blog.ikki`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`sto.blog.d2`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img
                src="/Rectangle 49 (4).png"
                className="w-full object-cover"
              />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`sto.blog.uch`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`sto.blog.d3`)}
            </p>
          </div>
        </div>
      )}

      {id == 5 && (
        <div className="w-[80%] mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop1.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.bir.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.bir.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop2.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.ikki.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.ikki.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop3.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.uch.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.uch.text`)}
            </p>
          </div>
        </div>
      )}

      {id == 8 && (
        <div className="w-[80%] mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop4.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.turt.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.turt.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop5.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.besh.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.besh.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop6.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.olti.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.olti.text`)}
            </p>
          </div>
        </div>
      )}

      {id == 6 && (
        <div className="w-[80%] mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop7.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.yetti.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.yetti.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop8.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.sakkiz.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.sakkiz.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop9.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.tuqqiz.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.tuqqiz.text`)}
            </p>
          </div>
        </div>
      )}

      {id == 7 && (
        <div className="w-[80%] mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8">
          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop10.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.un.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.un.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop11.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.unbir.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.unbir.text`)}
            </p>
          </div>

          <div className="flex w-full flex-col">
            <div className="w-full">
              <img src="/oop12.png" className="w-full object-cover" />
            </div>
            <p className="mb-2 mt-2 leading-[29.35px] text-[16px] md:text-[17px] lg:text-[20px] font-medium md:font-semibold font-raleway text-lightGreey">
              {t(`work.unikki.title`)}
            </p>
            <p
              className="font-raleway font-normal text-[13px] md:text-[16px] text-justify sm:text-start"
              style={{ color: "rgba(47, 46, 64, 0.6)" }}
            >
              {t(`work.unikki.text`)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onas;
