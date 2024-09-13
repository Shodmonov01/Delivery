import SendMessage from "../../components/admin/SendMessage";
import AdminLayout from "../../components/layouts/AdminLayout";

const Message = () => {
  return (
    <AdminLayout>
        <div className="w-full p-6 flex flex-col gap-y-8 z-0">
      <div className="flex items-center">
        <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
          SMS-Отправка
        </p>
      </div>
        <SendMessage />
    </div>
    </AdminLayout>
  );
};

export default Message;
