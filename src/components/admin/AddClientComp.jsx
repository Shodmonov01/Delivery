
const AddClientComp = () => {
  return (
    <div className='bg-white'>
        <div className="my-4 mt-12 grid grid-cols-1 p-8 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px] font-montserrat">
              Идентификатор Клиенты
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Идентификатор грузополучателя"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              Имя
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Имя"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Адрес 
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Адрес "
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              Город
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Город"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              Почтовый индекс
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Почтовый индекс"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
              Страна
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Страна"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Телефон
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Телефон"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Электронная почта
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Телефон"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-[#344054] font-medium text-[15px] sm:text-[21px]  font-montserrat">
            Примечания
            </p>
            <input
              type="text"
              className="border w-[100%] py-2 rounded-md text-[#667085] text-[14px] px-3 focus:outline-[#1348F9] font-medium"
              placeholder="Введите Телефон"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-4">
            <button 
            className="bg-heroPrimary min-w-[300px] justify-center hover:bg-Primary transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center py-2 sm:py-3 px-1 sm:px-8 rounded-lg">
            Добавить Клиенты
            </button>
        </div>

        <div className='flex justify-end w-full my-9'>
            <p className='font-medium text-[19px] text-Primary m-9'>Сбросить данные</p>
        </div>
    </div>
  )
}

export default AddClientComp