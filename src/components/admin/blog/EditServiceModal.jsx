import EditServiseTabs from "./EditService";


export default function AdminEditServiceModal({ setEdit, id, getData }) {
  return (
    <div
      className="w-[100%] fixed h-[100vh] top-0 left-0 flex justify-center items-center bg-modalBg cursor-pointer"
      onClick={() => setEdit(false)}
    >
      <div className="bg-white z-[9999] h-[65vh] overflow-y-auto w-[95%] sm:w-[50%] p-8 rounded-lg border shadow-xl cursor-auto"
      onClick={(e) => e.stopPropagation()}
      >
        <EditServiseTabs setOpen={setEdit} id={id} getData1={getData}/>
      </div>
    </div>
  );
}
