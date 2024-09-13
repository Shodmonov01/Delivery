import Anonymous from './Anonymous'
import UploadMessage from './UploadMessage'

const ChatMessage = () => {
  return (
    <div className="w-full rounded-xl">
      <div className="w-full mt-12 flex flex-col">
        
        <div className="w-full flex flex-row  border-b-2 border-[#D9D9D9]  items-center ">
          <p className="ml-4 font-normal md:font-medium py-2 lg:font-semibold text-lightGreey text-[24px] md:text-[32px] lg:text-[40px]">
          Алексей
          </p>
          <button className="w-[14px] h-[14px] rounded-full bg-[#23A879] ml-6">
          
          </button>
        </div>

       <div className="flex flex-col py-4 px-4 gap-y-3 h-[480px] overflow-y-scroll">
            <Anonymous />
            <Anonymous />
            <Anonymous />
            <Anonymous />
            <Anonymous />
            <Anonymous />
       </div>
       <div className="flex flex-col py-4 px-4 gap-y-3 h-[70px]">
            <UploadMessage />
           
       </div>
      </div>
    </div>
  )
}

export default ChatMessage