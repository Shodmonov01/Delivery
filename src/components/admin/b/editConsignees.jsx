
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import EditConsigneesComp from "./editConsigneesComp";

const EditConsignees = () => {
  const {id} = useParams()

  return (
   <AdminLayout>
     <div className="w-full p-6 flex flex-col gap-y-8 z-0">
      
      <div className="flex items-center">
        <p className="text-[18px] mr-6 sm:text-[20px] md:text-[32px] flex items-center lg:text-[45px] text-lightGreey font-semibold">
        Добавление грузоотправителей |
        </p>
        <Link to="/consignees" 
        className="bg-heroPrimary min-w-[300px] hover:bg-Primary transition duration-200 ease-in-out font-semibold text-white text-[18px] sm:text-[18px]  flex items-center justify-around py-2 sm:py-4 px-1 sm:px-8 rounded-lg">
            Просмотреть грузоотправителей
        </Link>
      </div>
      <div className="w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
        <div className="px-8 py-4 bg-[#EFEFEF]">
          <p className="font-semibold text-lightGreey text-center text-base">
            Копировать
          </p>
        </div>

        <div className="px-8 py-4 bg-[#EFEFEF]">
          <p className="font-semibold text-lightGreey text-center text-base">
            В формате EXC
          </p>
        </div>

        <div className="px-8 py-4 bg-[#EFEFEF]">
          <p className="font-semibold text-lightGreey text-center text-base">
            Распечатать
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <EditConsigneesComp id={id} />
      </div>
    </div>
   </AdminLayout>
  );
};

export default EditConsignees;
