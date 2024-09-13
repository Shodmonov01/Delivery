
const UploadMessage = () => {
  return (
    <div className="h-[70px] w-full flex relative">
      <input
        type="text"
        placeholder="Введите ваше сообщение..."
        className="text-lightGreey outline-none px-6 rounded-lg w-full pr-[20%] shadow-lg text-[20px] font-normal h-[70px]"
      />

      <div className="flex gap-x-4 absolute items-center right-3 top-4">
        <div className="w-[36px] h-[32px] mr-[3%]">
          <img
            src="/upload7.svg"
            alt={"user"}
            height={100}
            width={100}
            className="w-full h-[100%]"
          />
        </div>
        <div className="w-[47px] h-[41px] mr-[3%]">
          <img
            src="/send7.svg"
            alt={"user"}
            height={100}
            width={100}
            className="w-full h-[100%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadMessage;
