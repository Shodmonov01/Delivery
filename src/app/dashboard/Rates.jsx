import { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Box, Button, Pagination, TextField } from "@mui/material";
import Loader from "../../components/client/Loader";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import toast from "react-hot-toast";

const Rates = () => {
  const [edit, setEdit] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [newPrice, setNewPrice] = useState([]);
  const [editItem, setEditItem] = useState();
  const [data, setData] = useState({
    autoWeight: null,
    price: null,
    stavka: null,
    auto1: null,
    auto2: null,
    auto3: null,
    auto4: null,
  });

  const handleEdit = () => {
    setEdit(true);
  };

  const handleEdit2 = (item) => {
    setEditItem(item);
    setEdit2(true);
  };

  const getData = async () => {
    try {
      const res1 = await axios.get(`${BASE_URL}/a_api/admin_panel/automobile/`);
      const res2 = await axios.get(
        `${BASE_URL}/a_api/admin_panel/serive_price/`
      );
      const res3 = await axios.get(`${BASE_URL}/a_api/admin_panel/stavka/`);
      const res4 = await axios.get(`${BASE_URL}/a_api/admin_panel/kilomter/`);
      console.log(res4);
      setData({
        ...data,
        autoWeight: res1.data[0]?.price,
        price: res2.data[0]?.price,
        stavka: res3.data[0]?.price,
        auto1: res4.data[0]?.price,
        auto2: res4.data[1]?.price,
        auto3: res4.data[2]?.price,
        auto4: res4.data[3]?.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editItem);

  const getNewPrice = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/kilomter/`
      );
      console.log(data);
      setNewPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewPrice();
    getData();
  }, []);
  console.log(editItem);
  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: "Bearer " + token } };

      await axios.put(
        `${BASE_URL}/a_api/admin_panel/service_price_deteile/1/`,
        {
          price: parseInt(data.price),
        },
        config
      );
      await axios.put(`${BASE_URL}/a_api/admin_panel/kilomter_deteile/1/`, {
        price: parseInt(data.price),
      });
      setEdit(false);
      getData();
      toast("Тариф изменен");
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler2 = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: "Bearer " + token } };
      const res = await axios.put(
        `${BASE_URL}/a_api/admin_panel/kilomter_deteile/${editItem?.id}/`,
        editItem,
        config
      );
      getData();
      toast("Тариф изменен");
      setEdit2(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {edit && (
        <div className="absolute top-0 left-0 bg-modalBg h-screen w-full flex items-center justify-center">
          <div className="w-[70%] md:w-[40%] min-h-[36%] overflow-y-auto bg-white rounded-2xl p-6 flex flex-col gap-y-4">
            <p className="capitalize text-center text-[24px] font-semibold font-raleway">
              изменить тариф
            </p>
            <TextField
              id="outlined-basic"
              label="цена"
              variant="outlined"
              sx={{ width: "100%" }}
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => setEdit(false)}
                sx={{ background: "red" }}
                type="button"
                variant="contained"
              >
                Закрывать
              </Button>
              <Button
                sx={{ background: "green" }}
                type="button"
                onClick={submitHandler}
                variant="contained"
              >
                изменить
              </Button>
            </Box>
          </div>
        </div>
      )}
      {edit2 && (
        <div className="absolute top-0 left-0 bg-modalBg h-screen w-full flex items-center justify-center">
          <div className="w-[70%] md:w-[40%] max-h-[46%] overflow-y-auto bg-white rounded-2xl p-6 flex flex-col gap-y-4">
            <p className="capitalize text-center text-[24px] font-semibold font-raleway">
              изменить тариф
            </p>

            <TextField
              id="outlined-basic"
              label="цена (км)"
              variant="outlined"
              type="number"
              sx={{ width: "100%" }}
              value={editItem?.price || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, price: parseFloat(e.target.value) })
              }
              required
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                onClick={() => setEdit2(false)}
                sx={{ background: "red" }}
                type="button"
                variant="contained"
              >
                Закрывать
              </Button>
              <Button
                sx={{ background: "green" }}
                type="button"
                onClick={submitHandler2}
                variant="contained"
              >
                изменить
              </Button>
            </Box>
          </div>
        </div>
      )}
      <div className="p-6 mb-20 min-h-[60vh] flex flex-col">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
            Тарифы
          </p>
        </div>

        <div>
          <div className="w-[100%] overflow-x-auto flex flex-col gap-y-4 bg-transparent">
            <table className="w-[100%] overflow-x-auto table">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="w-[25%] text-center text-lightGreey font-semibold">
                    Цена
                  </th>

                  <th className="w-[10%] text-center">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center text-lg font-medium text-lightGreey">
                    {data?.price}
                  </td>

                  <td className="text-center align-middle">
                    <div className="flex justify-center items-center">
                      <div className="mr-3">
                        <img
                          onClick={() => handleEdit()}
                          src={"/edit.svg"}
                          width={20}
                          height={20}
                          alt={"edit"}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-[100%] overflow-x-auto table">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="w-[25%] text-center text-lightGreey font-semibold capitalize">
                    Цена 1
                  </th>
                  <th className="w-[25%] text-center text-lightGreey font-semibold">
                    Цена 2
                  </th>

                  <th className="w-[25%] text-center text-lightGreey font-semibold capitalize">
                    Цена 3
                  </th>
                  <th className="w-[25%] text-center text-lightGreey font-semibold capitalize">
                    Цена 4
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {newPrice?.map((item, index) => (
                    <td
                      className="text-center text-lg font-medium text-lightGreey"
                      key={index}
                    >
                      <div className="flex gap-x-7 justify-center items-center">
                        {item?.price}
                        <div className="mr-3">
                          <img
                            onClick={() => handleEdit2(item)}
                            src={"/edit.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="mt-8 mb-32 flex justify-end">
            <Pagination
              count={
                pageSize % 10 !== 0
                  ? Math.floor(pageSize / 10) + 1
                  : Math.floor(pageSize / 10)
              }
              onChange={(e, value) => {
                setPageId(value)
                localStorage.setItem("event", JSON.stringify(e))
              }}
              variant="outlined"
              shape="rounded"
            />
          </div> */}
        </div>
      </div>
      <div className="my-4"></div>
    </AdminLayout>
  );
};

export default Rates;
