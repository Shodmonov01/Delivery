import { AddClientButton, ClientTable } from "../../components/admin";
import AdminLayout from "../../components/layouts/AdminLayout";
import "./table.css";
const Client = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6 flex flex-col gap-y-8 z-0 min-h-[60vh]" >
        {/* <AddClientButton />
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
        </div> */}

        <div className="mt-8">
          <ClientTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Client;
