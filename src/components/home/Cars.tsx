/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair } from '@fortawesome/free-solid-svg-icons/faChair'
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears'
import Link from 'next/link'
import useGlobalStore from '@/lib/state/globalStore'
const Cars = () => {

    const { getAllCars, cars } = useGlobalStore()

    const [carsToShow, setCarsToShow] = useState(6); // Initial number of cars to display

    const filterCars = cars.slice(0, carsToShow)

    const skeleton = [1, 2, 3, 4, 5, 6]

    useEffect(() => {

        getAllCars()

    }, [])

    return (

        <div className="flex-col py-16 gap-10 lg:gap-20 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center">
            <h1 className='text-slate-700 text-3xl lg:text-5xl xl:text-6xl md:text-4xl font-light lg:font-extralight'>Available Cars</h1>
            <div className='w-full flex flex-wrap gap-16 justify-center'>
                {filterCars.length > 0 ? filterCars.map(car => (
                    <Link href={`/user/booking/${car.id}`} key={car.id} className='w-[27rem] h-[27rem] overflow-hidden flex flex-col gap-5 items-center cursor-pointer hover:bg-slate-50 hover:shadow-lg hover:border'>
                        <Image width={432} height={300} src={car.images[0]} alt={car.car_name} className='mb-auto hover:scale-110 transition duration-700 cursor-pointer object-cover min-h-[300px] max-h-[300px] min-w-[432px] max-w-[432px]' />
                        <div className='flex items-center gap-3'>
                            <h1 className='text-2xl font-black text-slate-800 uppercase'>{car.car_name}</h1>
                            <div className='text-slate-600 flex items-center gap-2'><h1 className='text-red-700 text-xl font-medium'>₱{car.price}</h1> / 24hours</div>
                        </div>
                        <ul className='flex items-center gap-5 text-slate-700 pb-5'>
                            <li className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faCar} width={16} height={16} />
                                {car.car_type}
                            </li>
                            <li className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faChair} width={16} height={16} />
                                {car.car_seats}
                            </li>
                            <li className='flex items-center gap-2'>
                                <FontAwesomeIcon icon={faGears} width={16} height={16} />
                                {car.transmission}
                            </li>
                        </ul>
                    </Link>
                )) : skeleton.map(bones => (
                    <div key={bones} className='w-[27rem] h-[27rem] flex flex-col gap-5 items-center'>
                        <span className='w-[27rem] h-[27rem] rounded-md bg-slate-100 animate-pulse]'></span>
                        <div className='flex items-center gap-3'>
                            <h1 className='h-6 w-44 rounded-3xl bg-slate-200 animate-pulse'></h1>
                        </div>
                        <ul className='flex items-center w-full justify-center gap-5 text-slate-700'>
                            <li className='flex items-center gap-2'>
                                <span className='w-24 h-5 rounded-3xl bg-slate-200 animate-pulse'></span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <span className='w-24 h-5 rounded-3xl bg-slate-200 animate-pulse'></span>
                            </li>
                            <li className='flex items-center gap-2'>
                                <span className='w-24 h-5 rounded-3xl bg-slate-200 animate-pulse'></span>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setCarsToShow(prevState => prevState + 3)} className={`${carsToShow >= cars.length && 'hidden'} bg-red-700 text-white px-7 py-2 rounded-3xl hover:bg-red-500`}>Load More</button>
            </div>
        </div>
    )
}

export default Cars