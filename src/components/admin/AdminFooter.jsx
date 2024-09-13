import { Link } from "react-router-dom"

const AdminFooter = () => {
  return (
    <div className="w-[100%]  bg-[#0F172A]">
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 pt-8">
          <div className={`flex flex-col justify-center}`}>
            <div className="w-[144px] [h-124px]">
              <img
                src={"/logo1.svg"}
                alt="logo"
                width={100}
                height={100}
                className="object-cover w-[100%] h-[100%]"
              />
            </div>
            <div className="flex flow-row mt-8">
              <div className="w-[40px] [h-14px] mr-3">
                <img
                  src={"/mail.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className="object-cover w-[100%] h-[100%]"
                />
              </div>
              <p className="text-white text-[15px] md:text-[18px] font-medium">
                ssuport@uk2eu.com
              </p>
            </div>
            <div className="flex flow-row mt-6 items-center">
              <div className="w-[40px] [h-14px] mr-3">
                <img
                  src={"/phone.svg"}
                  alt="logo"
                  width={100}
                  height={100}
                  className="object-cover w-[100%] h-[100%]"
                />
              </div>
              <p className="text-white tetx-[15px] md:text-[18px] font-medium">
                894-912-98-49
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <Link to={"/"}>
              <p className="text-[#fff] font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                Компания
              </p>
            </Link>
            <div className="mt-8 gap-y-4">
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  О нас
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Услуги
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Цены
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Отзывы
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link to={"/"}>
              <p className="text-[#fff] font-bold text-[18px] sm:text-[20px] md:text-[23px]">
                Помощь
              </p>
            </Link>
            <div className="mt-8 gap-y-4">
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Политика и конфиденциальность
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Справка
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white mb-4 font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Блог
                </p>
              </Link>
              <Link to={"/"}>
                <p className="text-white  font-medium text-[15px] sm:text-[17px] md:text-[19px]">
                  Партнеры
                </p>
              </Link>
            </div>
          </div>

         
        </div>
      </div>
  )
}

export default AdminFooter