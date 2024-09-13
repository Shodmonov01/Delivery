import React from 'react'

const CardServices = ({index, title, item }) => {
  return (
    <div className='w-full h-auto relative bg-[#B8B8B81A] shadow-lg border rounded-lg'>
        <div className='w-full h-[340px]'>
            <img src={`/card(${index}).png`} alt={title} className={` h-full w-full rounded-lg object-cover`} />
        </div>
        {/* <p className='mt-6 px-6 leading-[24px] text-[18px] line-clamp-1 md:text-[20px] lg:text-[24px] font-medium md:font-semibold font-raleway text-lightGreey'>{title}</p> */}
        {/* <div className='px-6 my-6 flex justify-between'>
            <div className='flex items-start '>
                <img src="/loc1.svg" alt="" className='mr-3' />
                <div className='flex flex-col mt-[-8px]'>
                    <p className='text-[16px] md:text-[18px] lg:text-[22px] font-normal' style={{color:"rgba(47, 46, 64, 0.8)"}}>от:</p>
                    <p className='text-[16px] md:text-[18px] lg:text-[22px] font-normal' style={{color:"rgba(47, 46, 64, 0.8)"}}>{item?.city?.name}</p>
                </div>
            </div>
            <div className='flex items-start '>
                <img src="/loc2.svg" alt="" className='mr-3' />
                <div className='flex flex-col mt-[-8px]'>
                    <p className='text-[16px] md:text-[18px] lg:text-[22px] font-normal' style={{color:"rgba(47, 46, 64, 0.8)"}}>до:</p>
                    <p className='text-[16px] md:text-[18px] lg:text-[22px] font-normal' style={{color:"rgba(47, 46, 64, 0.8)"}}>{item?.city?.name2}</p>
                </div>
            </div>
        </div>
        <hr />
        <div className='px-6 mt-3 flex justify-between'>
            <p className='font-normal text-[15px] md:text-[20px]' style={{color:"rgba(47, 46, 64, 0.8)"}}>Цена:</p>
            <p className='font-normal text-[15px] md:text-[20px]' style={{color:"rgba(47, 46, 64, 0.8)"}}>€640.00</p>
        </div>
        <div className='px-6 mt-3 flex justify-between'>
            <p className='text-[#000] font-medium md:font-semibold text-[17px] md:text-[20px]'>Сохранено:</p>
            <p className='text-[#23A879] font-medium md:font-semibold text-[17px] md:text-[20px]'>€848</p>
        </div> */}
    </div>
  )
}

export default CardServices