import React, { useContext } from "react";
import { DropContext } from "../context/DropdownContext";
import { Link, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useTranslation } from "react-i18next";

const Sidedata = ({ setSide, setUser }) => {
  const [t] = useTranslation("global");
  const { drop } = useContext(DropContext);
  // const { setSide } = useContext(SideContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSide(false);
    navigate("/");
    setUser({
      side: false,
      phone: "",
      pochta_index: "",
      username: "",
      uidd: "",
      isUser: false,
      id: 0,
      adress: "",
      context: "",
      email: "",
      first_name: "",
      last_name: "",
      groups: [{ id: NaN, name: "" }],
    });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white min-w-[250px] z-[989898] md:min-w-[300px] shadow-xl border rounded-md py-3 px-8 fixed right-[5.2%] top-[100px] md:top-[140px] md:z-30"
    >
      <p className="text-[15px] md:text-[19px] text-[#1348F9] font-medium md:font-semibold lg:font-bold">
        {drop?.first_name} {drop?.last_name} {drop?.username}
      </p>
      <p className="text-[14px] pb-2 font-normal md:text-[16px] lg:tetx-[18px] mt-2 text-[#2F2E40]">
        {drop?.email}
      </p>
      <p className="mt-2 text-[13px] sm:text-[14px] md:text-[16px] font-light md:font-normal text-[#2F2E40]">
        {drop?.uidd.length > 0 && "ID:"} {drop?.uidd}
      </p>
      <div className="mt-2 flex items-center">
        <div className="w-6 h-6 mr-[15%]">
          <img src="/dark.svg" alt="one" className="w-full h-full" />
        </div>
        <Link
          to={"/user-home"}
          className="text-[14px] sm:text-[17px] text-[#2F2E40CC] "
        >
          {t("my_ads")}
        </Link>
      </div>
      <div className="mt-2 flex items-center">
        <div className="w-6 h-6 mr-[15%]">
          <img src="/dal.svg" alt="one" className="w-full h-full" />
        </div>
        <Link
          to={"/user-home"}
          onClick={() => setSide(false)}
          className="text-[14px] sm:text-[17px] text-[#2F2E40CC] "
        >
          {t("user_profile")}
        </Link>
      </div>
      <div className="mt-2 flex items-center">
        <div className="w-6 h-6 mr-[15%]">
          <img src="/ark.svg" alt="one" className="w-full h-full" />
        </div>
        <Link
          to={"/user-profile"}
          className="text-[14px] sm:text-[17px] text-[#2F2E40CC] "
        >
          {t("account_details")}
        </Link>
      </div>

      <button
        style={{ background: "rgba(163, 163, 163, 0.1)" }}
        onClick={() => handleLogout()}
        className="flex items-center cursor-pointer p-2 rounded-lg border w-full justify-center mt-4"
      >
        <button onClick={() => handleLogout()} className="mr-2">
          <PowerSettingsNewIcon sx={{ color: "#1348F9" }} />
        </button>
        <p
          onClick={() => handleLogout()}
          className="text-[15px] sm:text-[16px] md:text-[18px] tetx-[#1348F9] font-medium md:font-semibold text-[#1348F9]"
        >
          {t("exit")}
        </p>
      </button>
    </div>
  );
};

export default Sidedata;
