import ReactStars from "react-stars";
import RootLayout from "../../components/layouts/RootLayout";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const [t] = useTranslation("global");
  return (
    <RootLayout title="Отзывы">
      <div className="w-[90%] mx-auto">
        <p className=" mt-4 md:mt-8 text-center font-semibold md:font-bold text-[18px] mb-4 sm:mb-0 sm:text-[24px] md:text-[28px] lg:text-[55px] text-[#2F2E40]">
          {t(`partners.title`)}
        </p>
      </div>

      <div className="sm:pt-12 md:w-[90%] w-[96%] mx-auto flex flex-col gap-y-6 pb-12">
        <p className="font-semibold text-center sm:text-start  mb-4 text-[#2F2E40] font-montserrat text-[15px] sm:text-[20px] md:text-[25px]">
          {t(`partners.stitle`)}
        </p>
        <ul className="space-y-4 sm:space-y-6">
          <li className="min-w-[100px] flex items-center gap-x-6">
            <div className="w-[8%] sm:w-[3%]">
              <img src="/line.svg" alt="" className="w-[40px] h-[5px]" />
            </div>
            <p className="text-sm sm:text-[17px] w-[92%] md:text-[21px] text-[#2F2E40CC]/80">
              {t(`partners.ul.li1`)}
            </p>
          </li>
          <li className="min-w-[100px] flex items-center gap-x-6">
            <div className="w-[8%] sm:w-[3%]">
              <img src="/line.svg" alt="" className="w-[40px] h-[5px]" />
            </div>
            <p className="text-sm sm:text-[17px] w-[92%] md:text-[21px] text-[#2F2E40CC]/80">
              {t(`partners.ul.li2`)}
            </p>
          </li>
          <li className="min-w-[100px] flex items-center gap-x-6">
            <div className="w-[8%] sm:w-[3%]">
              <img src="/line.svg" alt="" className="w-[40px] h-[5px]" />
            </div>
            <p className="text-sm sm:text-[17px] w-[92%] md:text-[21px] text-[#2F2E40CC]/80">
              {t(`partners.ul.li3`)}
            </p>
          </li>
          <li className="min-w-[100px] flex items-center gap-x-6">
            <div className="w-[8%] sm:w-[3%]">
              <img src="/line.svg" alt="" className="w-[40px] h-[5px]" />
            </div>
            <p className="text-sm sm:text-[17px] w-[92%] md:text-[21px] text-[#2F2E40CC]/80">
              {t(`partners.ul.li4`)}
            </p>
          </li>
          <li className="min-w-[100px] flex items-center gap-x-6">
            <div className="w-[8%] sm:w-[3%]">
              <img src="/line.svg" alt="" className="w-[40px] h-[5px]" />
            </div>
            <p className="text-sm sm:text-[17px] w-[92%] md:text-[21px] text-[#2F2E40CC]/80">
              {t(`partners.ul.li5`)}
            </p>
          </li>
        </ul>

        <p className="text-[17px]  text-center sm:text-start mt-6 sm:mt-12 md:text-[21px] text-[#2F2E40CC]/80">
          {t(`partners.text1`)}
        </p>

        <p className="text-[17px] text-center sm:text-start pb-12 mt-6 sm:mt-12 md:text-[21px] text-[#2F2E40CC]/80">
          {t(`partners.text2`)}
        </p>
      </div>

      <div className="relative z-0">
        <div className="absolute bottom-0 left-0 h-[50px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[70px]">
          <img src={"/minLeft.svg"} width={100} height={100} alt={"minLeft"} />
        </div>
        <div className="absolute bottom-0 right-0 h-[50px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[70px]">
          <img src={"/minRight.svg"} width={100} height={100} alt={"minLeft"} />
        </div>
      </div>
    </RootLayout>
  );
};

export default Partners;
