import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { AdminFooter, AdminHeader, AdminSidebar } from "../admin";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children, title, desc }) => {
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isAdmin = token ? token : "";

  return isAdmin.length > 0 ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      <header className="w-[100%] h-[100px] flex flex-row justify-between items-center">
        <section className={`${isMenu ? "w-0" : "w-full sm:w-[20%]"}`}>
          <AdminSidebar isMenu={isMenu} />
        </section>
        <section className="w-[100%] fixed top-0 right-0 z-10">
          <AdminHeader setIsMenu={setIsMenu} isMenu={isMenu} />
        </section>
      </header>
      <main
        className={`${
          !isMenu && "sm:ml-[20%] sm:pl-[1%] sm:pr-[7%]"
        } bg-[#f6f6f6] overflow-y-auto`}
      >
        {children}
      </main>
      <footer
        className={`${
          isMenu ? "w-full" : "sm:ml-[20%] w-full sm:w-[80%]"
        } min-h-[300px] bg-[#0F172A]`}
      >
        <AdminFooter />
      </footer>
    </>
  ) : (
    navigate("/")
  );
};

AdminLayout.defaultProps = {
  title: "Delivery",
};

export default AdminLayout;
