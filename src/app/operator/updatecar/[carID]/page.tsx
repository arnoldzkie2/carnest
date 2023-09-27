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
import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE!,
    libraries: ['places']
  })

  const codingDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const inputRef = useRef<any>();

  const handlePlaceChanged = () => {

    const [place] = inputRef.current.getPlaces();

    if (place) {
      setFormData(prevData => ({
        ...prevData,
        location: {
          address: place.formatted_addres,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        }
      }))
    }
  }
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

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

  const [formData, setFormData] = useState<{
    car_brand: string
    car_name: string
    car_seats: number
    car_type: string
    coding_day: string
    fuel_type: string
    images: string[]
    price: number
    year: string
    reserved: boolean
    plate_number: string
    transmission: string
    location: {
      address: string
      position: {
        lat: number
        lng: number
      }
    }
  }>({
    car_brand: '',
    car_name: '',
    car_seats: 0,
    car_type: '',
    coding_day: '',
    fuel_type: '',
    images: [],
    price: 0,
    year: '',
    reserved: false,
    plate_number: '',
    transmission: '',
    location: {
      address: '',
      position: {
        lat: 14.6760,
        lng: 121.0437
      }
    }
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

      
      const { car_brand, car_name, car_seats, coding_day, car_type, transmission, location, plate_number, reserved, year, images, fuel_type, price } = formData
      
      if (images.length < 2) return alert('Upload atleast 2 images to your cars')
      if(!location.address) return alert('Fill up the location')      
      setIsLoading(true)
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car`, {
        car_brand, car_name, coding_day, car_seats: Number(car_seats), car_type, transmission, location, plate_number, reserved, year, images, fuel_type, price: Number(price)
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
        <h1 className='text-4xl text-red-700'>Update Car</h1>
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
            <select className='py-2 px-3 border outline-none' name="car_type" value={formData.car_type} onChange={handleChange}>
            {carTypes.map(type => (
              <option value={type} key={type}>{type}</option>
            ))}
            </select>          </div>
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
            <label htmlFor="">Coding Day</label>
            <select name="coding_day" className='outline-none border px-3 py-1.5' onChange={handleChange} value={formData.coding_day}>
              {codingDay.map(day => (
                <option value={day} key={day}>{day}</option>
              ))}
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
            {isLoaded ? <StandaloneSearchBox
              onLoad={ref => inputRef.current = ref}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                className="px-3 py-1 border outline-none w-full"
                placeholder="Enter Location"
              />
            </StandaloneSearchBox> :
              <div className='w-full h-7 border bg-slate-100 animate-pulse'></div>
            }
          </div>

          {isLoaded ? <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: formData.location.position.lat,
              lng: formData.location.position.lng
            }}
            zoom={13}
            onClick={e => {
              if (e.latLng) {
                const lat = e.latLng.lat()
                const lng = e.latLng.lng()
                setFormData(prevData => ({
                  ...prevData, location: {
                    address: prevData.location.address,
                    position: {
                      lat: lat,
                      lng: lng
                    }
                  }
                }))
              }
            }}
          >
            <Marker
              position={{
                lat: formData.location.position.lat,
                lng: formData.location.position.lng
              }}
            />

          </GoogleMap> : <div className='w-full h-[400px] bg-slate-100 animate-pulse'></div>}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Price / day</label>
            <input required onChange={handleChange} value={formData.price || ''} type="number" className='py-1.5 px-3 w-full border outline-none' placeholder='Price' name='price' />
          </div>
          <div className='w-full flex items-start gap-5'>
            <h1 className='text-2xl text-slate-700'>Car Image</h1>
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

                alert('Something went wrong')
              }}
              appearance={{
                button: "bg-red-700 px-6 py-1.5 rounded-3xl w-full",
              }}
            />
            <div>Uploaded: {formData.images.length}</div>
          </div>
          <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg text-white py-2 px-10 self-end rounded-3xl`}>
            {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Update'}
          </button>
        </form>
      </div>
      <OperatorFooter />
    </>
  )
}

export default Page