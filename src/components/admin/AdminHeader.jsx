import DehazeIcon from "@mui/icons-material/Dehaze";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = ({ setIsMenu, isMenu }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null)

  const closeHandler = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("Admin");
    navigate("/");
  };

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("Admin")))
  }, [])

  return (
    <div className="h-[100px] bg-Primary flex flex-row items-center z-40 relative">
      <div className="w-[100%] flex flex-row justify-between items-center">
        <Link to={'/admin'} className={`${isMenu ? "hidden" : "hidden sm:flex w-[20%]"} flex justify-center`}>
          <p className="text-[30px] sm:block hidden font-semibold text-white font-montserrat">
          Администратор
          </p>
        </Link>
        <div
          className={`${
            isMenu ? "w-[100%]" : "w-full sm:w-[80%]"
          } flex flex-row justify-between items-center`}
        >
          <div className="ml-8">
            <IconButton onClick={() => setIsMenu((prev) => !prev)}>
              <DehazeIcon sx={{ color: "white" }} fontSize="medium" />
            </IconButton>
          </div>
          <div className="flex items-center mr-[10%] cursor-pointer">
            <div 
            onClick={() => setOpen(prev => !prev)}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <p className="text-Primary font-semibold text-[18px]">{admin?.username[0]}</p>
            </div>
            <div className="flex ml-6">
              <p 
              onClick={() => setOpen(prev => !prev)}
              className="font-bold text-lg text-white mr-4 font-montserrat cursor-pointer">
                 {admin?.username}
              </p>
              <img 
              onClick={() => setOpen(prev => !prev)}
              src="./Vector.svg" alt="vector" width={16} height={16} className="cursor-pointer" />
            </div>
            {open && (
              <div className="absolute cursor-pointer top-[100px] flex flex-col justify-start right-[7%] bg-white w-[150px] border ">
                <button className="p-2 font-raleway font-semibold border-b"> {admin?.username}</button>
                <button
                onClick={closeHandler}
                className="p-2 font-raleway font-semibold ">Выход</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
