import { Link, json } from "react-router-dom";
import "./navbar.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { ForgotPassword, Login, Register, Email } from ".";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import { SideContext } from "../../context/sidemenu";
import MultiLevelDropdown from "./Dropdown";
import { BASE_URL } from "../../service/auth";
import axios from "axios";
import { useCalc } from "../../hooks/useCalc";

const Navbar = () => {
  const [lang, setLang] = useState([
    { id: 1, name: "Russian", logo: "/ru.svg", selected: true },
    { id: 2, name: "Netherlands", logo: "/gl.svg", selected: false },
    { id: 3, name: "France", logo: "/fr.svg", selected: false },
    { id: 4, name: "England", logo: "/en.svg", selected: false },
  ]);
  const [isMenu, setIsMenu] = useState(false);
  const handleClick = () => setIsMenu((prev) => !prev);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isService, setIsService] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  // const [isLang, setIsLang] = useState(false);
  const [t, i18n] = useTranslation("global");
  // const [isHead, setIsHead] = useState(false);
  const [data, setData] = useState([]);
  const userCookie = localStorage.getItem("user");
  const [isEmail, setIsEmail] = useState(false);
  const [isUser, setIsUser] = useState(
    userCookie ? JSON.parse(userCookie) : null
  );
  const { setSide } = useContext(SideContext);

  const { user } = useContext(AuthContext);

  const {resetData} = useCalc()

  // const changeLang = useCallback(() => {
  //   setIsLang((prev) => !prev);
  // }, []);


  const handleChangeLanguage = useCallback((lang) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  const handleLang = useCallback((id) => {
    let newArr = [...lang];
    newArr.map((item) => {
      item.selected = false;
      if (item?.id === id) {
        item.selected = true;
      }
    });
    setLang(newArr);
  }, [lang, setLang]);

  const clickHandler = useCallback((e) => {
    e.stopPropagation();
    if (!user?.isUser) {
      setIsRegister(true);
    } else {
      setSide((prev) => !prev);
    }
  }, [user, setIsRegister, setSide]);

  const clickSideMenu = useCallback((e) => {
    e.stopPropagation();
    setSide((prev) => !prev);
  }, [setSide]);

  const topFunction = () => {
    window.scrollTo({ top: 0 });
  };

  const getData = useCallback(() => {
    const data = localStorage.getItem("user");
    data ? setIsUser(JSON.parse(data)) : setIsUser(null);
  }, [setIsUser]);

  useEffect(() => {
    getData();
  }, [getData, localStorage.getItem("user")]);

  const getCardData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/service_get_post_views/`
      );
      setData(data?.data?.results);
    } catch (error) {
      console.log(error.message);
    }
  }, [BASE_URL, setData]);
  useEffect(() => {
    getCardData();

  }, [getCardData]);

  const generateRandomWord = useCallback((length) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let word = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      word += letters[randomIndex];
    }
    return word;
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

  const handleChangeLang = useCallback((item) => {
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
  }, [handleChangeLanguage, handleLang]);

  console.log('Navbar component re-rendered');
  return (
    <div className="z-[99999]">
      <div
        style={{ background: "rgba(19, 72, 249, 1)" }}
        className={`h-[90px] lg:h-[118px] w-full hidden lg:flex items-center left-0 top-0 bgImage sticky `}
      >
        <div className="w-[100%] md:w-[90%] mx-auto lg:flex items-center hidden">
          <Link onClick={() => {
            topFunction()
            resetData()
          }} to={"/"} className="w-[18%]">
            <img
              src={"/logo1.svg"}
              alt="logo"
              width={90}
              height={80}
              className="object-cover"
            />
          </Link>
          <div className="w-[82%] flex justify-between">
            <div className="flex w-[45%] justify-between items-center">
              <MultiLevelDropdown />
              <Link
                to={`/calculator?active=${generateRandomWord(4)}`}
                onClick={topFunction}
                className="mr-5 hover:text-gray-900 font-medium text-[20px] text-white"
              >
                {t(`nav.nav2`)}
              </Link>
              {/* <Link
                to={"/reviews"}
                onClick={topFunction}
                className="mr-5 hover:text-gray-900 font-medium text-[20px] text-white"
              >
                {t(`nav.nav3`)}
              </Link> */}
              <Link
                to={"/blog"}
                onClick={topFunction}
                className="mr-5 hover:text-gray-900 font-medium text-[20px] text-white"
              >
                {t(`nav.nav4`)}
              </Link>
            </div>
            <div className="w-[55%] flex justify-end items-center">
              {!isUser && (
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[18px] font-semibold text-white mr-5 hover:text-gray-900"
                >
                  {t(`nav.auth1`)}
                </button>
              )}
              {isUser ? (
                <div onClick={clickSideMenu} className="flex space-x-2 mr-5">
                  <button
                    onClick={clickSideMenu}
                    className="font-bold cursor-pointer text-[20px] capitalize  text-white p-3 transition duration-200 ease-in-out"
                  >
                    {user?.username}
                  </button>
                  <img
                    src="/Vector.svg"
                    alt=""
                    width={15}
                    height={5}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <button
                  // to={"/"}
                  onClick={() => setIsRegister((prev) => !prev)}
                  className="font-bold mr-5 text-[17px] border text-white p-3 rounded-md  hover:border-transparent transition duration-200 ease-in-out hover:bg-white hover:text-[#1348F9]"
                >
                  {t(`nav.auth2`)}
                </button>
              )}
              {/* <div className="flex">
                {lang?.map((item) => {
                  return (
                    item.selected && (
                      <img
                        onClick={() => setIsHead((prev) => !prev)}
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
                  onClick={() => setIsHead((prev) => !prev)}
                  src={"/Vector.svg"}
                  alt="ru"
                  width={15}
                  height={5}
                  className="cursor-pointer"
                />

                {isHead && (
                  <div className="bg-gradient h-[160px] w-[200px] p-2 flex flex-col absolute right-0 z-[999999] top-[116px]">
                    {lang?.map((item) => {
                      return (
                        !item?.selected && (
                          <div
                            role="button"
                            key={item?.id}
                            onClick={() => handleChangeLang(item)}
                            className="flex mb-4 mt-2"
                          >
                            <img
                              src={item?.logo}
                              alt="ru"
                              width={29}
                              height={20}
                              className="cursor-pointer mr-3"
                            />
                            <p className="text-white cursor-pointer font-medium text-[15px] sm:text-[17px] md:text-[19px]">
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
      </div>

      {isRegister && (
        <Register setIsRegister={setIsRegister} setIsEmail={setIsEmail} setIsLogin={setIsLogin} />
      )}

      {
        isEmail && (
          <Email setIsEmail={setIsEmail} />
        )
      }

      {isLogin && (
        <Login
          setIsLogin={setIsLogin}
          setIsRegister={setIsRegister}
          setIsForgotPassword={setIsForgotPassword}
        />
      )}

      {isForgotPassword && (
        <ForgotPassword
          setIsForgotPassword={setIsForgotPassword}
          setIsLogin={setIsLogin}
        />
      )}

      {/* mob section */}
      <div className="h-[80px] lg:hidden ">
        <Box sx={{ flexGrow: 1 }}>
          <div
            style={{ position: "fixed", top: 0 }}
            className={`${isMenu ? "bg-[#050038] " : "bg-white"
              } w-[100%] shadow-xl py-2 px-3 sticky top-0 z-50 `}
          >
            <div style={{ display: "flex", justifyContent: "space-between " }}>
              <Link to={"/"} onClick={() => {
            topFunction()
            resetData()
          }} >
                <div className="w-[38%]">
                  {isMenu ? (
                    <img
                      src={"/logo1.svg"}
                      alt="logo"
                      width={118}
                      height={108}
                      className="object-cover"
                    />
                  ) : (
                    <img
                      src={"/logo7.svg"}
                      alt="logo"
                      width={118}
                      height={108}
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>

              <div>
                {!isMenu && (
                  <button
                    onClick={clickHandler}
                    className="bg-[#1348F9] mr-5 py-2 px-4 rounded-full text-white font-semibold"
                  >
                    {user?.isUser ? user?.username : t(`nav.auth2`)}
                  </button>
                )}
                {isMenu ? (
                  <IconButton
                    onClick={handleClick}
                    size="large"
                    edge="start"
                    sx={{ color: "white" }}
                    aria-label="menu"
                  >
                    <ClearIcon fontSize="medium" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleClick}
                    size="large"
                    edge="start"
                    sx={{ color: "black" }}
                    aria-label="menu"
                  >
                    <MenuIcon fontSize="medium" />
                  </IconButton>
                )}
              </div>
            </div>
          </div>
        </Box>
      </div>

      {isMenu && (
        <div className="w-[100%] h-screen fixed flex flex-col justify-start items-start top-[60px] left-0 bg-[#050038] z-50 lg:hidden">
          <div className="w-[100%] mt-8 flex flex-col px-4">
            <div className="h-[2px] w-[100%] bg-heroGreey rounded-lg mb-2 mt-2"></div>
            <div className="flex justify-between ">
              <Link
                to={"/services"}
                onClick={() => {
                  topFunction();
                  setIsMenu(false);
                }}
                className="mr-2 text-[20px] text-white font-semibold"
              >
                {t(`nav.nav1`)}
              </Link>
              <img
                onClick={() => setIsService((prev) => !prev)}
                src={"/Vector.svg"}
                className={`mr-5 ${isService ? "rotate-180" : "rotate-0"}`}
                alt="vector"
                width={15}
                height={5}
              />
            </div>
            {isService && (
              <div className="flex flex-col gap-y-2 my-2">
                {data?.map((c, idx) => (
                  <Link
                    to={`/services/${c?.id}`}
                    onClick={() => {
                      setIsMenu(false);
                      topFunction();
                    }}
                    key={c?.id}
                    className="text-white font-semibold text-[18px] ml-2 line-clamp-1 border-b border-white"
                  >
                    {renderElement(i18n?.language, data[idx])}
                  </Link>
                ))}
              </div>
            )}
            <div className="h-[2px] w-[100%] bg-heroGreey rounded-lg mb-2 mt-2"></div>

            <Link
              onClick={() => {
                setIsMenu(false);
                topFunction();
              }}
              to={`/calculator?active=${generateRandomWord(4)}`}
              className="mr-5  text-[20px] text-white  font-semibold"
            >
              {t(`nav.nav2`)}
            </Link>
            <div className="h-[2px] w-[100%] bg-heroGreey rounded-lg mb-2 mt-2"></div>

            {/* <Link
              onClick={() => {
                setIsMenu(false);
                topFunction();
              }}
              to={"/reviews"}
              className="mr-5   text-[20px] text-white  font-semibold"
            >
              {t(`nav.nav3`)}
            </Link> */}
            {/* <div className="h-[2px] w-[100%] bg-heroGreey rounded-lg mb-2 mt-2"></div> */}

            <Link
              onClick={() => {
                setIsMenu(false);
                topFunction();
              }}
              to={"/blog"}
              className="mr-5 font-semibold text-[20px] text-white"
            >
              {t(`nav.nav4`)}
            </Link>
          </div>

          <div className="mt-9 w-[100%] flex justify-center pt-9 flex-col items-center">
            {!userCookie && (
              <button
                onClick={() => {
                  setIsMenu(false);
                  setIsRegister(true);
                }}
                className="w-[200px]"
              >
                <p className="bg-[#1348F9] text-white py-3 px-8 text-center rounded-full font-semibold mb-8  ">
                  {t(`nav.auth2`)}
                </p>
              </button>
            )}

            <div className="flex">
              {!userCookie && (
                <button
                  onClick={() => {
                    setIsMenu(false);
                    setIsLogin(true);
                  }}
                >
                  <p className="text-white text-md font-semibold mr-5">
                    {t(`nav.auth1`)}
                  </p>
                </button>
              )}
              <p className="text-white text-md font-semibold md:flex hidden">
                {t(`footer.btn`)}
              </p>
            </div>

            {/* <div className="mt-8 flex items-center">
              <LanguageIcon
                fontSize="large"
                sx={{ color: "white", marginRight: "20px" }}
              />
              <div className="flex">
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
            </div> */}

            {/* {isLang && (
              <div className="bg-white h-[145px] w-[250px] rounded-lg ml-5 p-2 mt-6 flex flex-col">
                {lang?.map((item) => {
                  return (
                    !item?.selected && (
                      <div
                        onClick={() => handleChangeLang(item)}
                        className="flex mb-4 mt-2"
                      >
                        <img
                          src={item?.logo}
                          alt="ru"
                          width={29}
                          height={20}
                          className="cursor-pointer mr-3"
                        />
                        <p className="text-black  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                          {item?.name}
                        </p>
                      </div>
                    )
                  );
                })}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Navbar);
