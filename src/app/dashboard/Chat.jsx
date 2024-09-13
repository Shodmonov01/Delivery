import { ChatList, ChatMessage } from "../../components/admin";
import AdminLayout from "../../components/layouts/AdminLayout";

const Chat = () => {
  return (
    <AdminLayout>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 w-full h-[755px] ">
        <ChatList />
        <ChatMessage />
      </div>
    </AdminLayout>
  );
};

export default Chat;
