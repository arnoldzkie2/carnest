/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import { Booking } from '@/lib/state/globalStore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useAdminStore from '@/lib/state/adminStore'
interface Props {
  params: {
    operatorID: string
  }
}

const Page = ({ params }: Props) => {

  const { operatorID } = params

  const { getAdminToken } = useAdminStore()

  const [currentOperator, setCurrentOperator] = useState<{
    name: string
    id: number
    mobile: string | null
    email: string
    status: string
    profile: string | null
    address: string | null
    money: number
    image_id: string | null
    transactions: Booking[]
  }>({
    id: Number(operatorID),
    name: '',
    mobile: '',
    email: '',
    status: '',
    profile: '',
    address: '',
    money: 0,
    image_id: '',
    transactions: [
      {
        "id": 1,
        "operator_id": 1,
        "user_id": 101,
        "pickup_date": "2023-09-20",
        "pickup_time": "08:00 AM",
        "duration": 1,
        "return_date": "2023-09-23",
        "total_price": 150,
        "status": 3,
        "picup_location": "Pickup Location 1",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 2,
        "operator_id": 2,
        "user_id": 102,
        "pickup_date": "2023-09-21",
        "pickup_time": "10:30 AM",
        "duration": 1,
        "return_date": "2023-09-23",
        "total_price": 120,
        "status": 3,
        "picup_location": "Pickup Location 2",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 3,
        "operator_id": 3,
        "user_id": 103,
        "pickup_date": "2023-09-22",
        "pickup_time": "09:00 AM",
        "duration": 1,
        "return_date": "2023-09-26",
        "total_price": 200,
        "status": 0,
        "picup_location": "Pickup Location 3",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 4,
        "operator_id": 4,
        "user_id": 104,
        "pickup_date": "2023-09-23",
        "pickup_time": "02:00 PM",
        "duration": 2,
        "return_date": "2023-09-24",
        "total_price": 75,
        "status": 1,
        "picup_location": "Pickup Location 4",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 5,
        "operator_id": 5,
        "user_id": 105,
        "pickup_date": "2023-09-24",
        "pickup_time": "11:30 AM",
        "duration": 1,
        "return_date": "2023-09-29",
        "total_price": 250,
        "status": 0,
        "picup_location": "Pickup Location 5",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 6,
        "operator_id": 6,
        "user_id": 106,
        "pickup_date": "2023-09-25",
        "pickup_time": "03:30 PM",
        "duration": 1,
        "return_date": "2023-09-27",
        "total_price": 120,
        "status": 1,
        "picup_location": "Pickup Location 6",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 7,
        "operator_id": 7,
        "user_id": 107,
        "pickup_date": "2023-09-26",
        "pickup_time": "10:00 AM",
        "duration": 1,
        "return_date": "2023-09-29",
        "total_price": 180,
        "status": 0,
        "picup_location": "Pickup Location 7",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 8,
        "operator_id": 8,
        "user_id": 108,
        "pickup_date": "2023-09-27",
        "pickup_time": "01:45 PM",
        "duration": 1,
        "return_date": "2023-10-01",
        "total_price": 220,
        "status": 1,
        "picup_location": "Pickup Location 8",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 9,
        "operator_id": 9,
        "user_id": 109,
        "pickup_date": "2023-09-28",
        "pickup_time": "09:30 AM",
        "duration": 1,
        "return_date": "2023-09-30",
        "total_price": 120,
        "status": 0,
        "picup_location": "Pickup Location 9",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      },
      {
        "id": 10,
        "operator_id": 10,
        "user_id": 110,
        "pickup_date": "2023-09-29",
        "pickup_time": "07:00 AM",
        "duration": 1,
        "return_date": "2023-10-06",
        "total_price": 350,
        "status": 1,
        "picup_location": "Pickup Location 10",
        "operator_info": {},
        "user_info": {},
        "car_info": {}
      }
    ]
  })

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const retrieveOperator = async () => {

    try {

      const admin = getAdminToken()

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/operator?id=${operatorID}`, {
        headers: {
          Authorization: admin?.token
        }
      })

      if (data.ok) {

        setCurrentOperator(data.data)

      }

    } catch (error) {

      console.log(error);

    }
  }


  useEffect(() => {

    retrieveOperator()

  }, [])

  return (
    <>
      <AdminHeader />
      <div className='flex flex-col gap-10 lg:gap-20 text-slate-600 w-full md:flex-row py-24 lg:py-36 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>

        <div className='flex flex-col md:gap-10 items-center md:items-start w-full'>
          <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-5 w-full md:flex-row md:items-center md:border-b-2 md:pb-5'>
              <h1 className='text-2xl md:order-2 font-medium text-slate-700'>{currentOperator?.name}</h1>
              <Image
                src={currentOperator?.profile ? currentOperator?.profile : '/default-profile.png'}
                width={150} height={150}
                alt={`${currentOperator?.name} Profile`}
                className='rounded-full max-h-[150px] md:order-1 object-cover max-w-[150px] md:max-w-[50px] md:max-h-[50px]'
              />
            </div>
          </div>
          <ul className=' flex-col gap-3 flex items-start w-full'>
            <h1 className='text-xl text-red-700 border-b pb-2'>ID Image</h1>
            {currentOperator.image_id ? <Image
              width={300}
              height={300}
              src={currentOperator.image_id}
              alt='Image ID'
              className='w-5/6 md:w-[250px]'
            /> : <div>Operator Don't have ID</div>}
          </ul>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <h1 className='text-gray-700 text-xl'>Personal Information</h1>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Full Name</label>
            <input readOnly id='name' name='name' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Full Name' value={currentOperator.name} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input readOnly id='email' name='email' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Email' value={currentOperator.email} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="address">Address</label>
            <input readOnly id='address' name='address' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Address' value={currentOperator?.address || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="mobile">Mobile</label>
            <input readOnly id='mobile' name='mobile' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Phone Number' value={currentOperator?.mobile || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="money">Balance</label>
            <input readOnly id='money' name='money' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={`₱ ${currentOperator?.money}` || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="status">Status</label>
            <input readOnly id='status' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={currentOperator?.status} />
          </div>

          <ul className='md:hidden flex-col gap-3 flex items-start w-full'>
            <h1 className='text-xl text-red-700 border-b pb-2'>ID Image</h1>
            {currentOperator.image_id ? <Image
              width={300}
              height={300}
              src={currentOperator.image_id}
              alt='Image ID'
              className='w-5/6'
            /> : <div>User Don't have ID</div>}
          </ul>
          <div className='w-full flex flex-col gap-5 pt-10 overflow-x-auto'>
            <h1>Operator Transactions</h1>
            <table className="text-sm text-left text-gray-800 shadow-md w-full">
              <thead className="text-xs uppercase bg-slate-100 border">
                <tr>
                  <th scope="col" className="px-6 py-3">Pickup Date</th>
                  <th scope="col" className="px-6 py-3">Return Date</th>
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOperator.transactions && currentOperator.transactions.length > 0 ?
                  currentOperator.transactions.map(transac => (
                    <tr className="bg-white border hover:bg-slate-50" key={transac.id}>
                      <td className='px-6 py-3'>
                        <div className='h-5 w-36'>
                          {transac.pickup_date}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='h-5 w-36'>
                          {transac.return_date}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='h-5 w-32'>
                          {transac.duration} {transac.duration > 1 ? 'Days' : 'Day'}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className='h-5 w-40'>
                          {transac.status === 0 ? 'Canceled' : transac.status === 1 ? 'Admin Confirmation' : transac.status === 2 ? 'Operator Confirmation' : 'Confirmed'}
                        </div>
                      </td>
                    </tr>
                  )) :
                  skeleton.map(item => (
                    <tr key={item}>
                      <td className='py-3.5 px-6'>
                        <div className='bg-slate-200 rounded-3xl animate-pulse w-36 h-5'></div>
                      </td>
                      <td className='py-3.5 px-6'>
                        <div className='bg-slate-200 rounded-3xl animate-pulse w-36 h-5'></div>
                      </td>
                      <td className='py-3.5 px-6'>
                        <div className='bg-slate-200 rounded-3xl animate-pulse w-32 h-5'></div>
                      </td>
                      <td className='py-3.5 px-6'>
                        <div className='bg-slate-200 rounded-3xl animate-pulse w-40 h-5'></div>
                      </td>

                    </tr>
                  ))
                }
              </tbody >
            </table >
          </div>
        </div>
      </div>
    </>
  )
}

export default Page