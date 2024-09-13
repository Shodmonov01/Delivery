import DispatchTable from "../../components/admin/DispatchTable";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";

const Dispatch = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6 flex flex-col gap-y-8 z-0">
        <div className="mt-8">
          <DispatchTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dispatch;
