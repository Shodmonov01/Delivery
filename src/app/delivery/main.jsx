import { useTranslation } from "react-i18next";
import {
  Comments,
  About,
  Hero,
  Hero2,
  Onas,
  Send,
  Sponsr,
} from "../../components/client";
import { useMediaQuery } from "usehooks-ts";
import MainLoader from "../../components/client/MainLoader";

import RootLayout from "../../components/layouts/RootLayout";
import BasicAccordion from "../../components/client/Accordion";
import CalSection from "../../components/client/CalSection";
import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [t] = useTranslation("global");
  const isMobile = useMediaQuery("(max-width: 500px)");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isStepTrue = queryParams.get("scroll") === "true";
  const isStepTrue2 = queryParams.get("scroll2") === "true";
  const isStepTrue3 = queryParams.get("cat") === "true";

  useEffect(() => {
    if (isStepTrue) {
      !isMobile && window.scrollTo({ top: 3000 });
      isMobile && window.scrollTo({ top: 3150 });
    }
    if (isStepTrue2) {
      !isMobile && window.scrollTo({ top: 1000 });
      isMobile && window.scrollTo({ top: 650 });
    }

    if (isStepTrue3) {
      isMobile ? window.scrollTo({ top: 6600 }) : window.scrollTo({ top: 7000 });
    }
  }, [isStepTrue]);
  return (
    <Suspense fallback={<MainLoader />}>
      <RootLayout title="Delivery">
        <div className="w-[100%]">
          <Hero />
          <div className="w-[100%] relative mt-5 sm:mt-20">
            <div className="absolute top-0 left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
              <img
                src={"/minLeft.svg"}
                width={100}
                height={100}
                alt={"minLeft"}
                loading="lazy"
              />
            </div>
            <div className="absolute top-0 right-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
              <img
                src={"/minRight.svg"}
                width={100}
                height={100}
                alt={"minLeft"}
                loading="lazy"
              />
            </div>

            <div className="w-[100%] flex justify-center pt-[20px] lg:pt-[80px]">
              <p className="font-bold lg:text-[55px] z-[1] md:text-[40px] sm:text-[32px] text-[24px] text-lightGreey">
                {t(`section1.title`)}
              </p>
            </div>

            <About />

            <Sponsr />
            <CalSection />
            <div className="relative">
              <div className="absolute top-[360px] z-[-1] right-0 h-[70px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[80px]">
                <img
                  src={"/minRight.svg"}
                  width={100}
                  height={100}
                  alt={"minLeft"}
                />
              </div>
            </div>

            <Onas />
          </div>

          <Send />
          <div className="relative mb-8 md:mb-24">
            <div className="absolute bottom-0 left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
              <img src={"/minLeft.svg"} width={70} height={70} alt={"minLeft"} />
            </div>
          </div>

          <Hero2 />

          <BasicAccordion />
          <div className="relative mb-8 md:mb-24 -z-40">
            <div className="absolute bottom-0 left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
              <img src={"/minLeft.svg"} width={70} height={70} alt={"minLeft"} />
            </div>
          </div>
          <Comments />
        </div>
      </RootLayout>
    </Suspense>
  );
};

export default HomePage;
