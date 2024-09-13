import React, { useCallback, useEffect, useState } from "react";
import "./MultiLevelDropdown.css"; // Import your CSS file for styling
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import toast from "react-hot-toast";

function MultiLevelDropdown({ data2 }) {
  const [t, i18n] = useTranslation("global");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getCardData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/service_get_post_views/`
      );
      setData(data?.data?.results);
      setLoader(false);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    }
  }, []);

  const hanleLoad = useCallback(() => data?.length < 1 && setLoader(false), [data, setLoader]);
  const hanleLoadOut = useCallback(() => setLoader(false), [setLoader]);

  useEffect(() => {
    getCardData();
  }, [getCardData]);

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
  return (
    <div class="antialiased">
      <div class="group inline-block">
        <button
          // style={{background:"rgba(19, 72, 249, 1)"}}
          aria-haspopup="true"
          aria-controls="menu"
          class="outline-none focus:outline-none   px-3 py-1 relative h-[90px] lg:h-[133px] rounded-sm flex items-center min-w-32"
        >
          <span class="pr-1 font-semibold flex">
            <Link
              onMouseEnter={hanleLoad}
              onMouseOut={hanleLoadOut}
              to={"/services"}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
              className="font-[600] text-[14px] lg:text-[16px] leading-[19.5px] text-[#343434] mr-1  text-center"
            >
              <p className="hover:text-gray-900 font-[550] text-[20px] text-white font-raleway">
                {t("nav.nav1")}
              </p>
            </Link>
          </span>
          <span>
            <img
              src={"/Vector.svg"}
              className="mr-5"
              alt="vector"
              width={15}
              height={5}
            />
          </span>
        </button>
        {/* {loader ? (
          <ul className="absolute top-[90px] lg:top-[133px] bg-white">
            <li>
              <Skeleton className="lg:w-[300px]"/>
            </li>
            <li>
              <Skeleton className="lg:w-[300px]"/>
            </li>
            <li>
              <Skeleton className="lg:w-[300px]"/>
            </li>
            <li>
              <Skeleton className="lg:w-[300px]"/>
            </li>
          </ul>
        ) : ( */}
        <ul
          id="menu"
          aria-hidden="true"
          class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
    transition duration-150 ease-in-out origin-top min-w-32"
        >
          {/* {data2?.map((item, index) => ( */}
          <li class="rounded-sm relative  ">
            {
              //   loader ?
              data?.map((c, idx) => (
                <Link
                  key={c?.id}
                  to={`/services/${c?.id}`}
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                  }}
                  aria-haspopup="true"
                  aria-controls="menu-lang"
                  className={`w-full border-b uppercase px-4 py-1 text-left hover:bg-[#ECF4FC] flex items-center outline-none focus:outline-none`}
                >
                  <span class="px-3 py-1 cursor-pointer hover:bg-[#ECF4FC] text-[#343434] font-normal text-lg">
                    {/* {i18n?.translator?.language === "ru"
                      ? item?.translations?.nl?.name
                      : item?.translations?.en?.name} */}
                    {renderElement(i18n?.language, data[idx])}
                  </span>
                </Link>
              ))
              //        : (
              //         <ul className="absolute top-[90px] lg:top-[133px] bg-white">
              //     <li>
              //       <Skeleton className="lg:w-[300px]"/>
              //     </li>
              //     <li>
              //       <Skeleton className="lg:w-[300px]"/>
              //     </li>
              //     <li>
              //       <Skeleton className="lg:w-[300px]"/>
              //     </li>
              //     <li>
              //       <Skeleton className="lg:w-[300px]"/>
              //     </li>
              //   </ul>
              //       )
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MultiLevelDropdown;
