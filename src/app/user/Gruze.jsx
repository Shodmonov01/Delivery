import { useEffect, useState } from "react";
import UserLayout from "../../components/layouts/UserLayout";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/client/Loader";
import MapComponent from "../../components/client/GoogleMap";

const Gruze = () => {
  const [prog, setProg] = useState([]);
  const [sortData, setSortData] = useState();
  const [allWeight, setAllWeight] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sum , setSum] = useState(0)
  const { id } = useParams();
  const ProgressData = async () => {
    try {
      setLoader(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: "Bearer " + JSON.parse(token) },
      };
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/delivery_list_views/`,
        config
      );
      // console.log(data);
      setProg(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSortedData = () => {
    setLoader(true);
    const res = prog?.filter((c) => c.id == id && c);
    setSortData(res);
    setLoader(false);
  };

  useEffect(() => {
    getSortedData();
    ProgressData();
  }, [id]);

  useEffect(() => {
    let weight = 0
    let count = 0
    sortData?.product?.map((item, index) => {
      weight += parseInt(item?.weight)
      count += parseInt(item?.count)
    });
    setAllWeight(weight)
    setAllCount(count)
  }, [id]);

  

  useEffect(() => {
    let sum2 = 0
    prog?.map(dos => {
      // console.log(dos.product[0]['weight'])
      dos?.product?.map(c => {
        console.log(typeof dos['id'])
        if(dos['id'] == parseInt(id)) {
          console.log(Number(c['weight']))
          sum2 +=  Number(c['weight'] * c['count'])
        }
      })
    })
    setSum(sum2)
  }, [id])
  console.log(prog)

  // console.log(allWeight)

  return (
    <UserLayout>
      <div className="min-h-[60vh]">
        {loader ? (
          <Loader />
        ) : (
          prog?.map(
            (c, i) =>
              c?.id == id && (
                <div className="ml-[3%] min-h-[60vh] mt-6">
                  <Link
                    to={"/user-home"}
                    className="flex items-center gap-x-8 mb-2"
                  >
                    <img src="/leftish.svg" alt="leftish" />
                    <p className="font-medium flex md:font-semibold text-lightGreey text-[20px] md:text-[24px] lg:text-[28px]">
                      {c?.product?.map((item, index) => (
                        <p className="">
                          {index > 0 ? ", " : ""}
                          {item?.name}{" "}
                        </p>
                      ))}
                    </p>
                  </Link>
                  <p className="w-[100%] md:w-[90%] mx-auto font-medium md:font-semibold text-[12px] md:text-[18px] text-lightGreey">
                    Доставка документов{" "}
                    <span className="font-normal md:font-semibold text-[#ABAFB6] text-[12px] md:text-[18px] ml-1 md:ml-4">
                      Дата заказа доставки: {c?.create_date}
                    </span>
                  </p>

                  <div className="flex md:flex-row flex-col bg-white w-[96%] md:w-[90%] justify-between p-4 md:p-6 mt-6 shadow-xl border rounded-md mb-12">
                    <div className="w-full md:w-[50%]">
                      <p className="font-medium md:font-semibold flex line-clamp-1 text-lightGreey text-[16px]  mb-3 md:text-[20px] lg:text-[24px]">
                        {c?.product?.map((item, index) => (
                          <p>
                            {index > 0 ? ", " : ""}
                            {item?.name}
                          </p>
                        ))}
                      </p>
                      <p className="font-medium md:font-semibold text-[15px] md:text-[18px] text-lightGreey">
                        Доставка документов{" "}
                        <span className="font-normal md:font-semibold text-[#ABAFB6] text-[14px] md:text-[18px] ml-4">
                          Дата заказа доставки: {c?.create_date}
                        </span>
                      </p>
                      <p className="my-4 text-[14px] md:text-[20px] font-semibold text-lightGreey">
                        выполненно{" "}
                        {c?.delivery_date?.length > 0
                          ? c?.delivery_date?.split("-")[2] -
                            c?.create_date?.split("-")[2] +
                            " дней назад"
                          : "неизвестный"}{" "}
                        <span className="text-[14px] md:text-[18px] text-[#ABAFB6] ml-3">
                          {c?.delivery_date}
                        </span>
                      </p>
                      <p className="font-normal text-[14px] md:text-[19px] text-[#2F2E40CC] mb-3">
                        Маршруты и даты
                      </p>

                      <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-x-2 items-center">
                            <img src="/loc2.svg" alt="Location 1" />
                            <p className="font-medium md:font-semibold text-[#000]  text-[13px] md:text-[14px] lg:text-[16px]">
                              {c?.city?.name2}
                            </p>
                          </div>
                          <p className="font-medium flex line-clamp-1 md:font-semibold text-[#000]  text-[13px] md:text-[14px] lg:text-[16px]">
                            {c?.product?.map((item, index) => (
                              <p>
                                {index > 0 ? ", " : ""}
                                {item?.name}
                              </p>
                            ))}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-x-2 items-center">
                            <img src="/loc1.svg" alt="Location 1" />
                            <p className="font-medium md:font-semibold text-[#000]  text-[13px] md:text-[14px] lg:text-[16px]">
                              {c?.city?.name}
                            </p>
                          </div>
                          <p className="font-medium line-clamp-1 flex md:font-semibold text-[#000]  text-[13px] md:text-[14px] lg:text-[16px]">
                            {c?.product?.map((item, index) => (
                              <p>
                                {index > 0 ? ", " : ""}
                                {item?.name}
                              </p>
                            ))}
                          </p>
                        </div>

                        <div className="flex justify-between bg-[#F6F6F6] p-3">
                          <p className="font-medium md:font-semibold text-[#000]  text-[14px] md:text-[16px] lg:text-[18px]">
                            Расстояние:
                          </p>
                          <p className="font-medium md:font-semibold text-[#000]  text-[14px] md:text-[16px] lg:text-[18px]">
                            367 км
                          </p>
                        </div>
                      </div>

                      <div className=" w-full">
                        <div className="p-2">
                          <table className="w-[100%] mt-4">
                            <thead>
                              <th className="text-[#ABAFB6] w-[70%] text-start text-[12px] sm:text-[18px] font-normal">
                                ДxШxВ
                              </th>
                              <th className="text-[#ABAFB6] w-[15%] text-start text-[12px] sm:text-[18px] font-normal">
                                Вес
                              </th>
                              <th className="text-[#ABAFB6] w-[15%] text-start text-[12px] sm:text-[18px] font-normal">
                                Шт
                              </th>
                            </thead>
                            <tbody>
                              {c?.product?.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <p className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                                      {item?.name?.slice(0, 11)}
                                    </p>
                                    <p className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                                      {item?.length} x {item?.width} x{" "}
                                      {item?.height} см
                                    </p>
                                  </td>
                                  <td className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                                    {item?.weight} кг
                                  </td>
                                  <td className="font-semibold text-[12px] sm:text-[16px] md:text-[18px] text-lightGreey">
                                    {item?.count}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex p-2">
                          <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-[#000]  font-normal">
                            Являются ли размеры точными?
                          </p>
                          <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-[#000]  font-normal">
                            Да
                          </p>
                        </div>

                        <div className="mt-8 flex bg-[#F6F6F6] justify-between p-3">
                          <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-[#000]  font-normal md:font-medium">
                            ОБЩИЙ ВЕС
                          </p>
                          <p className="mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-[#000]  font-normal md:font-medium">
                            {sum} кг
                          </p>
                        </div>
                        <p className="mt-4 mr-5 text-[12px] sm:text-[16px] md:text-[18px] text-[#000] font-normal md:font-medium">
                          Клиент:
                        </p>
                        <p>Частное лицо</p>
                        
                      </div>
                    </div>
                    <div className="w-full mt-6 md:mt-0 md:w-[50%]">
                      <div className="w-[98%] md:w-[90%] mx-auto -z-30">
                        <MapComponent
                          city1Coords={c.location.name}
                          city2Coords={c.location.name2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        )}
      </div>
    </UserLayout>
  );
};

export default Gruze;
