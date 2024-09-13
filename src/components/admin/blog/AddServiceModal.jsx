import AddServiseTabs from "./AddTabs";


export default function AdminAddServiceModal({ setOpen, getData }) {
  return (
    <div
      className="w-[100%] fixed h-[100vh] top-0 left-0 flex justify-center items-center bg-modalBg cursor-pointer"
      onClick={() => setOpen(false)}
    >
      <div className="bg-white z-[9999999] h-[65vh] overflow-y-auto w-[95%] sm:w-[50%] p-8 rounded-lg border shadow-xl cursor-auto"
      onClick={(e) => e.stopPropagation()}
      >
        <AddServiseTabs setOpen={setOpen} getData={getData}/>
      </div>
    </div>
  );
}
