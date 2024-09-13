import React, { memo, Suspense, useState } from "react";
import { Helmet } from "react-helmet";
import { Footer, Navbar, Onas } from "../client";
import { MdOutlineClear } from "react-icons/md";
import MainLoader from "../client/MainLoader";

const RootLayout = ({ children, title, desc }) => {
  const [isPrice, setIsPrice] = useState(false);

  return (
    <Suspense fallback={<MainLoader />}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      {isPrice && (
        <div className="fixed z-[99999999] overflow-y-auto py-6 top-0 left-0 w-full h-screen bg-white">
          <div className="absolute right-4 top-4">
            <MdOutlineClear fontSize={24} onClick={() => setIsPrice(false)} cursor={"pointer"} />
          </div>
          <Onas />
        </div>
      )}
      {!isPrice && (
        <nav className="relative z-50 top-0">
          <Navbar />
        </nav>
      )}
      <main>{children}</main>
      <footer>
        <Footer setIsPrice={setIsPrice} />
      </footer>
    </Suspense>
  );
};

RootLayout.defaultProps = {
  title: "Delivery",
};

export default memo(RootLayout);
