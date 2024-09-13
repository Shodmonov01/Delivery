import { useEffect, useState } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import { Link } from "react-router-dom";
import "./user.css";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MyCalendar from "../../components/UI/MyCalendar";
import { useTranslation } from "react-i18next";
import Example from "../../context/Example";
import { Message } from "@mui/icons-material";
// import CommentModal from "./comment";

const UserHomePage = () => {
  const [useBtn, setuseBtn] = useState({ btn1: true, btn2: false });
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(false);
  const [date2, setDate2] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [t, i18n] = useTranslation("global");
  const [value, onChange] = useState(new Date());
  const [statusId, setStatusId] = useState(Number);
  const [isComment, setIsComment] = useState("");
  const [komment, setKomment] = useState("");
  const [prog, setProg] = useState([]);
  const [statusGroup, setStatusGroup] = useState({
    status1: false,
    status2: false,
    status3: false,
  });

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

  const getStatusData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/c_dashboard/status_views/`);
      setStatusData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (position) => {
    if (position === "left") {
      setuseBtn({ ...useBtn, btn1: true, btn2: false });
    } else {
      setuseBtn({ ...useBtn, btn2: true, btn1: false });
    }
  };

  const statusGroupHandler = (position) => {
    switch (position) {
      case "top":
        setStatusGroup({ ...statusGroup, status1: !statusGroup.status1 });
        break;
      case "middle":
        setStatusGroup({ ...statusGroup, status2: !statusGroup.status2 });
        break;
      case "bottom":
        setStatusGroup({ ...statusGroup, status3: !statusGroup.status3 });
        break;
    }
  };

  const clearStatusGroup = () =>
    setStatusGroup({
      ...statusGroup,
      status1: false,
      status2: false,
      status3: false,
    });

  const statusHandler = () => {
    setStatus((prev) => !prev);
    setDate(false);
  };
  const dateHandler = (e) => {
    e.stopPropagation();
    setDate((prev) => !prev);
    setStatus(false);
  };

  const date2Handler = (e) => {
    e.stopPropagation();
    setDate2((prev) => !prev);
    setDate(false);
    setStatus(false);
  };

  const ProgressData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` },
      };
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/delivery_list_views/`,
        config
      );
      console.log(data);
      setProg(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ProgressData();
    getStatusData();
  }, []);

  const toggleCard2 = (cardId) => {
    setStatusId(cardId);
    setStatusData((prevCards) =>
      prevCards.map((card) =>
        card?.id === cardId ? { ...card, visible: true } : card
      )
    );
    setStatusData((prevCards) =>
      prevCards.map((card) =>
        card?.id !== cardId ? { ...card, visible: false } : card
      )
    );
  };

  const statusFilter = async () => {
    console.log(statusId);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: "Bearer " + JSON.parse(token) },
      };
      const { data } = await axios.get(
        `${BASE_URL}/c_dashboard/ddelivery_status_filter_views/${statusId}/`,
        config
      );
      console.log(data);
      setProg(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  function renderElement3(option, item) {
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
    <UserLayout>
      <div
        className="ml-[3%] min-h-[60vh] mt-6"
        onClick={() => {
          setDate(false);
        }}
      >
        <p className="font-medium md:font-semibold text-[20px] sm:text-[24px] md:text-[32px] lg:text-[45px] text-lightGreey py-[20px] ">
          {t(`user.title`)}
        </p>
        <div className="flex gap-x-4 mt-8">
          <button
            onClick={() => clickHandler("left")}
            className={`${
              useBtn.btn1
                ? "border-Primary border-2"
                : "border-[#ABAFB6] border-2"
            } font-normal px-8 text-[17px] md:text-[21px] text-lightGreey  p-3 rounded-md `}
          >
            {t(`user.title`)}
          </button>

          <button
            onClick={() => clickHandler("right")}
            className={`${
              useBtn.btn2
                ? "border-Primary border-2"
                : "border-[#ABAFB6] border-2"
            } font-normal px-8 text-[17px] md:text-[21px] text-lightGreey  p-3 rounded-md `}
          >
            {t(`user.title2`)}
          </button>
        </div>

        {useBtn.btn1 && (
          <>
            <div className="mt-12 flex gap-x-8 slide-down relative">
              <img
                src="/diapazon.svg"
                alt=""
                onClick={dateHandler}
                className="cursor-pointer"
              />

              <p className="text-[17px] md:text-[21px] text-lightGreey font-medium">
                {t(`user.title3`)}
              </p>
              {date && (
                <div className=" slide-down slideUp absolute left-0  md:left-[30%] rounded-md border top-[-200px] md:top-[-250px]">
                  <Example
                    setProg={setProg}
                    ProgressData={ProgressData}
                    setDate={setDate}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 mt-12 w-[98%] md:w-[88%] gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
              {prog?.map((c, index) => (
                <div
                  key={index}
                  className="relative bg-white shadow-2xl rounded-md  flex flex-col items-center justify-center p-4"
                >
                  {c?.comment && (
                    <div className="absolute right-3 top-3 z-30">
                      <Message
                        onClick={() =>{
                           setIsComment((prev) => !prev)
                           setKomment(c?.comment);
                        }}
                        color="#1cfc03"
                        sx={{ color: "#1cfc03", cursor: "pointer" }}
                      />
                    </div>
                  )}
                  {/* Comment modal */}
                  {isComment && (
                    <div className="fixed top-0 left-0 bg-modalBg w-full h-screen flex items-center justify-center z-[999]">
                    <div className="w-[96%] sm:w-[94%] md:w-[30%] mx-auto bg-white min-h-[12vh] rounded-md p-4">
                      <form className="w-full flex flex-col gap-y-4">
                        {/* clear button */}
                        <div className="flex w-[100%] justify-end">
                          <div
                            onClick={() => setIsComment(false)}
                            className="w-[12px] h-[12px] sm:w-[18.84px] sm:h-[18.84px] cursor-pointer"
                          >
                            <img
                              src={"/clear.svg"}
                              alt="clear"
                              width={100}
                              height={100}
                              className="w-[100%] h-[100%]"
                            />
                          </div>
                        </div>

                        <p className="text-[15px] lg:text-[16px] text-lightGreey font-semibold">
                          {komment}
                        </p>
                      </form>
                    </div>
                  </div>
                  )}
                  <p className="mb-2 text-[15px] md:text-[16px] lg:text-[18px] text-center text-lightGreey font-semibold">
                    {c?.product[0]?.name}
                  </p>
                  <p className="mb-2 text-[12px] font-montserrat md:text-[14px] lg:text-[14px] text-lightGreey font-normal">
                    {c?.create_date}
                  </p>
                  <p className="mb-2 text-[14px] lg:text-[16px] text-lightGreey font-semibold">
                    {renderElement(i18n?.language, c?.id_status)}
                  </p>

                  <p className=" text-[15px] lg:text-[16px] text-lightGreey font-semibold">
                    {t(`user.title5`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-12 inline-flex py-2 px-6 rounded-lg gap-x-4 border-2 border-Primary ">
              <img src="/add.svg" alt="plus" />
              <Link
                to={"/calculator"}
                className="text-[15px] md:text-[19px] text-Primary"
              >
                {t(`user.title6`)}
              </Link>
            </div>
          </>
        )}

        {useBtn.btn2 && (
          <div className="relative">
            <div className="mt-12 flex gap-x-8 slide-down">
              <img
                onClick={date2Handler}
                src="/diapazon.svg"
                alt=""
                className="cursor-pointer"
              />

              <p className="text-[17px] md:text-[21px] text-lightGreey font-medium">
                {t(`user.title3`)}
              </p>
              {date2 && (
                <div className=" slide-down slideUp absolute left-0  md:left-[30%] rounded-md border top-[-200px] md:top-[-250px]">
                  <Example
                    setProg={setProg}
                    ProgressData={ProgressData}
                    setDate={setDate2}
                  />
                </div>
              )}
              <button
                onClick={statusHandler}
                className="text-[17px] md:text-[21px] text-lightGreey font-medium"
              >
                {t(`user.title7`)}
              </button>
            </div>

            {status && (
              <div className="bg-white slide-down slideUp absolute left-[30%] p-3 rounded-md shadow-xl border top-[-150px]">
                <div
                  onClick={statusHandler}
                  className="flex w-full justify-end cursor-pointer"
                >
                  <img src="/clear.svg" alt="" />
                </div>
                <p className="text-lightGreey text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px] font-medium md:font-semibold">
                  {t(`user.title7`)}
                </p>

                {statusData?.map((c, i) => (
                  <div className="flex gap-x-4 items-center mb-4" key={i}>
                    <input
                      checked={c?.visible}
                      onClick={() => toggleCard2(c?.id)}
                      type="checkbox"
                      className="border-lightGreey font-medium text-[14px] md:text-[17px]"
                    />
                    <p>{renderElement3(i18n?.language, c)}</p>
                  </div>
                ))}

                <div className="flex gap-x-4 items-center">
                  <p
                    onClick={clearStatusGroup}
                    className="text-[16px] cursor-pointer md:text-[19px] text-lightGreey font-medium md:font-semibold"
                  >
                    {t(`user.btn1`)}
                  </p>
                  <button
                    onClick={statusFilter}
                    className="text-[16px] font-medium bg-Primary py-2 px-6 text-white rounded-lg"
                  >
                    {t(`user.btn2`)}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 my-12 w-[98%] md:w-[88%] gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
              {prog?.map((c, index) => (
                <div
                  key={index}
                  className="relative bg-white shadow-2xl rounded-md  flex flex-col items-center justify-center p-4"
                >
                  {c?.comment && (
                    <div className="absolute right-3 top-3 z-30">
                      <Message
                        onClick={() => {
                          setIsComment((prev) => !prev);
                          setKomment(c?.comment);
                          console.log(c.comment);
                        }}
                        color="#1cfc03"
                        sx={{ color: "#1cfc03", cursor: "pointer" }}
                      />
                    </div>
                  )}
                  {/* Comment modal */}
                  {isComment && (
                    <div className="fixed top-0 left-0 bg-modalBg w-full h-screen flex items-center justify-center z-[999]">
                      <div className="w-[96%] sm:w-[94%] md:w-[30%] mx-auto bg-white min-h-[12vh] rounded-md p-4">
                        <form className="w-full flex flex-col gap-y-4">
                          {/* clear button */}
                          <div className="flex w-[100%] justify-end">
                            <div
                              onClick={() => setIsComment(false)}
                              className="w-[12px] h-[12px] sm:w-[18.84px] sm:h-[18.84px] cursor-pointer"
                            >
                              <img
                                src={"/clear.svg"}
                                alt="clear"
                                width={100}
                                height={100}
                                className="w-[100%] h-[100%]"
                              />
                            </div>
                          </div>

                          <p className="text-[15px] lg:text-[16px] text-lightGreey font-semibold">
                            {komment}
                          </p>
                        </form>
                      </div>
                    </div>
                  )}
                  <p className="mb-2 text-[15px] md:text-[16px] lg:text-[18px] text-center text-lightGreey font-semibold">
                    {c?.product[0]?.name}
                  </p>
                  <p className="mb-2 text-[12px] font-montserrat md:text-[14px] lg:text-[16px] text-lightGreey font-normal">
                    {c?.create_date}
                  </p>
                  <p className="mb-2 text-[14px] md:text-[18px] lg:text-[20px] text-lightGreey font-semibold">
                    {renderElement(i18n?.language, c?.id_status)}
                  </p>

                  <div className="flex lg:flex-row flex-col gap-y-2 gap-x-3 lg:items-center lg:justify-between">
                    <p className="mb-2 lg:mb-0 text-[15px] md:text-[16px] lg:text-[17px] text-lightGreey font-semibold">
                      {t(`user.title5`)}
                    </p>
                    <Link
                      to={`/user-about/${c?.id}`}
                      className="text-[16px] font-medium text-center bg-Primary py-1 px-6 md:px-3 text-white rounded-lg"
                    >
                      {t(`user.btn2`)}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserHomePage;
