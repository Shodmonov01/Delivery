import WayTable from "../../components/admin/WayTable";
import AdminLayout from "../../components/layouts/AdminLayout";

const Way = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6 flex flex-col gap-y-8 z-0">
        <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] text-lightGreey font-semibold">
          В пути
        </p>

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

        <div className="mt-8">
          <WayTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Way;
