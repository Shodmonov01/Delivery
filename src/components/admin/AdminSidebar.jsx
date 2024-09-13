import { useState } from "react";
import { sidebars } from "../../data";
import "./side.css";

// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = ({ isMenu }) => {
  const navigate = useNavigate();
  const storedSidebar = localStorage.getItem("sidebar");
  const initialSidebar = storedSidebar ? JSON.parse(storedSidebar) : sidebars;
  const [copy, setCopy] = useState(initialSidebar);
  const [submenu, setSubMenu] = useState([]);

  const handleSelect = (id) => {
    let a = [...copy];
    a.map((item) => {
      if (item.id == id) {
        item.visible = item.nav == 0 ? true : item.visible ? false: true;
        navigate(item?.link);
        item.nav = item.nav == 1 ? 2 : 1
        setSubMenu(item?.submenu);
        localStorage.setItem("sidebar", JSON.stringify(copy));
      } else {
        item.visible = false;
        localStorage.setItem("sidebar", JSON.stringify(copy));
      }
    });
    setCopy(a);
  };

  const handleFull = (id) => {
    const res = [...copy];
    res?.map((item) => {
      item?.submenu?.map((c) => {
        if (c.id == id) {
          c.visible = c.visible ? false: true;
          c.nav && navigate(c?.link);
          setSubMenu(c?.submenu);
          localStorage.setItem("sidebar", JSON.stringify(copy));
        } else {
          c.visible = false;
          localStorage.setItem("sidebar", JSON.stringify(copy));
        }
      });
    });

    setCopy(res);
  };

  return (
    <div
      className={`${
        isMenu ? "hidden" : "sm:w-[20%] z-[9999]"
      } fixed mb-[100px] left-0 overflow-y-scroll h-screen sm:h-[100vh] bg-[#2F2E40] top-[100px]`}
    >
      <div className="w-[100%] h-full flex flex-col">
        <div className="">
          <div className="flex flex-col mt-8 gap-y-2 ">
            {copy?.map((item, index) => (
              <div key={index} onClick={() => handleSelect(item?.id)}>
                <div
                  className={`text-heroLight py-[10px]  ${
                    item.visible && item.nav == 0
                      ? "bg-white border-l-[5px] border-l-blue-600 "
                      : "mb-2"
                  } cursor-pointer nav-link flex justify-between items-center`}
                >
                  <div className="flex w-[100%] mx-6 items-center justify-between">
                    <div className="flex  focus:text-black">
                      <div className="w-7 h-6 cursor-pointer">
                        <img
                          src={item.logo}
                          alt="side1"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p
                          className={`ml-4 font-medium ${
                            item.visible &&
                            item.nav == 0 &&
                            "text-[#2F2E40CC] mt-[2px]"
                          }`}
                          // onClick={() => setSide1Drop((prev) => !prev)}
                        >
                          {item?.title}
                        </p>
                      </div>
                    </div>
                    {item?.nav == 1 ? (
                      <div className="w-2 h-2" onClick={() => (item.nav = 2)}>
                        <img
                          src="/side.svg"
                          alt="side1"
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      item?.nav == 2 && (
                        <div className="w-3 h-2" onClick={() => (item.nav = 1)}>
                          <img
                            src="/back.svg"
                            alt="side2"
                            width={100}
                            height={100}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div
                  className={`${item?.visible && "mt-4"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.visible &&
                    item?.submenu.map((item, index) => (
                      <div className="flex flex-col bg-[#888] z-20" key={index}>
                        <Link
                          to={item?.link}
                          onClick={() => handleFull(item?.id)}
                          className={`text-[#0000009c] ${
                            item?.visible &&
                            "bg-white  border-l-[5px] border-l-blue-600"
                          } focus:text-[#000] nav-link flex justify-between items-center focus:bg-[#48475874] py-3 `}
                        >
                          <div className="flex w-[100%] mx-6 ">
                            <div
                              className={`ml-2 mt-[6px]  w-[14px] h-[14px] rounded-full border-2 object-cover ${
                                item?.visible
                                  ? "border-black ml-[2px] "
                                  : "border-white"
                              }`}
                            ></div>
                            <div className="">
                              <p className="ml-4  font-medium">{item?.title}</p>
                            </div>
                          </div>
                        </Link>
                        {/* <Link
                        to={"/client"}
                        className={`text-[#0000009c]  focus:text-[#000] nav-link flex justify-between items-center focus:bg-[#48475874] py-3 `}
                      >
                        <div className="flex w-[100%] mx-6 ">
                          <div className="ml-2 mt-[6px]  w-[14px] h-[14px] rounded-full border-2 object-cover border-white"></div>
                          <div className="">
                            <p className="ml-4  font-medium">Список клиентов</p>
                          </div>
                        </div>
                      </Link> */}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

