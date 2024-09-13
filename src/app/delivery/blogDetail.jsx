import { useTranslation } from "react-i18next";
import RootLayout from "../../components/layouts/RootLayout";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogDetail = () => {
  const [t, i18n] = useTranslation("global");
  const { id } = useParams();
  const [data, setData] = useState();
  const getDetailData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/blog_deteile_views/${id}/`
      );
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

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

  function renderElement3(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.title2}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.title2}</div>;
      case "en":
        return <div>{item?.translations?.en?.title2}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.title2}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  function renderElement4(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.content2}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.content2}</div>;
      case "en":
        return <div>{item?.translations?.en?.content2}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.content2}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  console.log(data)
  return (
    <RootLayout title="Подробности блога">
      <div className=" w-[96%] sm:w-[90%] mx-auto pb-8 mb-12">
        {/* h-[200px] sm:h-[658px] */}
        <div className="relative w-[100%] h-auto my-2 sm:my-6 z-[99999]">
          <img
            src={`${data?.img}`}
            alt={"blog1"}
            className="w-[100%] mt-8 mx-auto h-auto sm:h-[400px] lg:h-[600px] z-[99999] rounded-lg md:rounded-[20px]"
          />
        </div>
        <p className="w-[100%] md:w-[70%] font-semibold md:font-bold text-[16px] mb-4 sm:mb-0 sm:text-[18px] md:text-[21px] lg:text-[28px] text-[#2F2E40]">
          {/* {t(`detail.title`)} */}
          {renderElement(i18n?.language, data)}
        </p>
        <p className="font-medium text-[15px] sm:text-[19px] md:text-[21px] text-lightGreey">
          {/* {t(`detail.text`)} */}
          {renderElement2(i18n?.language, data)}
        </p>

        <div className="z-[99999999999]">
        <img
            src={`${data?.img2}`}
            alt={"blog1"}
            className="w-[100%]  mx-auto h-auto mt-12 lg:mt-20 sm:h-[400px] lg:h-[600px] z-[99999] rounded-lg md:rounded-[20px]"
          />
        </div>
      <p className="w-[100%] md:w-[70%] my-8 font-semibold md:font-bold text-[16px] mb-4 sm:mb-0 sm:text-[18px] md:text-[21px] lg:text-[28px] text-[#2F2E40]">
          {/* {t(`detail.title`)} */}
          {renderElement3(i18n?.language, data)}
        </p>
        <p className="font-medium text-[15px] sm:text-[19px] md:text-[21px] text-lightGreey">
          {/* {t(`detail.text`)} */}
          {renderElement4(i18n?.language, data)}
        </p>
      </div>
      
    </RootLayout>
  );
};

export default BlogDetail;
