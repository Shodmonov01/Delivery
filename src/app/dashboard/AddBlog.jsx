import { Pagination } from "@mui/material";
import AdminLayout from "../../components/layouts/AdminLayout";
import "./table.css";
import  { useEffect, useState } from "react";
import AdminAddServiceModal from "../../components/admin/blog/AddServiceModal";
import AdminDelServiceModal from "../../components/admin/blog/DeleteServiceModel";
import AdminEditServiceModal from "../../components/admin/blog/EditServiceModal";
import axios from "axios";
import { BASE_URL } from "../../service/auth";
import Loader from "../../components/client/Loader";



const AddServices = () => {
  const [open, setOpen] = useState(false);
  const [remove, setRemove] = useState(false);
  const [removeId, setRemoveId] = useState(Number);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const [loader, setLoader] = useState(true);

  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(Number);

  const handleRemove = (id) => {
    setRemove(true);
    setRemoveId(id);
  };

  const handleEdit = (id) => {
    setEdit(true);
    setEditId(id);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/blog_all_admin_views/?page=${pageId}`
      );
      setPageSize(data?.data?.count);
      setData(data?.data?.results);
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [pageId]);
  return  (
    <AdminLayout>
      <div className="p-4 min-h-[60vh]">
        <div className="flex items-center mb-6 justify-between">
          <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
          Блоги
          </p>

          <div
            className="cursor-pointer mr-[2%]"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img src="/plus2.svg" alt="" />
          </div>
        </div>

        {open && <AdminAddServiceModal setOpen={setOpen} getData={getData} />}

        {remove && <AdminDelServiceModal setRemove={setRemove} id={removeId} getData={getData}/>}

        {edit && <AdminEditServiceModal setEdit={setEdit} id={editId}  getData={getData} />}

        <div>
          <div className="w-[100%] inline-block overflow-x-auto rounded-lg border shadow-2xl">
            <table className="w-[100%] overflow-x-auto table">
              <thead className="w-full">
                <tr className="w-full">
                  <th className="text-center w-[15%] text-[19px] text-lightGreey font-semibold">
                    Изображение
                  </th>
                  <th className="w-[25%] text-center text-lightGreey font-semibold">
                    Имя
                  </th>
                  <th className="w-[50%] text-[19px] text-lightGreey font-semibold text-center">
                    Содержание
                  </th>

                  <th className="w-[10%] text-center">Действия</th>
                </tr>
              </thead>
              {
                loader? <div className="w-[85%] absolute flex justify-center">
                  <Loader />
                </div> : (
                   <tbody>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      <div className="w-full flex justify-center items-center">
                        <img src={`${item?.img}`} alt="" width={200} className="object-cover" height={300} />
                      </div>
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                      {item?.translations?.nl?.title}
                    </td>
                    <td className="text-center text-lg font-medium text-lightGreey">
                    <p className="line-clamp-6">{item?.translations?.nl?.content}</p>
                    </td>

                    <td className="text-center align-middle">
                      <div className="flex justify-center items-center">
                        <div
                          className="mr-3 cursor-pointer "
                          onClick={() => handleEdit(item?.id)}
                        >
                          <img
                            src={"/edit.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div>
                        <div
                          className="cursor-pointer ml-3"
                          onClick={() => handleRemove(item?.id)}
                        >
                          <img
                            src={"/delete.svg"}
                            width={20}
                            height={20}
                            alt={"edit"}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
                )
              }
             
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
                setPageId(value)
                localStorage.setItem("event", JSON.stringify(e))
              }}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddServices;
