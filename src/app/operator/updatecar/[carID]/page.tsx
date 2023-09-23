/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import OperatorFooter from '@/components/operator/OperatorFooter'
import OperatorHeader from '@/components/operator/OperatorHeader'
import useGlobalStore, { Car } from '@/lib/state/globalStore'
import useOperatorStore from '@/lib/state/operatorStore'
import { UploadButton } from '@/lib/utils/uploadthing'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {
  params: {
    carID: string
  }
}

const Page = ({ params }: Props) => {

  const { carID } = params

  const { isLoading, setIsLoading } = useGlobalStore()

  const { getOperatorToken } = useOperatorStore()

  const router = useRouter()

  const [formData, setFormData] = useState<{
    car_brand: string
    car_name: string
    car_seats: number
    car_type: string
    fuel_type: string
    images: string[]
    price: number
    year: string
    reserved: boolean
    plate_number: string
    transmission: string
    location: string
  }>({
    car_brand: '',
    car_name: '',
    car_seats: 0,
    car_type: '',
    fuel_type: '',
    images: [],
    price: 0,
    year: '',
    reserved: false,
    plate_number: '',
    transmission: '',
    location: ''
  })

  const handleChange = (e: any) => {

    const { name, value } = e.target

    setFormData(prevData => ({
      ...prevData, [name]: value
    }))

  }

  const updateCar = async (e: any) => {

    e.preventDefault()

    try {

      setIsLoading(true)

      const operator = getOperatorToken()

      setIsLoading(true)

      const { car_brand, car_name, car_seats, car_type, transmission, location, plate_number, reserved, year, images, fuel_type, price } = formData

      if (images.length < 3) return alert('Upload atleast 3 images to your cars')

      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car`, {
        car_brand, car_name, car_seats: Number(car_seats), car_type, transmission, location, plate_number, reserved, year, images, fuel_type, price: Number(price)
      }, {
        headers: {
          Authorization: operator?.token
        },
        params: {
          id: carID
        }
      })

      if (data.ok) {

        setIsLoading(false)

        router.push('/operator')

      }

    } catch (error) {

      setIsLoading(false)

      console.log(error);

    }
  }

  const retrieveCar = async () => {

    try {

      const operator = getOperatorToken()

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car`, {
        params: {
          id: carID
        },
        headers: {
          Authorization: operator?.token
        }
      })

      if (data.ok) {

        setFormData(data.data)
        
      }

    } catch (error) {

      console.log(error);

    }
  }
  useEffect(() => {

    retrieveCar()

  }, [])

  return (
    <>
      <OperatorHeader />
      <div className='py-24 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-full gap-5 justify-center items-center'>
        <h1 className='text-2xl text-slate-800 font-black'>Update Car</h1>
        <form className='flex flex-col gap-5 w-full md:w-1/2 md:border md:p-10 md:shadow-lg' onSubmit={updateCar}>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Car Name</label>
            <input required value={formData.car_name} onChange={handleChange} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Car Name' name='car_name' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Car Brand</label>
            <input required onChange={handleChange} value={formData.car_brand} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Car Brand' name='car_brand' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Car Type</label>
            <input required onChange={handleChange} value={formData.car_type} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Car Type' name='car_type' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Fuel Type</label>
            <select name="fuel_type" className='outline-none border px-3 py-1.5' onChange={handleChange} value={formData.fuel_type}>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Bio-Diesel">Bio-Diesel</option>
              <option value="Ethanol">Ethanol</option>
            </select>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Transmission</label>
            <input required onChange={handleChange} value={formData.transmission} type="string" className='py-1.5 px-3 w-full border outline-none' placeholder='Transmission' name='transmission' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Car Seats</label>
            <input required onChange={handleChange} value={formData.car_seats || ''} type="number" className='py-1.5 px-3 w-full border outline-none' placeholder='Seats Available' name='car_seats' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Plate Number</label>
            <input required onChange={handleChange} value={formData.plate_number} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Plate Number' name='plate_number' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Year</label>
            <input required onChange={handleChange} value={formData.year} type="number" className='py-1.5 px-3 w-full border outline-none' placeholder='Year' name='year' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Pickup Location</label>
            <input required onChange={handleChange} value={formData.location} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Pickup Location' name='location' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Price / day</label>
            <input required onChange={handleChange} value={formData.price || ''} type="number" className='py-1.5 px-3 w-full border outline-none' placeholder='Price' name='price' />
          </div>
          <div className='w-full'>
            <UploadButton
              endpoint="carImage"
              onClientUploadComplete={(res) => {

                setIsLoading(false)

                if (res) {

                  const filterImage = res.map(image => image.url)

                  setFormData(prevData => ({ ...prevData, images: filterImage }))

                }
                alert("Upload Completed")
              }}
              onUploadBegin={() => {
                setIsLoading(true)
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.

                alert('Something went wrong')
              }}
              appearance={{
                button: "bg-red-700 px-6 py-1.5 rounded-3xl w-1/2",
              }}
            />
          </div>
          <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg text-white py-2 px-10 self-center rounded-3xl`}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Update'}
          </button>        </form>
      </div>
      <OperatorFooter />
    </>
  )
}

export default Page