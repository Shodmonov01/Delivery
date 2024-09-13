import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { UserNavbar, UserSidebar } from "../user";
import UserFooter from "../user/UserFooter";
import { Onas } from "../client";

const UserLayout = ({ children, title, desc }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>

      <UserNavbar />

      <main className="w-[100%] flex flex-row justify-between">
        <div className="w-[0%] md:w-[15%]">
          <UserSidebar />
        </div>
        <div className="w-[100%] md:w-[85%] bg-[#F6F6F6] xl:pl-[5%]">
          {children}
        </div>
      </main>
      
      <footer className="md:ml-[15%] w-full md:w-[85%] min-h-[300px] bg-[#0F172A]">
        <UserFooter/>
      </footer>
    </>
  );
};

UserLayout.defaultProps = {
  title: "User",
};

export default UserLayout;
