import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../service/auth";
import toast from 'react-hot-toast';



export default function DispatchDelModal({
  setRemove,
  id,
  getData,
}) {
  const removeItem = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/c_dashboard/sen_email_delete_views/${id}/`
      );
      toast.success("Отправки успешно удалена");
      getData();
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
        className="bg-white z-30 h-[15vh] w-[50%] p-8 rounded-lg border shadow-xl cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lightGreey flex w-[100%] justify-center mb-4 md:font-semibold md:text-[28px]">
        Удален Отправки 
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
