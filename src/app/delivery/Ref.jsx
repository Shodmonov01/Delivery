import RootLayout from "../../components/layouts/RootLayout";
import { useTranslation } from "react-i18next";

const Ref = () => {
  const [t] = useTranslation("global");
  return (
    <RootLayout title="Отзывы">
      <div className="w-[90%] mx-auto">
        <p className="text-center  mt-4 md:mt-8 font-semibold md:font-bold text-[18px] mb-4 sm:mb-0 sm:text-[24px] md:text-[28px] lg:text-[55px] text-[#2F2E40]">
          {t(`ref.title`)}
        </p>
      </div>

      <div className="sm:pt-12 md:w-[90%] w-[96%] mx-auto flex flex-col gap-y-6 pb-12">
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] text-[#2F2E40CC]/80">
          {t(`ref.text1`)}
        </p>
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] text-[#2F2E40CC]/80">
          {t(`ref.text`)}
        </p>

        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] text-[#2F2E40CC]/80">
          {t(`ref.text2`)}
        </p>

        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] sm:mt-4 font-semibold text-[#2F2E40CC]/80">
          {t(`ref.ask`)}
        </p>

        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          1.{t(`ref.res1`)}
        </p>
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          2.{t(`ref.res2`)}
        </p>
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          3.{t(`ref.res3`)}
        </p>
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          4.{t(`ref.res4`)}
        </p>
        <p className="sm:text-start text-center text-sm sm:text-[17px] leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          5.{t(`ref.res5`)}
        </p>

        <p className="sm:text-start text-center text-sm sm:text-[17px] pt-6 leading-7 md:text-[21px] font-normal text-[#2F2E40CC]/80">
          {t(`ref.fin`)}
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

export default Ref;
