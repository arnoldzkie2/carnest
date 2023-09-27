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
    userID: string
  }
}

const Page = ({ params }: Props) => {

  const { userID } = params

  const { getAdminToken } = useAdminStore()

  const [currentUser, setCurrentUser] = useState<{
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
    id: Number(userID),
    name: '',
    mobile: '',
    email: '',
    status: '',
    profile: '',
    address: '',
    money: 0,
    image_id: '',
    transactions: []
  })

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const retrieveUser = async () => {

    try {

      const admin = getAdminToken()

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user?id=${userID}`, {
        headers: {
          Authorization: admin?.token
        }
      })

      if (data.ok) {

        setCurrentUser(data.data)

      }

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    retrieveUser()

  }, [])

  return (
    <>
      <AdminHeader />
      <div className='flex flex-col gap-10 lg:gap-20 text-slate-600 w-full md:flex-row py-24 lg:py-36 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>

        <div className='flex flex-col md:gap-10 items-center md:items-start w-full'>
          <div className='flex flex-col gap-5 items-center'>
            <div className='flex flex-col gap-5 w-full md:flex-row md:items-center md:border-b-2 md:pb-5'>
              {currentUser.name ? <h1 className='text-2xl md:order-2 font-medium text-slate-700'>Arnold</h1>
                : <span className='w-36 h-6 rounded-3xl bg-slate-200 animate-pulse md:order-2'></span>}              <Image
                src={currentUser?.profile ? currentUser?.profile : '/default-profile.png'}
                width={150} height={150}
                alt={`${currentUser?.name} Profile`}
                className='rounded-full max-h-[150px] md:order-1 object-cover max-w-[150px] md:max-w-[50px] md:max-h-[50px]'
              />
            </div>
          </div>
          <ul className=' flex-col gap-3 flex items-start w-full'>
            <h1 className='text-xl text-red-700 border-b pb-2'>ID Image</h1>
            {currentUser.image_id ? <Image
              width={300}
              height={300}
              src={currentUser.image_id}
              alt='Image ID'
              className='w-5/6 md:w-[250px]'
            /> : <div>User Don't have ID</div>}
          </ul>
        </div>

        <div className='w-full flex flex-col gap-5'>
          <h1 className='text-gray-700 text-xl'>Personal Information</h1>
          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Full Name</label>
            <input readOnly id='name' name='name' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Full Name' value={currentUser.name} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email">Email</label>
            <input readOnly id='email' name='email' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Email' value={currentUser.email} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="address">Address</label>
            <input readOnly id='address' name='address' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Address' value={currentUser?.address || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="mobile">Mobile</label>
            <input readOnly id='mobile' name='mobile' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Phone Number' value={currentUser?.mobile || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="money">Balance</label>
            <input readOnly id='money' name='money' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={`₱ ${currentUser?.money}` || ''} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="status">Status</label>
            <input readOnly id='status' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={currentUser?.status} />
          </div>

          <ul className='md:hidden flex-col gap-3 flex items-start w-full'>
            <h1 className='text-xl text-red-700 border-b pb-2'>ID Image</h1>
            {currentUser.image_id ? <Image
              width={300}
              height={300}
              src={currentUser.image_id}
              alt='Image ID'
              className='w-5/6'
            /> : <div>User Don't have ID</div>}
          </ul>
          <div className='w-full flex flex-col gap-5 pt-10 overflow-x-auto'>
            <h1>User Transactions</h1>
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
                {currentUser.transactions && currentUser.transactions.length > 0 ?
                  currentUser.transactions.map(transac => (
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