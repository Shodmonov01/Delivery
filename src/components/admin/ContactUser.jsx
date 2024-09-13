
const ContactUser = () => {
  return (
    <div className='flex items-center flex-row shadow-lg px-3 py-4 border rounded-[21px] relative'>
       <div className='w-[48px] h-[48px] mr-[3%]'>
           <img src="/user.svg" alt={"user"} height={100} width={100} className="w-full h-[100%] object-cover" />
       </div>
       <div className='flex flex-col w-[40%]'>
            <p className='font-semibold text-[16px] text-Primary'>Алексей</p>
            <p className='font-medium text-[14px] text-heroLight line-clamp-1'>Здравствуйте Александр...</p>
       </div>
       <div className='absolute top-4 right-4'>
        <p className='font-medium text-[14px] text-heroLight line-clamp-1'>5 Августа, 2023</p>
       </div>
    </div>
  )
}

export default ContactUser