/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import useGlobalStore, { Car } from '@/lib/state/globalStore'
import useUserStore from '@/lib/state/userStore'
import { faCar, faChair, faGear, faGears, faLocationDot, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
interface Props {
    params: {
        carID: string
    }
}

const Page = ({ params }: Props) => {

    const router = useRouter()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE!,
        libraries: ['places']
    })


    const { getToken } = useUserStore()

    const { isLoading, setIsLoading } = useGlobalStore()

    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    const containerStyle = {
        width: '100%',
        height: '350px'
    };

    const { carID } = params

    const [car, setCar] = useState<Car>(
        {
            "car_brand": "",
            "car_name": "",
            "id": 0,
            "fuel_type": "",
            "transmission": "",
            "car_seats": 0,
            "coding_day": "",
            "car_type": "",
            "plate_number": "",
            "location": {
                address: '',
                map: {
                    lat: 0,
                    lng: 0
                }
            },
            "images": [],
            "price": 0,
            "year": "",
            "operator_id": 0,
            "reserved": false
        }
    )

    const [formData, setFormData] = useState({
        pickup_date: '',
        pickup_time: '',
        duration: 1,
        return_date: '',
        total_price: 0,
    })

    useEffect(() => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            total_price: prevFormData.duration * car.price,
        }))

    }, [formData.duration])

    const [selectedImage, setSelectedImage] = useState(0)

    const getCar = async () => {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car`, {
            params: {
                id: carID
            }
        })

        if (data.ok) {

        }
    }

    const bookNow = async (e: any) => {
        e.preventDefault()

        try {

            const { pickup_date, pickup_time, duration, return_date, total_price } = formData

            const user = getToken()
            setIsLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking`, {
                pickup_date, pickup_time, duration, return_date, total_price, operator_id: car.operator_id, car_info: car
            }, {
                headers: {
                    Authorization: user?.token
                }
            })

            if (data.ok) {
                setIsLoading(false)
                router.push('/user/transactions')
            }

        } catch (error) {

            setIsLoading(false)
            console.log(error);

        }
    }

    const handleTimeChange = (e: any) => {

        const selectedTime = (e?.format('h:mmA'))
        setFormData(prevData => ({ ...prevData, pickup_time: selectedTime || '' }))

    }

    useEffect(() => {

        getToken()

        getCar()

        setFormData(prevData => ({
            ...prevData,
            pickup_time: '12:00AM',
            pickup_date: dayjs().format('MM/DD/YYYY') as any,
            return_date: dayjs().add(1, 'day').format('MM/DD/YYYY')
        }))

    }, [])

    return (
        <>
            <UserHeader />
            <div className='px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col py-24 items-center gap-10'>
                <div className='relative w-full flex justify-center bg-red-700'>
                    {car.id ? <Image src={car.images[selectedImage]} alt='Car Image' width={900} height={500} className='bg-white max-h-[500px]' />
                        : <div className='w-[900px] h-[500px] bg-slate-200 animate-pulse'></div>}
                    <div className='absolute bottom-0 w-full h-24 md:h-32 bg-black bg-opacity-20 overflow-x-auto flex items-center justify-center'>
                        <div className='flex items-center h-[70px] gap-2'>
                            {car.id && car.images.length > 0 ? car.images.map((car, index) => (
                                <Image onClick={() => setSelectedImage(index)} key={car} src={car} width={100} height={70} alt={car} className={`bg-white rounded-md min-h-[70px] min-w-[100px] opacity-80 cursor-pointer ${index === selectedImage && 'border-2 border-red-500 opacity-100'} hover:opacity-100`} />
                            )) :
                                <>
                                    <div className='w-[100px] h-[70px] bg-slate-100 rounded-md animate-pulse'></div>
                                    <div className='w-[100px] h-[70px] bg-slate-100 rounded-md animate-pulse'></div>
                                    <div className='w-[100px] h-[70px] bg-slate-100 rounded-md animate-pulse'></div>
                                    <div className='w-[100px] h-[70px] bg-slate-100 rounded-md animate-pulse'></div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex gap-10 lg:flex-row lg:w-full 2xl:w-3/4 text-slate-700 w-full justify-around flex-col lg:gap-20'>
                    <div className='flex flex-col w-full gap-3'>
                        <h1 className='text-2xl font-bold my-2 border-b pb-2 text-center lg:text-left'>Vehicle Details</h1>
                        <div className='flex justify-between items-center flex-col xl:flex-row lg:items-start gap-3 py-3'>
                            {car.id ? <h2 className='font-bold text-2xl text-red-700'>{car.car_brand} {car.car_name} {car.year}</h2>
                                : <h2 className='w-80 bg-slate-200 animate-pulse h-7 rounded-3xl'></h2>
                            }
                            {car.id ?
                                <ul className='flex items-center gap-5'>
                                    <li className='flex items-center gap-1'>
                                        <FontAwesomeIcon icon={faChair} width={16} height={16} />
                                        <span>{car.car_seats} Seats</span>
                                    </li>
                                    <li className='flex items-center gap-1'>
                                        <FontAwesomeIcon icon={faCar} width={16} height={16} />
                                        <span>{car.car_type}</span>
                                    </li>
                                    <li className='flex items-center gap-1'>
                                        <FontAwesomeIcon icon={faGears} width={16} height={16} />
                                        <span>{car.transmission}</span>
                                    </li>
                                </ul> :
                                <ul className='flex items-center gap-5'>
                                    <li className='w-24 h-6 bg-slate-200 animate-pulse rounded-3xl'></li>
                                    <li className='w-24 h-6 bg-slate-200 animate-pulse rounded-3xl'></li>
                                    <li className='w-24 h-6 bg-slate-200 animate-pulse rounded-3xl'></li>
                                </ul>}
                        </div>
                        {car.id ?
                            <>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-bold'>Plate Number</h2>
                                    <div>{car.plate_number}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-bold'>Fuel Type</h2>
                                    <div>{car.fuel_type}</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-bold'>Coding Day</h2>
                                    <div>{car.coding_day}</div>
                                </div>
                            </>
                            :
                            <>
                                <div className='flex justify-between items-center'>
                                    <h2 className='h-6 w-52 rounded-3xl animate-pulse bg-slate-200'></h2>
                                    <div className='w-28 h-6 rounded-3xl bg-slate-200 animate-pulse'></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h2 className='h-6 w-40 rounded-3xl animate-pulse bg-slate-200'></h2>
                                    <div className='w-36 h-6 rounded-3xl bg-slate-200 animate-pulse'></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h2 className='h-6 w-44 rounded-3xl animate-pulse bg-slate-200'></h2>
                                    <div className='w-20 h-6 rounded-3xl bg-slate-200 animate-pulse'></div>
                                </div>
                            </>
                        }
                        <span>This vehicle's coding day is on <strong>Friday</strong> which means that this vehicle should avoid be driven around areas that have number coding schemes.</span>
                        <h1 className='text-2xl font-bold my-2 border-b pb-2'>Requirements - Bring 2 Primary IDs</h1>
                        <ul className='flex flex-col gap-2'>
                            <li>Please be reminded to bring your two primary IDs (including your driver's license) with you when you pick up the car.</li>
                            <li>The other primary ID presented will be handed to the assigned Carbnb employee and will be released as soon as you return the vehicle for security purposes.</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-5 w-full lg:w-2/3'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className='w-full flex flex-col gap-4'>
                                <h1 className='font-medium'>Pickup Date</h1>
                                {car.id ? <MobileDatePicker
                                    defaultValue={dayjs()}
                                    onAccept={(selectedDate) => {
                                        // Calculate the return_date by adding the duration to the selected pickup_date
                                        const returnDate = dayjs(selectedDate).add(formData.duration, 'day').format('MM/DD/YYYY');

                                        setFormData((prevData) => ({
                                            ...prevData,
                                            pickup_date: selectedDate?.format('MM/DD/YYYY') as any,
                                            return_date: returnDate
                                        }))
                                    }} /> :
                                    <div className='h-10 w-full bg-slate-200 rounded-md animate-pulse'>
                                    </div>}
                            </div>
                            <div className='w-full flex flex-col gap-4'>
                                <h1 className='font-medium'>Pickup Time</h1>
                                {car.id ? <MobileTimePicker
                                    defaultValue={dayjs('00:00', 'HH:mm')}
                                    onAccept={(e) => handleTimeChange(e)}
                                /> :
                                    <div className='h-10 w-full bg-slate-200 rounded-md animate-pulse'></div>
                                }
                            </div>
                            <div className='w-full flex flex-col gap-4'>
                                <h1 className='font-medium'>Duration</h1>
                                {car.id ? <select
                                    className='px-3 py-3 border bg-white'
                                    onChange={(e) => {
                                        const selectedDuration = Number(e.target.value);
                                        const returnDate = dayjs(formData.pickup_date, 'MM/DD/YYYY').add(selectedDuration, 'day').format('MM/DD/YYYY');
                                        setFormData((prevData) => ({ ...prevData, duration: selectedDuration, return_date: returnDate }));
                                    }}
                                    value={formData.duration}
                                >                                    {duration.map(dur => (
                                    <option value={dur} key={dur}>{dur} {dur > 1 ? 'Days' : 'Day'}</option>
                                ))}
                                </select> : <div className='h-10 w-full bg-slate-200 rounded-md animate-pulse'></div>}
                            </div>
                            <div className='font-bold text-red-500 flex items-center justify-between'>Pickup Date
                                {car.id ? <span className='text-slate-700'>{new Date(formData.pickup_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} {formData.pickup_time}</span>
                                    : <div className='w-64 h-6 rounded-3xl bg-slate-200 animate-pulse'></div>
                                }
                            </div>
                            <div className='font-bold text-red-500 flex items-center justify-between'>Return Date
                                {car.id ? <span className='text-slate-700'>{new Date(formData.return_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} {formData.pickup_time}</span>
                                    : <div className='w-64 h-6 rounded-3xl bg-slate-200 animate-pulse'></div>
                                }                            </div>
                            <h1>Please double check your pick up date and return date before clicking Book Now. </h1>
                            <h1>The dates and price will automatically adjust when you update your pickup date, time or duration.</h1>
                            <div className='flex flex-col py-5 gap-5'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-bold text-red-500'>Total Price</h1>
                                    {car.id ? <span>
                                        ₱{formData.total_price}
                                    </span> :
                                        <span className='w-52 h-6 bg-slate-200 rounded-3xl aniamte-pulse'></span>
                                    }
                                </div>
                                {car.id ? <button onClick={bookNow} disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg text-white py-2 w-full rounded-md`}>
                                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Book Now!'}
                                </button>
                                    : <div className='h-11 w-full bg-red-700 animate-pulse rounded-md flex items-center justify-center text-white'>Loading...</div>}
                                <Link href={'/user/booking'} className='bg-red-700 hover:bg-red-500 py-3 rounded-md text-white flex items-center justify-center font-medium'>Select Another Car</Link>
                            </div>
                        </LocalizationProvider>
                        <div className='w-full flex flex-col gap-4'>
                            <h1 className='text-red-500 font-bold'>Pickup Address</h1>
                            <div className='flex items-center gap-3'><FontAwesomeIcon icon={faLocationDot} width={16} height={16} />
                                {car.id ? <span>
                                    {car.location.address}
                                </span>: 
                                <span className='w-full h-6 bg-slate-200 animate-pulse rounded-3xl'></span>}
                            </div>
                            {isLoaded && car.id ? <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                    lat: car.location.map.lat,
                                    lng: car.location.map.lng
                                }}
                                zoom={17}>
                                <Marker
                                    position={{
                                        lat: car.location.map.lat,
                                        lng: car.location.map.lng
                                    }}
                                />

                            </GoogleMap> : <div className='w-full h-[400px] bg-slate-200 rounded-md animate-pulse'></div>}
                        </div>
                    </div>

                </div>
            </div>
            <UserFooter />
        </>
    )
}

export default Page