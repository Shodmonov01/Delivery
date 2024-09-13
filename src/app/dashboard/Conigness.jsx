import { ConignessTable } from "../../components/admin";
import AdminLayout from "../../components/layouts/AdminLayout";

const Conignees = () => {
  return (
    <AdminLayout>
      <div className="w-full p-6 flex flex-col gap-y-8 z-0 min-h-[60vh]">
        <div className="mt-8">
          <ConignessTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Conignees;
