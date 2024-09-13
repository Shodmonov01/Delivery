
import AdminLayout from "../../components/layouts/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [count, setCount] = useState([])
  const getFullCount = async () => {
    const token = localStorage.getItem("token")
    const config = {header: {Authorization: "Bearer " + (token)}}
    const {data} = await axios.get(`${BASE_URL}/c_dashboard/countert_list_views/`, config)
    setCount(data)
  }

  console.log(count)

  useEffect(() => {
    getFullCount()
  }, [])
  return (
    <AdminLayout>
      <div className="p-6 flex flex-col gap-y-8 z-0">
        <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] text-lightGreey font-semibold">
          Информационная панель
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
          <div className="bg-[#fff] shadow-lg h-[249px] relative">
            <div className="absolute top-0 left-0">
              <div className="p-6 flex flex-col">
                <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] xl:text-[60px] text-Primary font-semibold">
                  {count?.client}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[23px] text-lightGreey font-semibold">
                  Клиенты
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="p-6">
                <div className="w-32 h-32">
                  <svg
                    width={129}
                    height={113}
                    viewBox="0 0 129 113"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M97 107C97 95.8438 82.4493 86.8 64.5 86.8C46.5507 86.8 32 95.8438 32 107M123 86.8025C123 78.5192 114.978 71.4004 103.5 68.2833M6 86.8025C6 78.5192 14.0216 71.4004 25.5 68.2833M103.5 41.2564C107.489 37.5577 110 32.1826 110 26.2C110 15.0438 101.27 6 90.5 6C85.5057 6 80.9499 7.94495 77.5 11.1435M25.5 41.2564C21.5106 37.5577 19 32.1826 19 26.2C19 15.0438 27.7304 6 38.5 6C43.4943 6 48.0501 7.94495 51.5 11.1435M64.5 66.6C53.7304 66.6 45 57.5562 45 46.4C45 35.2438 53.7304 26.2 64.5 26.2C75.2696 26.2 84 35.2438 84 46.4C84 57.5562 75.2696 66.6 64.5 66.6Z"
                      stroke="#ABAFB6"
                      strokeOpacity="0.3"
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-[100%] bg-[#85858537] h-[48px] flex items-center justify-center">
              <Link to={'/client'} className="flex justify-center w-[100%]">
                <p className="mr-8 text-[#ABAFB6]">Подробная информация</p>
                <svg
                  width={27}
                  height={27}
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7778 17.3333L18.6111 13.5M18.6111 13.5L14.7778 9.66667M18.6111 13.5H8.38889M25 13.5C25 7.14873 19.8513 2 13.5 2C7.14873 2 2 7.14873 2 13.5C2 19.8513 7.14873 25 13.5 25C19.8513 25 25 19.8513 25 13.5Z"
                    stroke="#ABAFB6"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-[#fff] shadow-lg h-[249px] relative">
            <div className="absolute top-0 left-0">
              <div className="p-6 flex flex-col">
                <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] xl:text-[60px] text-Primary font-semibold">
                  {count?.supplicer}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[23px] text-lightGreey font-semibold">
                  Грузоотправители
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="p-6">
                <div className="w-32 h-32">
                  <svg
                    width={128}
                    height={128}
                    viewBox="0 0 111 103"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.5018 28.75H25.4721C17.9998 28.75 14.2668 28.75 11.6092 30.258C9.27697 31.5813 7.48422 33.6717 6.54808 36.1649C5.48197 39.0042 6.09563 42.6464 7.32252 49.9284L7.32509 49.942L12.6913 81.792C13.6016 87.195 14.0598 89.8976 15.4226 91.9248C16.6239 93.7118 18.3102 95.1246 20.2896 96.003C22.5351 96.9995 25.3026 97 30.8398 97H80.1615C85.6987 97 88.4644 96.9995 90.7099 96.003C92.6893 95.1246 94.3769 93.7118 95.5782 91.9248C96.941 89.8976 97.3967 87.195 98.307 81.792L103.673 49.942L103.678 49.9199C104.904 42.6436 105.518 39.0031 104.452 36.1649C103.516 33.6717 101.727 31.5813 99.3953 30.258C96.7376 28.75 92.9985 28.75 85.5263 28.75H78.4981M32.5018 28.75H78.4981M32.5018 28.75C32.5018 16.1855 42.7984 6 55.4999 6C68.2014 6 78.4981 16.1855 78.4981 28.75"
                      stroke="#ABAFB6"
                      strokeOpacity="0.3"
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-[100%] bg-[#85858537] h-[48px] flex items-center justify-center">
              <Link to={'/shippers'} className="flex justify-center w-[100%]">
                <p className="mr-8 text-[#ABAFB6]">Подробная информация</p>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7778 17.3333L18.6111 13.5M18.6111 13.5L14.7778 9.66667M18.6111 13.5H8.38889M25 13.5C25 7.14873 19.8513 2 13.5 2C7.14873 2 2 7.14873 2 13.5C2 19.8513 7.14873 25 13.5 25C19.8513 25 25 19.8513 25 13.5Z"
                    stroke="#ABAFB6"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-[#fff] shadow-lg h-[249px] relative">
            <div className="absolute top-0 left-0">
              <div className="p-6 flex flex-col">
                <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] xl:text-[60px] text-Primary font-semibold">
                  {count?.send_email}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[23px] text-lightGreey font-semibold">
                  Отправки
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="p-6">
                <div className="w-32 h-32">
                  <svg
                    width="124"
                    height="127"
                    viewBox="0 0 124 127"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M94.7918 95.4444C87.7863 95.4444 82.1073 101.165 82.1073 108.222C82.1073 115.279 87.7863 121 94.7918 121C101.797 121 107.476 115.279 107.476 108.222C107.476 101.165 101.797 95.4444 94.7918 95.4444ZM94.7918 95.4444H45.9179C42.9937 95.4444 41.529 95.4444 40.3251 94.9204C39.263 94.458 38.3417 93.7138 37.6704 92.7646C36.918 91.7006 36.6153 90.2778 36.0163 87.4617L20.4064 14.0797C19.7934 11.1982 19.4828 9.75907 18.7217 8.68283C18.0504 7.73362 17.1292 6.98653 16.0672 6.5242C14.863 6 13.4064 6 10.481 6H6M25.0268 25.1667H106.672C111.25 25.1667 113.537 25.1667 115.073 26.1273C116.419 26.9687 117.404 28.2884 117.834 29.8242C118.324 31.5775 117.694 33.7914 116.425 38.2221L107.644 68.8888C106.885 71.5379 106.506 72.86 105.736 73.8429C105.057 74.7105 104.161 75.3897 103.145 75.8067C101.997 76.2778 100.634 76.2778 97.9128 76.2778H36.0019M37.7114 121C30.7059 121 25.0268 115.279 25.0268 108.222C25.0268 101.165 30.7059 95.4444 37.7114 95.4444C44.7168 95.4444 50.3959 101.165 50.3959 108.222C50.3959 115.279 44.7168 121 37.7114 121Z"
                      stroke="#ABAFB6"
                      stroke-opacity="0.3"
                      stroke-width="12"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-[100%] bg-[#85858537] h-[48px] flex items-center justify-center">
              <Link to={'/dispatch'} className="flex justify-center w-[100%]">
                <p className="mr-8 text-[#ABAFB6]">Подробная информация</p>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7778 17.3333L18.6111 13.5M18.6111 13.5L14.7778 9.66667M18.6111 13.5H8.38889M25 13.5C25 7.14873 19.8513 2 13.5 2C7.14873 2 2 7.14873 2 13.5C2 19.8513 7.14873 25 13.5 25C19.8513 25 25 19.8513 25 13.5Z"
                    stroke="#ABAFB6"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-[#fff] shadow-lg h-[249px] relative">
            <div className="absolute top-0 left-0">
              <div className="p-6 flex flex-col">
                <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] xl:text-[60px] text-Primary font-semibold">
                  {count?.recevier}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[23px] text-lightGreey font-semibold">
                  Грузополучатели
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0">
              <div className="p-6">
                <div className="w-32 h-32">
                  <svg
                    width={128}
                    height={128}
                    viewBox="0 0 111 103"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.5018 28.75H25.4721C17.9998 28.75 14.2668 28.75 11.6092 30.258C9.27697 31.5813 7.48422 33.6717 6.54808 36.1649C5.48197 39.0042 6.09563 42.6464 7.32252 49.9284L7.32509 49.942L12.6913 81.792C13.6016 87.195 14.0598 89.8976 15.4226 91.9248C16.6239 93.7118 18.3102 95.1246 20.2896 96.003C22.5351 96.9995 25.3026 97 30.8398 97H80.1615C85.6987 97 88.4644 96.9995 90.7099 96.003C92.6893 95.1246 94.3769 93.7118 95.5782 91.9248C96.941 89.8976 97.3967 87.195 98.307 81.792L103.673 49.942L103.678 49.9199C104.904 42.6436 105.518 39.0031 104.452 36.1649C103.516 33.6717 101.727 31.5813 99.3953 30.258C96.7376 28.75 92.9985 28.75 85.5263 28.75H78.4981M32.5018 28.75H78.4981M32.5018 28.75C32.5018 16.1855 42.7984 6 55.4999 6C68.2014 6 78.4981 16.1855 78.4981 28.75"
                      stroke="#ABAFB6"
                      strokeOpacity="0.3"
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 w-[100%] bg-[#85858537] h-[48px] flex items-center justify-center">
              <Link to={'/consignees'} className="flex justify-center w-[100%]">
                <p className="mr-8 text-[#ABAFB6]">Подробная информация</p>
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7778 17.3333L18.6111 13.5M18.6111 13.5L14.7778 9.66667M18.6111 13.5H8.38889M25 13.5C25 7.14873 19.8513 2 13.5 2C7.14873 2 2 7.14873 2 13.5C2 19.8513 7.14873 25 13.5 25C19.8513 25 25 19.8513 25 13.5Z"
                    stroke="#ABAFB6"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
