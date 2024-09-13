import { memo } from "react";
import StepperForm from "./StepperForm";

const Stepper = () => {
  return (
    <div className="w-[100%] p-0 sm:p-9 rounded-lg">
      <StepperForm />
    </div>
  );
};

export default memo(Stepper);
