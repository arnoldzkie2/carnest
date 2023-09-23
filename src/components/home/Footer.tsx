import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='px-5 sm:px-10 md:px-16 py-5 lg:py-10 lg:px-24 xl:px-36 2xl:px-44 gap-5 flex flex-col items-center text-gray-600 bg-slate-50'>

            <nav className='flex md:justify-between flex-col gap-7 lg:gap-0 md:flex-row w-full'>
                <div className='flex flex-col gap-4 w-full md:w-1/2 sm:w-5/6 lg:w-1/3'>
                    <h1 className='text-xl lg:text-2xl text-red-700 font-black'>CARNEST</h1>
                    <p className='text-sm leading-6'>CarNest is your go-to web app for hassle-free car rentals. Whether you need a vehicle for a quick getaway, a business trip, or an extended road trip, CarNest offers a diverse fleet of well-maintained cars to suit your needs. With easy booking, convenient pickup locations, and competitive pricing, CarNest ensures a seamless and reliable rental experience, whether for business or leisure.</p>
                </div>
                <ul className='flex gap-4 md:gap-3 flex-col items-start'>
                    <li className='text-lg font-medium text-red-700 md:mb-2'>LINKS</li>
                    <li>
                        <Link href='/booking' className='text-sm lg:text-base hover:text-red-600 cursor-pointer' >Book Now</Link>
                    </li>
                    <li>
                        <Link href='/signup/operator' className='text-sm lg:text-base hover:text-red-600 cursor-pointer' >Apply as Operator</Link>
                    </li>
                    <li>
                        <Link href='/login/operator' className='text-sm lg:text-base hover:text-red-600 cursor-pointer' >Login as Operator</Link>
                    </li>
                    <li>
                        <Link href={'/login/user'} className='text-sm lg:text-base hover:text-red-600' >Login</Link>
                    </li>
                    <li>
                        <Link href={'/signup'} className='text-sm lg:text-base hover:text-red-600' >Sign Up</Link>
                    </li>
                </ul>
            </nav>
            <div className='pt-10 w-full border-t flex flex-col gap-5 md:flex-row md:justify-between'>
                <ul className='flex gap-4 items-center order-2 md:order-1 text-sm md:text-base'>
                    © 2023, carnest
                    <li >License</li>
                    <li >Terms</li>
                    <li >Privacy</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer