import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const [t, i18n] = useTranslation("global");

  const [menu, setMenu] = useState({ menu1: true, menu2: false });
  const navigate = useNavigate();
  const sendCalculator = () => {
    navigate("/calculator");
    window.scrollTo({ top: 0 });
  };
  return (
    <aside className="hidden md:flex h-full fixed flex-col w-[310px]  py-8 overflow-y-auto bg-[#2F2E40] border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-col justify-between flex-1 mt-6  h-full">
        <nav>
          <Link
            to="/user-home"
            className={`${
              menu.menu1
                ? "bg-white border-l-[5px] py-[15px] border-l-[#1348F9] text-[#2F2E40CC]"
                : "text-white ml-[5px]"
            } mb-4 flex items-center px-4 py-2`}
            onClick={() => setMenu({ ...menu, menu1: true, menu2: false })}
          >
            <div className="w-6 h-5 cursor-pointer">
              <img src="/tab.svg" alt="side1" width={100} height={100} />
            </div>
            <span className="ml-3 font-medium">Мои отправления</span>
          </Link>
          {/* <div onClick={() => setMenu({ ...menu, menu2: true, menu1: false })}>
            <Link
              to="/user-message"
              className={`${
                menu.menu2
                  ? "bg-white border-l-[5px] py-[15px] border-l-[#1348F9] text-[#2F2E40CC]"
                  : "text-white ml-[5px]"
              } flex items-center px-4 py-2`}
            >
              <div className="w-6 h-5 cursor-pointer">
                <img src="/side5.svg" alt="side1" width={100} height={100} />
              </div>
              <span className="ml-3 font-medium">Сообщения</span>
            </Link>

            <div
              onClick={sendCalculator}
              className="mx-4 mt-[80%] cursor-pointer hover:scale-[1.009] bgImage h-[60px] text-[16px] font-semibold text-white flex items-center justify-center rounded-[7px]"
            >
              Бронируйте сейчас
            </div>

            <div className="flex flex-col my-12 gap-y-4 mx-4">
              <p className="text-[#ABAFB6] font-medium text-[19px]">
                Настройки
              </p>
              <div className="flex gap-x-3 items-center cursor-pointer" onClick={() => navigate("/user-profile")}>
                <svg
                  width="28"
                  height="24"
                  viewBox="0 0 34 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5298 11.4307L28.9802 11.1282C28.8949 11.0812 28.8529 11.0576 28.8117 11.0332C28.4019 10.7903 28.0565 10.4546 27.8045 10.0531C27.7791 10.0127 27.7552 9.97031 27.7063 9.88657C27.6575 9.80293 27.6328 9.76055 27.6101 9.71859C27.384 9.30083 27.2617 8.83527 27.2544 8.36142C27.2536 8.31379 27.2538 8.26512 27.2554 8.16835L27.2662 7.53684C27.2834 6.52626 27.292 6.0194 27.1485 5.56452C27.021 5.16047 26.8077 4.78832 26.523 4.4725C26.201 4.1155 25.7555 3.86082 24.8634 3.35209L24.1224 2.92952C23.2328 2.42221 22.7878 2.16846 22.3155 2.07173C21.8977 1.98615 21.4665 1.99011 21.0502 2.0826C20.5803 2.18699 20.1409 2.44735 19.2627 2.96776L19.2577 2.97012L18.7267 3.28473C18.6428 3.33448 18.6003 3.35956 18.5582 3.38271C18.1406 3.61247 17.6745 3.73951 17.1969 3.75468C17.1488 3.75621 17.0998 3.75621 17.0019 3.75621C16.9046 3.75621 16.8536 3.75621 16.8056 3.75468C16.327 3.73944 15.8599 3.61171 15.4416 3.381C15.3995 3.35775 15.3578 3.33248 15.2737 3.2825L14.7393 2.96505C13.8551 2.4397 13.4123 2.17664 12.9398 2.07173C12.5218 1.97891 12.0891 1.97634 11.6698 2.06303C11.1963 2.1609 10.7512 2.41653 9.86107 2.92778L9.85711 2.92952L9.12534 3.34982L9.11724 3.35473C8.23513 3.86137 7.79301 4.11531 7.47382 4.47085C7.19056 4.78635 6.97885 5.15792 6.85212 5.56089C6.70888 6.01639 6.71652 6.52434 6.73378 7.53968L6.7445 8.1703C6.74613 8.2658 6.74894 8.31325 6.74824 8.36021C6.74114 8.83503 6.61722 9.30154 6.39046 9.72004C6.36804 9.76143 6.34388 9.80282 6.29562 9.8855C6.24733 9.96823 6.22395 10.0094 6.19891 10.0493C5.94572 10.453 5.59875 10.7906 5.18638 11.0339C5.14559 11.058 5.1026 11.0811 5.01814 11.1275L4.47558 11.425C3.57288 11.9201 3.12163 12.1678 2.79328 12.5204C2.50281 12.8322 2.28338 13.2022 2.14943 13.6051C1.99802 14.0606 1.99815 14.5713 2.00049 15.5926L2.00241 16.4274C2.00474 17.4419 2.00793 17.9488 2.15968 18.4011C2.29393 18.8013 2.51176 19.1691 2.80061 19.4791C3.1271 19.8295 3.57386 20.0757 4.46972 20.5689L5.00744 20.865C5.09895 20.9153 5.145 20.9402 5.18913 20.9665C5.59776 21.21 5.94201 21.5467 6.19304 21.9481C6.22016 21.9914 6.2462 22.0364 6.29826 22.1264C6.34967 22.2153 6.37598 22.2598 6.39976 22.3043C6.61985 22.7167 6.73769 23.1749 6.74573 23.6412C6.74659 23.6915 6.74585 23.7425 6.7441 23.8449L6.73378 24.4501C6.7164 25.4689 6.70883 25.9789 6.85291 26.4357C6.98038 26.8397 7.19342 27.2118 7.47821 27.5277C7.80013 27.8847 8.2464 28.1392 9.13853 28.648L9.87937 29.0704C10.769 29.5778 11.2136 29.8312 11.6859 29.9279C12.1038 30.0135 12.5352 30.0102 12.9515 29.9177C13.4221 29.8132 13.863 29.5519 14.7437 29.03L15.2747 28.7154C15.3587 28.6656 15.4012 28.6407 15.4433 28.6175C15.8609 28.3877 16.3266 28.26 16.8041 28.2449C16.8522 28.2434 16.9012 28.2434 16.9991 28.2434C17.0972 28.2434 17.1461 28.2434 17.1943 28.2449C17.6729 28.2601 18.1414 28.3882 18.5597 28.619C18.5965 28.6393 18.6333 28.6612 18.6981 28.6997L19.2625 29.035C20.1469 29.5604 20.5887 29.8227 21.0613 29.9276C21.4793 30.0204 21.9123 30.0242 22.3316 29.9375C22.805 29.8397 23.251 29.5836 24.1406 29.0726L24.8834 28.646C25.7661 28.139 26.2087 27.8848 26.528 27.5291C26.8112 27.2136 27.0232 26.8422 27.1499 26.4393C27.2921 25.9871 27.2836 25.483 27.2665 24.4823L27.2554 23.8297C27.2538 23.7342 27.2536 23.6867 27.2543 23.6397C27.2614 23.1649 27.3833 22.6981 27.6101 22.2796C27.6325 22.2382 27.6568 22.1965 27.7049 22.1141C27.7532 22.0314 27.7782 21.9902 27.8032 21.9502C28.0564 21.5465 28.4037 21.2087 28.8161 20.9653C28.8564 20.9415 28.8979 20.9188 28.9803 20.8736L28.9832 20.8723L29.5257 20.5747C30.4284 20.0797 30.8805 19.8317 31.2089 19.4791C31.4994 19.1672 31.7185 18.7978 31.8524 18.3949C32.003 17.9421 32.0018 17.4344 31.9995 16.425L31.9975 15.5723C31.9952 14.5578 31.9939 14.0509 31.8422 13.5986C31.7079 13.1984 31.4889 12.8306 31.2 12.5206C30.8739 12.1705 30.4265 11.9242 29.5324 11.432L29.5298 11.4307Z"
                    stroke="#ABAFB6"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.9981 16.0001C10.9981 19.2807 13.6855 21.9401 17.0005 21.9401C20.3155 21.9401 23.0028 19.2807 23.0028 16.0001C23.0028 12.7195 20.3155 10.0601 17.0005 10.0601C13.6855 10.0601 10.9981 12.7195 10.9981 16.0001Z"
                    stroke="#ABAFB6"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p className="text-white text-[16px] font-medium">
                  Данные учетной записи
                </p>
              </div>
            </div>
          </div> */}
        </nav>
      </div>
    </aside>
  );
};

export default UserSidebar;
