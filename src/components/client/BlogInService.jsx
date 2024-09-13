import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../service/auth";
import CardSkeleton from "../UI/cardskleton";

const BlogInService = () => {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(`${BASE_URL}/b_api/sayts/blog_all_views/`);
    console.log(data);
    setData(data?.data?.results);
  };
  useEffect(() => {
    getData();
  }, []);

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

  return (
    <>
      <div className="md:w-[90%] w-full mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 pt-8">
          {data?.length > 0 ? (
            data?.map((item, index) => index < 3 && (
              <div
                key={index}
                className="min-h-[460px]  relative rounded-md shadow-xl"
              >
                <div className="relative h-[224px] w-full">
                  <img
                    src={`${item?.img}`}
                    alt="blog1"
                    className="w-[100%] h-[100%] rounded-t-md p-0 m-0"
                  />
                </div>
                <div className="h-[54%] flex flex-col p-4">
                  {/* <p className="text-[19px] text-lightGreey font-medium font-montserrat">
              22.06.2023
            </p> */}
                  <p className="mt-4 font-semibold text-[25px] text-lightGreey">
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
                        {t(`blog.card.btn`)}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
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
          )}
        </div>
      </div>
      <div className="w-[100%] relative">
        {/* <div className="absolute top-0 left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
          <img src={"/minLeft.svg"} width={100} height={100} alt={"minLeft"} />
        </div>
        <div className="absolute top-0 right-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
          <img src={"/minRight.svg"} width={100} height={100} alt={"minLeft"} />
        </div> */}
      </div>
    </>
  );
};

export default BlogInService;
