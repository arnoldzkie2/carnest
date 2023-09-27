/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useUserStore from '@/lib/state/userStore'
import useGlobalStore, { Booking } from '@/lib/state/globalStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { faEllipsis, faEye, faPenToSquare, faSpinner, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const UserTransactions = () => {

    const { user, getToken } = useUserStore()

    const [booking, setBooking] = useState<Booking[]>([])

    const { operation, selectedID, viewBooking, openOperation, closeOperation, isLoading, setIsLoading, itemsPerPage, currentPage, setCurrentPage } = useGlobalStore()

    const skeleton = [1, 2, 3, 4, 5]

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredTable = booking.slice(startIndex, endIndex);

    const totalPages = Math.ceil((booking.length || 0) / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    // Function to handle previous page click
    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const cancelBooking = async (e: any, bookingID: number) => {

        e.preventDefault()

        try {

            const user = getToken()
            setIsLoading(true)
            const { data } = await axios.delete(`/${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking?id=${bookingID}`, {
                headers: {
                    Authorization: user?.token
                }
            })

            if (data.ok) {
                setIsLoading(true)
                alert('Success')

            }

        } catch (error) {
            setIsLoading(false)

            console.log(error);

            alert('Something went wrong')

        }

    }

    const getBookings = async () => {

        try {

            const user = getToken()

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking`, {
                headers: {
                    Authorization: user?.token
                }
            })

            if (data.ok) {

                setBooking(data.data)

            }

        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {

        getBookings()

    }, [])

    return (
        <div className='flex flex-col gap-10 lg:gap-20 text-slate-600 w-full md:flex-row py-24 lg:py-36 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>

            <div className='flex flex-col md:gap-10 items-center md:items-start w-full md:w-1/2'>
                <div className='flex flex-col gap-5 items-center'>
                    <div className='flex flex-col gap-5 w-full md:flex-row md:items-center md:border-b-2 md:pb-5'>
                        <h1 className='text-2xl md:order-2 font-medium text-slate-700'>{user?.name}</h1>
                        <Image
                            src={user?.profile ? user?.profile : '/default-profile.png'}
                            width={150} height={150}
                            alt={`${user?.name} Profile`}
                            className='rounded-full max-h-[150px] md:order-1 object-cover max-w-[150px] md:max-w-[50px] md:max-h-[50px]'
                        />
                    </div>

                </div>
                {user?.status === 'pending' ? <div className='hidden md:flex'>Your Account is Pending</div> : <ul className='flex-col gap-2 md:flex hidden w-full'>
                    <h1 className='text-xl text-red-700 border-b pb-2'>Account</h1>
                    <Link href={'/user/profile'} className='hover:text-red-700'>
                        My Profile
                    </Link>
                </ul>}
            </div>

            <div className='w-full flex flex-col gap-5'>
                <h1 className='text-2xl text-red-700 font-medium border-b pb-2'>My Bookings</h1>
                <p>This page shows all the bookings that you have.</p>
                <div className='w-full overflow-x-auto pb-28 pr-10'>
                    <table className="text-sm text-left text-gray-800 shadow-md w-full">
                        <thead className="text-xs uppercase bg-slate-100 border">
                            <tr>
                                <th scope="col" className="px-6 py-3">Pickup Date</th>
                                <th scope="col" className="px-6 py-3">Return Date</th>
                                <th scope="col" className="px-6 py-3">Duration</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable && filteredTable.length > 0 ?
                                filteredTable.map(transac => (
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
                                        <td className='py-3 relative px-6'>
                                            <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer text-black' onClick={() => openOperation(transac.id)} />
                                            <ul className={`${operation && selectedID === transac.id ? 'block' : 'hidden'} absolute bg-white p-3 gap-1 z-20 w-24 shadow-lg border flex flex-col text-gray-600`}>
                                                <button onClick={() => viewBooking(transac)} className='flex mb-1 justify-between items-center cursor-pointer hover:text-green-500'>View <FontAwesomeIcon icon={faEye} /></button>
                                                <button disabled={isLoading} onClick={(e: any) => cancelBooking(e, transac.id)} className='flex mb-1 justify-between items-center cursor-pointer hover:text-red-600'>{isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Cancel'} {!isLoading && <FontAwesomeIcon icon={faTrashCan} />}</button>
                                                <li className='flex mb-1 justify-between items-center cursor-pointer hover:text-black pt-2 border-t border-r-gray-700' onClick={closeOperation}>Close <FontAwesomeIcon icon={faXmark} /></li>
                                            </ul>
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
                                        <td className='py-3.5 px-6'>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-10 h-5'></div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody >
                    </table >
                </div>
                <div className='flex items-center justify-end w-full gap-5 pr-10'>
                    <span>{currentPage} of {totalPages}</span>
                    <button className={`${currentPage === 1 ? 'bg-white text-slate-700 border' : 'bg-red-700 text-white hover:bg-red-500'} px-6 py-1.5 rounded-3xl`} onClick={previousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <button className={`${currentPage === totalPages ? 'bg-white text-slate-700 border' : 'bg-red-700 text-white hover:bg-red-500'} px-6 py-1.5 rounded-3xl`} onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
            {user?.status === 'pending' ? <div className='md:hidden'>Your Account is Pending</div> : <ul className='flex flex-col gap-2 md:hidden'>
                <h1 className='text-xl text-red-700 border-b pb-2'>Account</h1>
                <Link href={'/user/profile'} className='hover:text-red-700'>
                    My Profile
                </Link>
            </ul>}

        </div>
    )

}

export default UserTransactions