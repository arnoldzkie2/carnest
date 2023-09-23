'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair } from '@fortawesome/free-solid-svg-icons/faChair'
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears'
import Link from 'next/link'
import { Car } from '@/lib/state/globalStore'
const Cars = () => {

    const [cars, setCars] = useState<Car[]>([])

    const [carsToShow, setCarsToShow] = useState(6); // Initial number of cars to display

    const filterCars = cars.slice(0, carsToShow)

    const skeleton = [1, 2, 3, 4, 5, 6]

    useEffect(() => {

        setTimeout(() => {

            setCars(
                [
                    {
                        "car_brand": "Toyota",
                        "car_name": "Camry",
                        "id": 1,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Sedan",
                        "plate_number": "ABC-123",
                        "location": {
                            "address": "123 Main St",
                            "map": "https://maps.example.com/123"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 50.00,
                        "year": "2022",
                        "operator_id": 101,
                        "reserved": false
                    },
                    {
                        "car_brand": "Honda",
                        "car_name": "Civic",
                        "id": 2,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Sedan",
                        "plate_number": "XYZ-789",
                        "location": {
                            "address": "456 Elm St",
                            "map": "https://maps.example.com/456"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 45.00,
                        "year": "2021",
                        "operator_id": 102,
                        "reserved": true
                    },
                    {
                        "car_brand": "Ford",
                        "car_name": "Escape",
                        "id": 3,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "SUV",
                        "plate_number": "LMN-456",
                        "location": {
                            "address": "789 Oak Ave",
                            "map": "https://maps.example.com/789"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 55.00,
                        "year": "2023",
                        "operator_id": 103,
                        "reserved": false
                    },
                    {
                        "car_brand": "Chevrolet",
                        "car_name": "Silverado",
                        "id": 4,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Truck",
                        "plate_number": "PQR-789",
                        "location": {
                            "address": "101 Pine Rd",
                            "map": "https://maps.example.com/101"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 65.00,
                        "year": "2022",
                        "operator_id": 104,
                        "reserved": true
                    },
                    {
                        "car_brand": "Nissan",
                        "car_name": "Altima",
                        "id": 5,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Sedan",
                        "plate_number": "RST-101",
                        "location": {
                            "address": "202 Cedar Ln",
                            "map": "https://maps.example.com/202"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 48.00,
                        "year": "2021",
                        "operator_id": 105,
                        "reserved": false
                    },
                    {
                        "car_brand": "Tesla",
                        "car_name": "Model 3",
                        "id": 6,
                        "fuel_type": "Electric",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Electric",
                        "plate_number": "TES-001",
                        "location": {
                            "address": "303 Maple St",
                            "map": "https://maps.example.com/303"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 70.00,
                        "year": "2022",
                        "operator_id": 106,
                        "reserved": true
                    },
                    {
                        "car_brand": "Jeep",
                        "car_name": "Wrangler",
                        "id": 7,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 4,
                        "car_type": "SUV",
                        "plate_number": "JEEP-007",
                        "location": {
                            "address": "404 Birch Rd",
                            "map": "https://maps.example.com/404"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 60.00,
                        "year": "2023",
                        "operator_id": 107,
                        "reserved": false
                    },
                    {
                        "car_brand": "BMW",
                        "car_name": "X5",
                        "id": 8,
                        "fuel_type": "Diesel",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "SUV",
                        "plate_number": "BMW-X5",
                        "location": {
                            "address": "505 Cedar Ave",
                            "map": "https://maps.example.com/505"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 75.00,
                        "year": "2022",
                        "operator_id": 108,
                        "reserved": true
                    },
                    {
                        "car_brand": "Kia",
                        "car_name": "Sportage",
                        "id": 9,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "SUV",
                        "plate_number": "KIA-2023",
                        "location": {
                            "address": "606 Oak Rd",
                            "map": "https://maps.example.com/606"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 53.00,
                        "year": "2023",
                        "operator_id": 109,
                        "reserved": false
                    },
                    {
                        "car_brand": "Hyundai",
                        "car_name": "Elantra",
                        "id": 10,
                        "fuel_type": "Gasoline",
                        "transmission": "Automatic",
                        "car_seats": 5,
                        "car_type": "Sedan",
                        "plate_number": "HYU-10",
                        "location": {
                            "address": "707 Maple Ave",
                            "map": "https://maps.example.com/707"
                        },
                        "images": ["/testcar.jpg"],
                        "price": 47.00,
                        "year": "2023",
                        "operator_id": 110,
                        "reserved": true
                    }
                ]

            )

        }, 3000)

    }, [])

    return (

        <div className="flex-col py-16 gap-10 lg:gap-20 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center">
            <h1 className='text-slate-700 text-3xl lg:text-5xl xl:text-6xl md:text-4xl font-light lg:font-extralight'>Available Cars</h1>
            <div className='w-full flex flex-wrap gap-16 justify-center'>
                {filterCars.length > 0 ? filterCars.map(car => (
                    <Link href={`/booking/${car.id}`} key={car.id} className='w-[27rem] h-[27rem] flex flex-col gap-5 items-center cursor-pointer hover:bg-slate-50 hover:shadow-lg hover:border'>
                        <Image width={432} height={432} src={car.images[0]} alt={car.car_name} />
                        <div className='flex items-center gap-3'>
                            <h1 className='text-2xl font-black text-slate-800 uppercase'>{car.car_name}</h1>
                            <div className='text-slate-600 flex items-center gap-2'><h1 className='text-red-700 text-xl font-medium'>₱{car.price}</h1> / 24hours</div>
                        </div>
                        <ul className='flex items-center gap-5 text-slate-700'>
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