
const Anonymous = () => {
  return (
    <div className="flex flex-col w-[70%] relative">
      <div className="flex items-start justify-start relative">
        <div className="w-[50px] h-[50px] relative">
          <img
            src="/user.svg"
            alt={"user"}
            height={100}
            width={100}
            className="w-[100%] h-[100%] object-cover"
          />
          <div className="w-[14px] h-[14px] bg-[#23A879] rounded-full absolute z-10 bottom-0 right-0"></div>
        </div>
        <p className='font-medium text-[16px] text-[#344054] ml-[5%]'>Алексей</p>
        <p className='font-medium text-[16px] text-[#344054] ml-[5%] absolute right-0' >Пятница, 20:15</p>
      </div>

      <div className="bg-white rounded-[10px] shadow-lg w-[402px] ml-[14%] p-3">
        <p className="text-lightGreey text-[18px] font-normal">Здраствуйте Александр мы тех-поддержка UK2EU, если у вас появятся вопросы будем рады помочь!</p>
      </div>
    </div>
  );
};

export default Anonymous;
