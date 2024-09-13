import React from "react";
import RootLayout from "../../components/layouts/RootLayout";
import { useTranslation } from "react-i18next";

const Thank = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <RootLayout title={"Thank you for your order"}>
      <div className="flex flex-col gap-y-8 w-full justify-center py-20">
        <h2 className="text-heroPrimary font-semibold text-[30px] md:text-[55px] text-center">{t("calc3.a5")}</h2>
        <span className="text-black font-semibold text-lg md:text-[20px] text-center font-~montserrat">{t("calc3.a6")}</span>
      </div>
    </RootLayout>
  );
};

export default Thank;
