import { useEffect, useRef, useState } from "react";
import "./admin.css";
import { Pagination } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import Loader from "../client/Loader";
import DispatchDelModal from "./c/deleteDispatch";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

const DispatchTable = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(Number);
  const [remove, setRemove] = useState(false);
  const getData = async () => {
    setLoader(true);
    const { data } = await axios.get(
      `${BASE_URL}/c_dashboard/send_email_list_views/?page=${pageId}`
    );
    setPageSize(data?.data?.count);
    setData(data?.data?.results);
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRemove = (id) => {
    setId(id);
    setRemove((prev) => !prev);
  };
  const tableRef = useRef(null);
  const handlePrint = () => {
    const printContent = document.getElementById("content");
    const printWindow = window.open("", "", "width=auto,height=auto");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <style>
            table {
                border-collapse: collapse;
            }
           td, th {
                border: 1px solid black;
                text-align: center;
                padding: 10px;
            }
        </style>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div>
      <div className="min-h-[55vh]">
        <div className="w-full pb-6 flex flex-col gap-y-8 z-0">
          <div className="flex items-center md:flex-row flex-col gap-y-4">
            <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
              Отправки |
            </p>
            <Link
              to={"/adddispatch"}
              className="bg-heroPrimary min-w-[300px] hover:bg-Primary transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-1 sm:px-8 rounded-lg"
            >
              Добавить отправку
            </Link>
          </div>
          <div className="w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
            <div className="px-8 py-4 bg-[#EFEFEF]">
              <p className="font-semibold text-lightGreey text-center text-base">
                Копировать
              </p>
            </div>

            <div className="px-8 py-4 bg-[#EFEFEF] cursor-pointer">
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <p className="font-semibold text-lightGreey text-center text-base">
                  В формате EXC
                </p>
              </DownloadTableExcel>
            </div>

            <div
              onClick={handlePrint}
              className="px-8 py-4 bg-[#EFEFEF] cursor-pointer"
            >
              <p className="font-semibold text-lightGreey cursor-pointer text-center text-base">
                Распечатать
              </p>
            </div>
          </div>
        </div>

        <div className="w-[100%] inline-block overflow-x-auto rounded-lg border shadow-2xl">
          <table className="w-[100%] overflow-x-auto table" ref={tableRef}>
            <thead className="w-full">
              <tr className="w-full">
                <th className="text-center w-[15%] text-[19px] text-lightGreey font-semibold">
                  Идентификатор <br />
                  клиента
                </th>
                <th className="w-[10%] text-center text-lightGreey font-semibold">
                  Имя
                </th>
                <th className="w-[15%] text-[19px] text-lightGreey font-semibold text-center">
                  Фамилия
                </th>

                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Телефон
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Электронная почта
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Ставка
                </th>
                <th className="w-[5%] text-center"></th>
              </tr>
            </thead>

            {remove && (
              <DispatchDelModal
                getData={getData}
                id={id}
                setRemove={setRemove}
              />
            )}

            {loader ? (
              <div className="w-[85%] absolute flex justify-center">
                <Loader />
              </div>
            ) : (
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.idd}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.first_name}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.last_name}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.phone}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.recipient_list}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.text.split(" ")[1]}
                    </td>

                    <td className="text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div onClick={() => handleRemove(item?.id)}>
                          <img
                            src={"/delete.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div>
                        {/* <div>
                          <img
                            src={"/edit.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>


          <table className="w-[100%] overflow-x-auto table hidden" id="content">
            <thead className="w-full">
              <tr className="w-full">
                <th className="text-center w-[15%] text-[19px] text-lightGreey font-semibold">
                  Идентификатор <br />
                  клиента
                </th>
                <th className="w-[10%] text-center text-lightGreey font-semibold">
                  Имя
                </th>
                <th className="w-[15%] text-[19px] text-lightGreey font-semibold text-center">
                  Фамилия
                </th>

                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Телефон
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Электронная почта
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Ставка
                </th>
                <th className="w-[5%] text-center"></th>
              </tr>
            </thead>

            {remove && (
              <DispatchDelModal
                getData={getData}
                id={id}
                setRemove={setRemove}
              />
            )}

            {loader ? (
              <div className="w-[85%] absolute flex justify-center">
                <Loader />
              </div>
            ) : (
              <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.idd}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.first_name}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.last_name}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.phone}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.recipient_list}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.text.split(" ")[1]}
                    </td>

                    <td className="text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div onClick={() => handleRemove(item?.id)}>
                          <img
                            src={"/delete.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div>
                        {/* <div>
                          <img
                            src={"/edit.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="mt-8 mb-32 flex justify-end">
          <Pagination
            count={
              pageSize % 10 !== 0
                ? Math.floor(pageSize / 10) + 1
                : Math.floor(pageSize / 10)
            }
            onChange={(e, value) => {
              setPageId(value);
              localStorage.setItem("event", JSON.stringify(e));
            }}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default DispatchTable;
