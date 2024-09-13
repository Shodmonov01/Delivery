import { ShipersTable } from "../../components/admin";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layouts/AdminLayout";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useRef } from "react";

const Shippers = () => {
  
  return (
    <AdminLayout>
      <div className="w-full p-6 flex flex-col gap-y-8 z-0 min-h-[80vh]">
        
        <div className="mt-8">
          <ShipersTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Shippers;
