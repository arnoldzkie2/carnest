/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import useGlobalStore from '@/lib/state/globalStore'
import { faCar, faChair, faGears, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const { cars, getAllCars } = useGlobalStore()

  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [carName, setCarName] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const carTypes = [
    "Sedan",
    "Hatchback",
    "Coupe",
    "Convertible",
    "SUV (Sports Utility Vehicle)",
    "Crossover",
    "Minivan",
    "Pickup Truck",
    "Station Wagon",
    "Sports Car",
    "Luxury Car",
    "Electric Car",
    "Hybrid Car",
    "Compact Car",
    "Muscle Car",
    "Off-Road Vehicle",
    "Vintage or Classic Car",
    "Microcar",
    "Limousine",
    "Compact SUV"
  ]

  const filteredCars = cars.filter((car) => {
    return (
      (selectedCarType === '' || car.car_type === selectedCarType) &&
      (selectedFuelType === '' || car.fuel_type === selectedFuelType) &&
      (selectedTransmission === '' || car.transmission === selectedTransmission) &&
      (carName === '' || car.car_name.toUpperCase().includes(carName.toUpperCase())) &&
      (carBrand === '' || car.car_brand.toUpperCase().includes(carBrand.toUpperCase()))
    );
  });

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {

    getAllCars()

  }, [])

  return (
    <>
      <UserHeader />

      <div className='px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex justify-center py-24 gap-10'>
        <div className='w-1/5 flex flex-col gap-4 border shadow pb-5'>
          <h1 className='w-full p-2.5 text-2xl bg-red-700 text-white font-bold'>Search & Filter Cars</h1>
          <div className='flex flex-col gap-2 mx-5'>
            <label>Car Types</label>
            <select
              className='px-3 py-2.5 border'
              value={selectedCarType}
              onChange={(e) => setSelectedCarType(e.target.value)}
            >
              <option value="">All Type</option>
              {carTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-2 mx-5'>
            <label>Fuel Type</label>
            <select
              name="fuel_type"
              className='outline-none border px-3 py-2'
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
            >
              <option value="">All Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Bio-Diesel">Bio-Diesel</option>
              <option value="Ethanol">Ethanol</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 mx-5'>
            <label>Transmission</label>
            <select
              className='px-3 py-2.5 border'
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
            >
              <option value="">All Type</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 mx-5'>
            <label htmlFor="">Car Name</label>
            <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)} className='w-full py-2 border outline-none px-3' placeholder='Search Car (name)' />
          </div>
          <div className='flex flex-col gap-2 mx-5'>
            <label htmlFor="">Car Brand</label>
            <input type="text" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} className='w-full py-2 border outline-none px-3' placeholder='Search Car (brand)' />
          </div>
          <div className='flex items-center gap-2 mx-5'><strong>Found Result:</strong> {filteredCars.length}</div>
        </div>
        <div className='w-1/2 flex flex-col gap-2 max-h-[800px] overflow-y-auto'>
          {filteredCars.length > 0 ?
            filteredCars.map(car => (
              <Link href={`/user/boooking/${car.id}`} className='h-56 max-h-[224px] w-full hover:shadow-lg flex bg-white border shadow' key={car.id}>
                <Image src={car.images[0]} alt={car.car_name} width={280} height={224} className='object-cover max-w-[280px] max-h-[224px] min-w-[280px] min-h-[224px]' />
                <div className='flex flex-col p-2 gap-4 w-full'>
                  <h1 className='font-bold uppercase'>{car.car_brand} {car.car_name} {car.year}</h1>
                  <ul className='w-full flex items-center justify-between gap-5 pb-3 border-b-2'>
                    <li className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faCar} width={16} height={16} />
                      {car.car_type}
                    </li>
                    <li className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faChair} width={16} height={16} />
                      {car.car_seats} Seaters
                    </li>
                    <li className='flex items-center gap-1'>
                      <FontAwesomeIcon icon={faGears} width={16} height={16} />
                      {car.transmission}
                    </li>
                  </ul>
                  <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faLocationDot} width={16} height={16} className='text-red-700' />
                    {car.location.address}
                  </div>
                </div>
                <div className='w-96 h-full flex flex-col p-2'>
                  <h1 className='font-bold'>Price:</h1>
                  <span>₱ {car.price} per 24 hrs</span>
                  <h1 className='mt-auto mb-1'><strong>Total:</strong> <span className='text-red-500'>₱ {car.price}</span></h1>
                  <Link href={`/user/booking/${car.id}`} className='bg-red-700 text-white flex items-center justify-center hover:bg-red-500 h-10 rounded-md text-lg w-full'>Select</Link>
                </div>
              </Link>
            ))
            : skeleton.map(item => (
              <div key={item} className='h-56 min-h-[224px] flex w-full max-w-full bg-white border shadow'>
                <div className='bg-slate-200 animate-pulse rounded-md h-full w-[280px] min-w-[280px]'></div>
                <div className='flex flex-col gap-4 p-2'>
                  <h1 className='bg-slate-200 rounded-3xl w-64 h-6 animate-pulse'></h1>
                  <ul className='flex w-full justify-between pb-3 border-b-2 gap-5'>
                    <li className='w-20 h-6 bg-slate-200 rounded-3xl animate-pulse'></li>
                    <li className='w-20 h-6 bg-slate-200 rounded-3xl animate-pulse'></li>
                    <li className='w-20 h-6 bg-slate-200 rounded-3xl animate-pulse'></li>
                  </ul>
                  <div className='flex items-center gap-2'>
                    <FontAwesomeIcon icon={faLocationDot} width={16} height={16} className='text-red-700' />
                    <span className='w-64 bg-slate-200 rounded-3xl h-6 animate-pulse'></span>
                  </div>
                </div>
                <div className='w-64 max-w-[256px] flex flex-col p-2'>
                  <h1 className='font-bold'>Price:</h1>
                  <span className='w-44 rounded-3xl bg-slate-200 h-6 animate-pulse'></span>
                  <div className='mt-auto mb-1 flex items-center gap-3 w-44'><strong>Total:</strong> <span className='bg-slate-200 animate-pulse w-44 h-6 rounded-3xl'></span></div>
                  <div className='bg-red-200 flex items-center justify-center animate-pulse h-10 rounded-md text-lg w-full'></div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <UserFooter />
    </>
  )
}

export default Page 