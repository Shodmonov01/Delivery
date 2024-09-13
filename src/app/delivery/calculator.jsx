import { memo } from "react"
import { Stepper } from "../../components/client"
import RootLayout from "../../components/layouts/RootLayout"

const Calculator = () => {
  return (
   <RootLayout title="Калькулятор">
     <div className="bg-[#F6F6F6]">
        <div className={`w-[90%] mx-auto py-9`}>
          <Stepper />
        </div>
    </div>
   </RootLayout>
  )
}

export default memo(Calculator)