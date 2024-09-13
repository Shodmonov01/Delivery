import ContactUser from "./ContactUser";

const ChatList = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-2xl">
      <div className="w-full mt-12 flex flex-col">
        
        <div className="w-full flex flex-row  border-b-2 border-[#D9D9D9] justify-between items-center ">
          <p className="ml-4 font-normal md:font-medium py-2 lg:font-semibold text-lightGreey text-[24px] md:text-[32px] lg:text-[40px]">
            Чаты
          </p>
          <button className="mr-4 bg-heroPrimary hover:bg-Primary transition duration-200 ease-in-out  md:w-[30%] font-semibold text-white text-[18px] flex items-center justify-around sm:py-3 px-1 sm:px-8 rounded-lg">
            Новый чат +
          </button>
        </div>

       <div className="flex flex-col py-3 px-4 gap-y-3 overflow-y-auto h-[550px]">
        <ContactUser />
        <ContactUser />
        <ContactUser />
        <ContactUser />
        <ContactUser />
        <ContactUser />
        <ContactUser />
        <ContactUser />
       </div>
      </div>
    </div>
  );
};

export default ChatList;
