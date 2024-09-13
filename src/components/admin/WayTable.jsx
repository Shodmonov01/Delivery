import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import "./admin.css";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import { useEffect, useState } from "react";
import Loader from "../client/Loader";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const WayTable = () => {
  let a = "";
  const [deliveryList, setDeliveryList] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(Number);
  const [statuss, setStatus] = useState([]);
  const [statusId, setStatusId] = useState(Number);
  const [comment, setComment] = useState("");

  const getStatusData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/c_dashboard/status_views/`);
      console.log(data);
      setStatus(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeliveryListData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/b_api/sayts/delivery_all/?page=${pageId}`
      );
      setDeliveryList(data?.data?.results);
      setPageSize(data?.data?.count);
      console.log(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    getDeliveryListData();
    getStatusData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  function renderElement(option, item) {
    switch (option) {
      case "ru":
        return <div>{item?.translations?.nl?.name}</div>;
      case "gl":
        return <div>{item?.translations?.nl?.name}</div>;
      case "en":
        return <div>{item?.translations?.en?.name}</div>;
      case "fr":
        return <div>{item?.translations?.fi?.name}</div>;
      default:
        return <div>Option not recognized</div>;
    }
  }

  const handleEdit = (id) => {
    setIsEdit(true);
    setEditId(id);
  };

  const statusHandler = async () => {
    try {
      await axios.put(
        `${BASE_URL}/b_api/sayts/delivery_update_views/${editId}/`,
        { id_status: statusId, comment }
      );
      getDeliveryListData();
      setIsEdit(false);
      setStatusId(0);
      setEditId(0);
      toast.success("Status was changed");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editId);

  return (
    <div className="min-h-[40vh]">
      {isEdit && (
        <div className="fixed top-0 left-0 flex items-center justify-center bg-modalBg z-50 w-full h-screen">
          <div className="w-[96%] sm:w-[94%] md:w-[30%] mx-auto bg-white min-h-[22vh] rounded-md p-4">
            <form className="w-full flex flex-col gap-y-4">
              {/* clear button */}
              <div className="flex w-[100%] justify-end">
                <div
                  onClick={() => setIsEdit(false)}
                  className="w-[12px] h-[12px] sm:w-[18.84px] sm:h-[18.84px] cursor-pointer"
                >
                  <img
                    src={"/clear.svg"}
                    alt="clear"
                    width={100}
                    height={100}
                    className="w-[100%] h-[100%]"
                  />
                </div>
              </div>

              <InputLabel id="demo-multiple-chip-label">Status</InputLabel>
              <FormControl className="m-1 w-full space-y-4">
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  defaultValue={"Выберите"}
                  onChange={(e) => setStatusId(e.target.value)}
                >
                  <MenuItem value={"Выберите"} disabled>
                    {t(`cal.step3.p6`)}
                  </MenuItem>
                  {statuss?.map((item) => (
                    <MenuItem value={item?.id}>
                      {renderElement(i18n.language, item)}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Комментарий"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                onClick={statusHandler}
                type="button"
                variant="contained"
                className="capitalize my-2"
              >
                изменение
              </Button>
            </form>
          </div>
        </div>
      )}
      <div>
        <div className="w-[100%] inline-block rounded-lg border shadow-2xl">
          <table className="w-[100%] overflow-x-auto table">
            <thead className="w-full">
              <tr className="w-full">
                <th className="text-center w-[10%] text-[19px] text-lightGreey font-semibold">
                  Идентификатор <br />
                  загрузки
                </th>
                <th className="w-[10%] text-center text-lightGreey font-semibold">
                  Имя клиента
                </th>
                <th className="w-[10%] text-[19px] text-lightGreey font-semibold text-center">
                  Клиентская <br />
                  нагрузка
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Тип нагрузки
                </th>
                <th className="w-[15%] text-[19px] text-lightGreey font-semibold text-center">
                  Дата получения
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Дата поставки
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Статус
                </th>
                <th className="text-center w-[10%] text-lightGreey font-semibold">
                  Скорость <br />
                  перемещения <br />
                  линии
                </th>
                <th className="w-[5%] text-center"></th>
              </tr>
            </thead>
            <tbody>
              {deliveryList?.map((c) => (
                <tr key={c?.uuid}>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.id}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.user_id?.first_name}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    1110
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    TL
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.acceptance_date ? c?.acceptance_date : "-"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {c?.delivery_date ? c?.delivery_date : "-"}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {renderElement(i18n?.language, c?.id_status)}
                  </td>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    1000
                  </td>
                  <td className="text-center align-middle">
                    <div className="flex justify-center items-center">
                      <div role="button" onClick={() => handleEdit(c?.id)}>
                        <img
                          src={"/edit.svg"}
                          width={20}
                          height={20}
                          alt={"edit"}
                        />
                      </div>
                      {/* <div>
                      <img
                        src={"/delete.svg"}
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
          </table>
        </div>
        <div className="mt-8 flex justify-end">
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

export default WayTable;
