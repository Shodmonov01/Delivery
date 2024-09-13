import "./admin.css";
import { Pagination } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const ClientTable = () => {
  const [userData, setUserData] = useState();
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const clientData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: "Bearer " + (token) },
    };
    const { data } = await axios.get(
      `${BASE_URL}/c_dashboard/client_list_views/?page=${pageId}`,
      config
    );
    setPageSize(data?.data?.count);
    setUserData(data?.data?.results);
  };

  useEffect(() => {
    clientData();
  }, []);

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
    <div className="w-full">
      <div className=" w-full">
        <div className="w-full pb-8 flex flex-col gap-y-8 z-0">
          <div className="flex items-center">
            <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
              Клиенты |
            </p>
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

        <div className="w-[100%] inline-block rounded-lg border overflow-x-auto shadow-2xl">
          <table className="w-[100%] overflow-x-auto table"  ref={tableRef}>
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
                  Город
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Почтовый <br />
                  индекс
                </th>
                <th className="w-[15%] text-[19px] text-lightGreey font-semibold text-center">
                  Страна
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Телефон
                </th>
                {/* <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Примечания
                </th> */}
                {/* <th className="w-[5%] text-center"></th> */}
              </tr>
            </thead>
            <tbody>
              {userData?.map((c, i) => (
                <tr key={i}>
                  <td className="text-center font-inter text-lg font-medium text-lightGreey">
                    {c?.uidd}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.first_name?.length > 0
                      ? c?.first_name + " " + c?.last_name
                      : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.id_city?.length > 0 ? c?.id_city : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.pochta_index > 0 ? c?.pochta_index : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.address?.length > 0 ? c?.address : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.phone?.length > 0 ? c?.phone : "Не включено"}
                  </td>
                  {/* <td className="text-center text-lg font-medium text-lightGreey">
                  {c?.context?.length > 0 ? c?.context : ""}
                </td> */}
                  {/* <td className="text-center align-middle">
                    <div className="flex justify-center items-center">
                      <div className="mr-3">
                        <img
                          src={"/edit.svg"}
                          width={20}
                          height={20}
                          alt={"edit"}
                        />
                      </div>
                      <div>
                        <img
                          src={"/delete.svg"}
                          width={20}
                          height={20}
                          alt={"edit"}
                        />
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
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
                  Город
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Почтовый <br />
                  индекс
                </th>
                <th className="w-[15%] text-[19px] text-lightGreey font-semibold text-center">
                  Страна
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Телефон
                </th>
                
              </tr>
            </thead>
            <tbody>
              {userData?.map((c, i) => (
                <tr key={i}>
                  <td className="text-center font-inter text-lg font-medium text-lightGreey">
                    {c?.uidd}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.first_name?.length > 0
                      ? c?.first_name + " " + c?.last_name
                      : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.id_city?.length > 0 ? c?.id_city : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.pochta_index > 0 ? c?.pochta_index : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.address?.length > 0 ? c?.address : "Не включено"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.phone?.length > 0 ? c?.phone : "Не включено"}
                  </td>
                  
                </tr>
              ))}
            </tbody>
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
            }}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientTable;