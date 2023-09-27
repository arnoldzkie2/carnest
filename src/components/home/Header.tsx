'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const Header = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (

    <header className='z-20 bg-white px-5 sm:px-10 md:px-16 border-b lg:px-24 xl:px-36 2xl:px-44 h-16 md:h-20 fixed w-screen flex items-center top-0 left-0 justify-between'>
      <Link href={'/'} className={`text-red-700 flex items-center text-2xl md:text-3xl font-black`}>
        CARNEST
      </Link>
      <div className='absolute right-6 z-10 cursor-pointer lg:hidden sm:right-10 md:right-16' onClick={() => setIsOpen(prevState => !prevState)}>
        {isOpen ?
          <div className='relative w-[20px] h-[16px]'>
            <span className={`bg-red-700 w-full h-0.5 top-1.5 absolute rotate-45 rounded-md`}></span>
            <span className={`bg-red-700 w-full h-0.5 top-1.5 absolute -rotate-45 rounded-md`}></span>
          </div>
          :
          <div className='relative w-[20px] h-[16px]'>
            <span className={`bg-red-700 top-0 w-full h-0.5 absolute rounded-md`}></span>
            <span className={`bg-red-700 top-[6.5px] w-full h-0.5 absolute rounded-md`}></span>
            <span className={`bg-red-700 bottom-0 w-full h-0.5 absolute rounded-md`}></span>
          </div>
        }
      </div>

      <ul className={`w-full lg:flex lg:items-center xl:gap-10 lg:gap-5 ${isOpen ? 'gap-3 shadow-2xl flex flex-col fixed top-0 left-0 w-screen bg-white px-5 sm:px-10 md:px-16 md:pt-[8.7px] pb-5 pt-[8.2px] text-gray-700' : 'hidden'}`}>
        <Link href={'/'} className='flex mt-4 lg:hidden items-center text-2xl font-black text-red-700'>
          CARNEST
        </Link>
        <Link href='/login/operator' className={`lg:ml-auto rounded-2xl cursor-pointer hover:text-red-700`}>Login as Operator</Link>
        <Link href='/signup/operator' className={`rounded-2xl cursor-pointer hover:text-red-700`}>Apply as Operator</Link>
        <Link href='/login/user' className={`rounded-2xl cursor-pointer hover:text-red-700`}>Book Now</Link>
        <div className={`${isOpen ? 'mt-5' : ''} flex items-center gap-8  lg:ml-auto`}>
          <Link href='/login/user' className={`hover:bg-red-500 border px-7 py-1.5 cursor-pointer flex items-center justify-center rounded-3xl bg-red-700 text-white`}>Login</Link>
          <Link href='/signup/user' className={`hover:bg-red-500 hover:text-white border px-7 py-1.5 cursor-pointer flex items-center justify-center rounded-3xl bg-white text-red-700`}>SignUp</Link>
        </div>
      </ul>

    </header>

  )

}

export default Header