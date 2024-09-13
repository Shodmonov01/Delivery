import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "usehooks-ts";

const Footer = ({ setIsPrice }) => {
  const [isLang, setIsLang] = useState(false);
  const navigate = useNavigate();
  const changeLang = () => setIsLang((prev) => !prev);
  const { pathname } = useLocation();
  const [t, i18n] = useTranslation("global");
  const targetElementRef = useRef(null);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [text, setText] = useState("");
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };
  const topFunction = () => {
    window.scrollTo({
      top: 0,
    });
  };
  const [lang, setLang] = useState([
    { id: 1, name: "Russian", logo: "/ru.svg", selected: true },
    { id: 2, name: "Netherlands", logo: "/gl.svg", selected: false },
    { id: 3, name: "France", logo: "/fr.svg", selected: false },
    { id: 4, name: "England", logo: "/en.svg", selected: false },
  ]);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLang = (id) => {
    let newArr = [...lang];
    newArr.map((item) => {
      item.selected = false;
      if (item?.id === id) {
        item.selected = true;
      }
    });
    setLang(newArr);
  };

  const consultation = () => {
    navigate("/");
    let targetPosition = 350;
    let currentPosition = window.scrollY;
    let increment = (targetPosition - currentPosition) / 20; // Animatsiya davri

    let animationInterval = setInterval(function () {
      currentPosition += increment;
      window.scrollTo(0, currentPosition);

      if (currentPosition >= targetPosition) {
        clearInterval(animationInterval);
      }
    }, 15);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ovt2v6r",
        "template_3bytgjb",
        targetElementRef.current,
        "K8gC84NVYlkyMzioU"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast("Ваша заявка отправлена. Ожидайте звонка");
  };

  return (
    <div>
      <div
        className={`w-[100%] relative z-50 ${
          isMobile && `${pathname !== "/calculator" && "pt-[100px]"}`
        } ${
          pathname !== ("/calculator" || "/" || "/thank-you") && "pt-[200px]"
        }`}
      >
        {/* <div className="absolute top-[-260px] left-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
          <img src={"/minLeft.svg"} width={100} height={100} alt={"minLeft"} />
        </div> */}
        {pathname !== "/calculator" ||
          ("/thank-you" && (
            <div className="absolute top-[-365px] z-0 right-0 h-[100px] w-[30px] sm:w-[50px] md:w-[70px] lg:w-[100px]">
              <img
                src={"/www.svg"}
                alt={"minLeft"}
                className={`sm:flex hidden ${
                  pathname == "/calculator" && "hidden"
                }`}
              />
            </div>
          ))}
      </div>
      <div
        className={`flex relative ${
          pathname !== "/calculator" && "mt-[200px]"
        }`}
      >
        {pathname !== "/calculator" && (
          <div className="w-[90%] md:w-[60%] mx-auto border h-[413px] bg-white ml-[5%] md:ml-[20%] absolute top-[-415px] rounded-lg shadow-2xl">
            <p className="text-center text-[#1348F9] text-[20px] sm:text-[24px] md:text-[32px] lg-text-[40px] mt-6 font-semibold">
              {t(`feedback.title`)}
            </p>
            <form
              onSubmit={sendEmail}
              className="mt-1 flex flex-col p-3 sm:p-6 relative z-[999999999]"
              ref={targetElementRef}
              id="form"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="w-[100%] sm:w-[38%] mb-4 sm:mb-0 flex flex-col">
                  <p className="mb-2 text-[#344054] font-medium">
                    {t(`feedback.name`)}
                  </p>
                  <input
                    type="email"
                    className="hidden"
                    value={"example@gmail.com"}
                    name="user_email"
                  />
                  <input
                    type="text"
                    name="user_name"
                    onChange={(e) => setName(e.target.value)}
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                    placeholder={t(`feedback.placeholder`)}
                    required
                  />
                </div>
                <div className="w-[100%] sm:w-[58%]">
                  <p className="mb-2 text-[#344054] font-medium">
                    {t(`feedback.num`)}
                  </p>
                  <input
                    type="number"
                    onChange={(e) => setPhone(e.target.value)}
                    className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                    placeholder="+32 (555) 000-0000"
                    required
                  />
                  <textarea
                    name="message"
                    value={`Имя: ${name}, Тел: ${phone}, Сообщение: ${text}`}
                    className="hidden"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
              <div className="w-[100%] mt-3">я
                <p className="mb-2 text-[#344054] font-medium">
                  {t(`feedback.message`)}
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="resize-none border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
                  required
                />
              </div>

              <div className="w-[100%] flex justify-center">
                <button
                  type="submit"
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  className={`mt-3 md:mt-10 bg-heroPrimary transition duration-200 ease-in-out text-white font-semibold text-[18px] py-1 md:py-3 px-8 md:px-24 rounded-md ${
                    isActive ? "bg-opacity-50" : "hover:bg-Primary"
                  }`}
                >
                  {t(`feedback.send`)}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="w-[100%] min-h-[327px] bg-[#0F172A] flex flex-col pb-4">
          <div
            className={`sm:hidden flex flex-col pt-[50px] px-[5%] justify-center ${
              isLang && ""
            }`}
          >
            <Link
              to={"/"}
              onClick={topFunction}
              className="w-[144px] h-[124px]"
            >
              <img
                src={"/logo1.svg"}
                alt="logo"
                width={100}
                height={100}
                className="object-cover w-[100%] h-[100%]"
              />
            </Link>
            <div className="flex flow-row mt-8 items-center">
              <div className="w-[40px] h-[14px] mr-3">
                <img
                  src={"/mail.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className=" w-[100%] h-[100%]"
                />
              </div>
              <p className="text-white text-[15px] md:text-[18px] font-medium">
                ssuport@uk2eu.com
              </p>
            </div>
            <div className="flex flow-row mt-6 items-center">
              <div className="w-[40px] h-[18px] mr-3">
                <img
                  src={"/phone.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className=" w-[100%] h-[100%]"
                />
              </div>
              <p className="text-white tetx-[15px] md:text-[18px] font-medium">
                894-912-98-49
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-3 w-[144px] mt-4 md:mt-6 px-3">
              <img
                src="/visa-svgrepo-com.svg"
                alt=""
                className="w-[32px] h-[24px]"
              />
              <img src="/mastercard.svg" alt="" className="w-[32px] h-[24px]" />
              <img src="/paypal.svg" alt="" className="w-[32px] h-[24px]" />
            </div>
          </div>
          <div className="w-[90%] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 sm:gap-y-8 pt-24">
            <div
              className={`hidden sm:flex flex-col justify-center ${
                isLang && "mt-[-100px]"
              }`}
            >
              <Link
                to={"/"}
                onClick={topFunction}
                className="w-[144px] h-[124px]"
              >
                <img
                  src={"/logo1.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className="object-cover w-[100%] h-[100%]"
                />
              </Link>
              <div className="flex flow-row mt-8 items-center">
                <div className="w-[40px] h-[14px] mr-3">
                  <img
                    src={"/mail.svg"}
                    alt="logo"
                    width={100}
                    height={100}
                    className=" w-[100%] h-[100%]"
                  />
                </div>
                <p className="text-white text-[15px] md:text-[18px] font-medium">
                  ssuport@uk2eu.com
                </p>
              </div>
              <div className="flex flow-row mt-6 items-center">
                <div className="w-[40px] h-[18px] mr-3">
                  <img
                    src={"/phone.svg"}
                    alt="logo"
                    width={100}
                    height={100}
                    className=" w-[100%] h-[100%]"
                  />
                </div>
                <p className="text-white tetx-[15px] md:text-[18px] font-medium">
                  894-912-98-49
                </p>
              </div>
              <div className="grid grid-cols-3 gap-x-3 w-[144px] mt-4 md:mt-6 px-3">
                <img
                  src="/visa-svgrepo-com.svg"
                  alt=""
                  className="w-[32px] h-[24px]"
                />
                <img
                  src="/mastercard.svg"
                  alt=""
                  className="w-[32px] h-[24px]"
                />
                <img src="/paypal.svg" alt="" className="w-[32px] h-[24px]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <p className="text-[#fff] font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                  {t(`footer.col1.title`)}
                </p>
              </div>
              <div className="mt-3 sm:mt-8 gap-y-2  sm:gap-y-4 pl-1">
                <div
                  onClick={() => {
                    navigate("/?scroll2=true");
                  }}
                >
                  <p className="text-white mb-4 font-normal text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col1.li1`)}
                  </p>
                </div>
                <Link to={"/services"} onClick={topFunction}>
                  <p className="text-white mb-4 font-normal text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col1.li2`)}
                  </p>
                </Link>
                <div
                  onClick={() => {
                    navigate("/?scroll=true");
                  }}
                >
                  <p className="text-white mb-4 font-normal cursor-pointer text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col1.li3`)}
                  </p>
                </div>
                {/* <Link to={"/reviews"} onClick={topFunction}>
                  <p className="text-white  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col1.li4`)}
                  </p>
                </Link> */}
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <p className="text-[#fff] font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                  {t(`footer.col2.title`)}
                </p>
              </div>
              <div className="mt-3 sm:mt-8 gap-y-2  sm:gap-y-4 pl-1">
                <Link
                  to={"/politics"}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  <p className="text-white mb-4 font-normal text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col2.li1`)}
                  </p>
                </Link>
                <Link to={"/ref"} onClick={() => window.scrollTo({ top: 0 })}>
                  <p className="text-white mb-4 font-normal text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col2.li2`)}
                  </p>
                </Link>
                <Link to={"/blog"} onClick={() => window.scrollTo({ top: 0 })}>
                  <p className="text-white mb-4 font-normal text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col2.li3`)}
                  </p>
                </Link>
                <Link
                  to={"/partners"}
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  <p className="text-white  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                    {t(`footer.col2.li4`)}
                  </p>
                </Link>
              </div>
            </div>

            <div className="hidden sm:flex flex-col mt-3 sm:mt-[-23px]">
              <Link to={"/"}>
                <p className="text-[#fff] font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                  {t(`footer.col3`)}
                </p>
              </Link>
              <div className="mt-8 gap-y-4">
                <>
                  <button
                    onClick={() => {
                      navigate(`/?cat=true`);
                      window.location.reload();
                    }}
                    className="border border-[#1348F9]  text-[#1348F9] px-10 py-3 rounded-md mb-12 transition duration-300 ease-in-out hover:bg-[#1348F9] hover:text-white"
                  >
                    {t(`footer.btn`)}
                  </button>
                </>
                {/* <div className="flex mb-4 justify-start items-start">
                  <div className="flex mt-2">
                    {lang?.map((item) => {
                      return (
                        item.selected && (
                          <img
                            onClick={changeLang}
                            src={item?.logo}
                            alt={item?.name}
                            width={29}
                            height={20}
                            className="cursor-pointer mr-3"
                          />
                        )
                      );
                    })}
                    <img
                      onClick={changeLang}
                      src={"/Vector.svg"}
                      alt="ru"
                      width={15}
                      height={5}
                      className="cursor-pointer"
                    />
                  </div>
                  {isLang && (
                    // <div className="bg-white h-[135px] w-[250px] rounded-lg ml-5 p-2">
                    //   <div className="flex mb-4 mt-2 sm:mt-0 ">
                    //     <img
                    //       src={"/gl.svg"}
                    //       alt="ru"
                    //       width={29}
                    //       height={20}
                    //       className="cursor-pointer mr-3"
                    //     />
                    //     <p className="text-black  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                    //       Netherlands
                    //     </p>
                    //   </div>

                    //   <div className="flex mb-4 ">
                    //     <img
                    //       src={"/fr.svg"}
                    //       alt="ru"
                    //       width={29}
                    //       height={20}
                    //       className="cursor-pointer mr-3"
                    //     />
                    //     <p className="text-black  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                    //       France
                    //     </p>
                    //   </div>

                    //   <div className="flex mb-4 ">
                    //     <img
                    //       src={"/en.svg"}
                    //       alt="ru"
                    //       width={29}
                    //       height={20}
                    //       className="cursor-pointer mr-3"
                    //     />
                    //     <p className="text-black  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                    //       England
                    //     </p>
                    //   </div>
                    // </div>
                    <div className="bg-white min-h-[135px] w-[250px] rounded-lg ml-5 p-2">
                      {lang?.map((item) => {
                        return (
                          !item?.selected && (
                            <div
                              onClick={() => {
                                handleLang(item.id);
                                switch (item.name) {
                                  case "Russian":
                                    handleChangeLanguage("ru");
                                    break;
                                  case "Netherlands":
                                    handleChangeLanguage("gl");
                                    break;
                                  case "France":
                                    handleChangeLanguage("fr");
                                    break;
                                  case "England":
                                    handleChangeLanguage("en");
                                    break;
                                  default:
                                    handleChangeLanguage("ru");
                                }
                              }}
                              className="flex mb-4 mt-2"
                            >
                              <img
                                src={item?.logo}
                                alt="ru"
                                width={29}
                                height={20}
                                className="cursor-pointer mr-3"
                              />
                              <p className="text-black md:font-semibold cursor-pointer font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                                {item?.name}
                              </p>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          <div className="sm:hidden px-[5%] pt-4 flex flex-col mt-3 sm:mt-[-23px]">
            <Link to={"/"}>
              <p className="text-[#fff] text-center sm:text-start font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                {t(`footer.col3`)}
              </p>
            </Link>
            <div className="mt-8 gap-y-4">
              <>
                <button
                  onClick={() => {
                    navigate(`/?cat=true`);
                    window.location.reload();
                  }}
                  className="border border-[#1348F9]  text-[#1348F9] px-10 py-3 rounded-md mb-12 transition duration-300 ease-in-out hover:bg-[#1348F9] hover:text-white"
                >
                  {t(`footer.btn`)}
                </button>
              </>
              {/* <div className="flex mb-4 justify-start items-start">
                <div className="flex mt-2">
                  {lang?.map((item) => {
                    return (
                      item.selected && (
                        <img
                          onClick={changeLang}
                          src={item?.logo}
                          alt={item?.name}
                          width={29}
                          height={20}
                          className="cursor-pointer mr-3"
                        />
                      )
                    );
                  })}
                  <img
                    onClick={changeLang}
                    src={"/Vector.svg"}
                    alt="ru"
                    width={15}
                    height={5}
                    className="cursor-pointer"
                  />
                </div>
                {isLang && (
                  <div className="bg-white min-h-[135px] w-[250px] rounded-lg ml-5 p-2">
                    {lang?.map((item) => {
                      return (
                        !item?.selected && (
                          <div
                            onClick={() => {
                              handleLang(item.id);
                              switch (item.name) {
                                case "Russian":
                                  handleChangeLanguage("ru");
                                  break;
                                case "Netherlands":
                                  handleChangeLanguage("gl");
                                  break;
                                case "France":
                                  handleChangeLanguage("fr");
                                  break;
                                case "England":
                                  handleChangeLanguage("en");
                                  break;
                                default:
                                  handleChangeLanguage("ru");
                              }
                            }}
                            className="flex mb-4 mt-2"
                          >
                            <img
                              src={item?.logo}
                              alt="ru"
                              width={29}
                              height={20}
                              className="cursor-pointer mr-3"
                            />
                            <p className="text-black md:font-semibold cursor-pointer font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                              {item?.name}
                            </p>
                          </div>
                        )
                      );
                    })}
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <p className="w-full flex justify-center text-white font-semibold text-[17px] font-raleway mt-8">
            {t(`pol.foot`)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
