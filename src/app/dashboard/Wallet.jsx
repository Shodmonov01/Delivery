import WalletSection from "../../components/admin/WalletSection";
import AdminLayout from "../../components/layouts/AdminLayout";

const Wallet = () => {
  return (
    <AdminLayout>
      <div className="p-6 mb-12 min-h-[60vh]">
        <p className="text-[18px] sm:text-[20px] md:text-[32px] lg:text-[45px] text-lightGreey font-semibold">
          Кошелек
        </p>
        <div className="bg-white h-[249px] my-12 mb-24 shadow-lg w-[90%]">
          <WalletSection />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Wallet;
