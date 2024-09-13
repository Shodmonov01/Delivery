import UserLayout from "../../components/layouts/UserLayout";
import ContactUser from "./ContactUser";

const UserMessage = () => {
  return (
    <UserLayout title="User | Message">
      <div className="ml-[3%] min-h-[60vh] mt-6">
        <div className="bg-white shadow-xl border mb-12 rounded-md w-[95%] md:w-[89%] p-8 space-y-4">
            <p className="text-[24px] sm:text-[28px] md:text-[40px] text-[#2F2E40CC]">Сообщения</p>
          <ContactUser />
          <ContactUser />
          <ContactUser />
          <ContactUser />
          <ContactUser />
        </div>
      </div>
    </UserLayout>
  );
};

export default UserMessage;
