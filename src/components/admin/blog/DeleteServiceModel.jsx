import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../service/auth";
import toast from "react-hot-toast";

export default function AdminDelServiceModal({ setRemove, id, getData }) {
  const removeItem = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/a_api/admin_panel/blog_deteiles_admin_views/${id}/`
      );
      getData();
      toast.success("Блог успешно удалена");
      setRemove(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-[100%] fixed h-[100vh] top-0 left-0 flex justify-center items-center bg-modalBg cursor-pointer"
      onClick={() => setRemove(false)}
    >
      <div
        className="bg-white z-[9999] h-[20vh] overflow-y-auto w-[95%] sm:w-[50%] p-8 rounded-lg border shadow-xl cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lightGreey flex w-[100%] justify-center mb-4 md:font-semibold md:text-[28px]">
          Удалить Услуги
        </p>
        <div className="flex justify-between w-full">
          <Button
            sx={{ background: "red", color: "white" }}
            variant="contained"
            onClick={() => setRemove(false)}
          >
            Закрывать
          </Button>
          <Button
            sx={{ background: "green", color: "white" }}
            variant="contained"
            onClick={removeItem}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}
