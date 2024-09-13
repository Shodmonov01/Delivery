import { Switch } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StepHero = ({ setStep, step, newField, setNew }) => {
  const [t] = useTranslation("global");
  const [is_transport, setIsTransport] = useState(true);
  const [is_cargo, setIsCargo] = useState(false);

  const nextStep = async (e) => {
    e.preventDefault();
    try {
      setNew({ ...newField, transport: is_transport, isCargo: is_cargo });
      setStep({
        ...step,
        step5: false,
        step2: false,
        step1: true,
        step3: false,
        step4: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsCargo(newField.isCargo);
    setIsTransport(newField.transport);
  }, [newField]);
  return (
    <div className="min-h-[70vh] gap-y-10 flex items-center justify-center w-full flex-col">
      <h2 className="font-raleway md:font-bold font-semibold lg:text-[55px] md:text-[42px] text-[32px] text-[#2F2E40]">
        {t(`calsection.hero`)}
      </h2>
      <div className="flex md:flex-row flex-col gap-y-3 gap-x-6 shadow-lg p-6 rounded-lg">
        <div className="flex gap-x-2 items-center">
          <Switch
            // value={is_transport}
            checked={is_transport}
            onClick={() => {
              setIsTransport(true);
              setIsCargo(false);
            }}
          />
          <p className="text-[#2F2E40] font-medium text-base md:text-[20px] font-raleway">
            {t(`calsection.cl5`)}
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <Switch
            // value={is_cargo}
            checked={is_cargo}
            onClick={() => {
              setIsTransport(false);
              setIsCargo(true);
            }}
          />
          <p className="text-[#2F2E40] font-medium text-base md:text-[20px] font-raleway">
            {t(`calsection.cl6`)}
          </p>
        </div>
      </div>
      <button
        onClick={nextStep}
        className="bgImage h-[62px] text-center text-white px-6 rounded-lg font-semibold text-base md:text-[20px] font-raleway"
      >
        {t(`calsection.btn`)}
      </button>
    </div>
  );
};

export default memo(StepHero);
