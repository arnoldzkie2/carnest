import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Main = () => {
    return (
        <main className="h-screen z-10 flex-col pt-11 justify-center lg:flex-row lg:justify-between gap-10 px-5 lg:pt-0 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center" id='home'>
            <div className='flex flex-col gap-4 w-full xl:w-1/2 sm:gap-5 lg:gap-7 text-center lg:text-left px-3 lg:px-0 items-center lg:items-start'>
                <h1 className='text-slate-700 text-3xl lg:text-5xl xl:text-6xl md:text-4xl font-light lg:font-extralight'>Carnest: Elevating Your Car Rental Experience</h1>
                <h2 className='text-slate-600 leading-6 md:leading-8 text-sm md:text-base'>Discover Our Diverse Fleet and Effortless Booking System for Unforgettable Journeys</h2>
                <Link href={'/signup/user'}
                    className='bg-red-700 hover:bg-red-500 border cursor-pointer mt-2 md:mt-5 text-white py-2.5 px-8 rounded-3xl shadow-sm'>
                    Get Started
                </Link>
            </div>
            <Image src={'/main.png'} alt='Hero' width={400} priority height={400} className='bg-white w-full h-auto sm:w-[90%] md:w-[65%] lg:w-[50%] xl:w-[40%]' />
        </main>
    )
}

export default Main