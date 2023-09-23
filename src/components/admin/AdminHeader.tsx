/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useOperatorStore from '@/lib/state/operatorStore'
import useAdminStore from '@/lib/state/adminStore'

const AdminHeader = () => {

    const [isOpen, setIsOpen] = useState(false)

    const { admin, getAdmin } = useAdminStore()


    useEffect(() => {

        getAdmin()

    }, [])

    return (
        <header className='z-20 bg-white px-5 sm:px-10 md:px-16 border-b lg:px-24 xl:px-36 2xl:px-44 h-16 md:h-20 fixed w-screen flex items-center top-0 left-0 justify-between'>
            <Link href={'/admin'} className={`text-red-700 flex items-center text-2xl md:text-3xl font-black`}>
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
                <Link href={'/admin'} className='flex mt-4 lg:hidden items-center text-2xl font-black text-red-700'>
                    CARNEST
                </Link>
                <Link href='/admin' className={`lg:ml-auto rounded-2xl cursor-pointer hover:text-red-700`}>Admin</Link>
                <Link href='/admin/user' className={`rounded-2xl cursor-pointer hover:text-red-700`}>User</Link>
                <Link href='/admin/operator' className={`rounded-2xl cursor-pointer hover:text-red-700`}>Operator</Link>
                <Link href='/admin/transactions' className={`rounded-2xl cursor-pointer hover:text-red-700`}>Transactions</Link>
                <div className={`${isOpen ? 'mt-5' : ''} flex items-center gap-5  lg:ml-auto`}>
                    <li className='hover:text-red-700 cursor-pointer flex items-center gap-1.5'>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} width={16} height={16} />
                        Logout
                    </li>
                </div>
            </ul>
        </header>)
}

export default AdminHeader