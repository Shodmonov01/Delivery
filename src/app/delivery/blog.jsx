import { Link } from "react-router-dom";
import RootLayout from "../../components/layouts/RootLayout";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { memo, useEffect, useState } from "react";
import CardSkeleton from "../../components/UI/cardskleton";
import { useCallback } from "react";

const Blog = () => {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

const getData = useCallback(async () => {
  const { data } = await axios.get(`${BASE_URL}/b_api/sayts/blog_all_views/`);
  setData(data?.data?.results);
}, []);

useEffect(() => {
  getData();
}, [getData]);
console.log(`blog comp re-rendered`)

  function renderElement(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.title}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.title}</div>;
      case "en":
        return <div>{item?.translations?.en?.title}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.title}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  function renderElement2(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.content}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.content}</div>;
      case "en":
        return <div>{item?.translations?.en?.content}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.content}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  useEffect(() => {
    if (data?.length < 1) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  return (
    <RootLayout title="БЛОГ">
      <div className="py-4 md:py-16 md:w-[90%] w-[96%] mx-auto">
        <p className="font-semibold text-lightGreey text-center text-[22px] sm:text-[28px] md:text-[35px] lg:text-[65px] ">
          {t("sto.st36")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mb-16 gap-y-8 pt-8">
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div
                key={index}
                className="min-h-[560px] sm:min-h-[629px] relative rounded-md shadow-xl"
              >
                <div className="relative h-[50%]">
                  <img
                    src={`${item?.img}`}
                    alt="blog1"
                    className="w-[100%] h-[100%] object-cover sm:object-none rounded-t-md p-0 m-0"
                  />
                </div>
                <div className="h-[54%] flex flex-col p-2 sm:p-4">
                  {/* <p className="text-[19px] text-lightGreey font-medium font-montserrat">
              22.06.2023
            </p> */}
                  <p className="mt-4 font-semibold text-[20px] sm:text-[25px] text-lightGreey">
                    {/* {t(`blog.card.title`)} */}
                    {renderElement(i18n?.language, item)}
                  </p>
                  <p className="text-[15.99px] text-lightGreey font-light mt-2 line-clamp-4">
                    {/* {t(`blog.card.text`)} */}
                    {renderElement2(i18n?.language, item)}
                  </p>
                  <div className="absolute bottom-6 left-6">
                    <Link to={`/blog/${item?.id}`}>
                      <p className="text-[#1348F9] text-[17px] font-semibold border-2 p-2 rounded-md hover:bg-[#1348F9] hover:text-[#fff] hover:border-transparent transition duration-500 ease-in-out border-[#1348F9]">
                        {t(`sto.st37`)}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {isLoading ? (
                <>
                  <div className="gap-x-4 md:w-[80%] gap-y-4 mx-auto hidden md:flex">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                  <div className="flex md:hidden gap-x-4 md:w-[80%] gap-y-4 mx-auto">
                    <CardSkeleton />
                  </div>
                </>
              ) : (
                <div className="flex w-[90%] justify-center absolute ">
                  <p className="text-center text-[#1348F9] text-lg lg:text-2xl">
                    Нет блога
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="w-[100%] relative">
        <div className="absolute top-0 left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
          <img src={"/minLeft.svg"} width={100} height={100} alt={"minLeft"} />
        </div>
        <div className="absolute top-0 right-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
          <img src={"/minRight.svg"} width={100} height={100} alt={"minLeft"} />
        </div>
      </div>
    </RootLayout>
  );
};

export default memo(Blog);
