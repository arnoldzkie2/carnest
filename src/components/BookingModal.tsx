'use client'
import useGlobalStore, { Booking } from '@/lib/state/globalStore'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

const BookingModal = () => {

    const { selectedBooking, closeViewBooking } = useGlobalStore()

    const book: Booking = selectedBooking!

    return (
        <div className='w-screen h-screen z-50 bg-black bg-opacity-30 fixed top-0 left-0 flex'>
            <div className='hidden sm:w-1/4 sm:flex md:w-1/2 lg:w-full' onClick={closeViewBooking} title='Click to close'>
            </div>
            <div className='w-full h-full flex flex-col gap-3 relative bg-white p-5 overflow-y-auto'>
                <FontAwesomeIcon onClick={closeViewBooking} icon={faXmark} className='absolute right-5 top-5 text-xl cursor-pointer' width={20} height={20} />
                <div className='flex flex-col gap-2 w-full p-5 border-b'>
                    <div>BOOKING ID: <strong>{book.id}</strong></div>
                    <div>CAR ID: <strong>{book.car_info.id}</strong></div>
                    <div>OPERATOR ID: <strong>{book.operator_id}</strong></div>
                    <div>USER ID: <strong>{book.user_id}</strong></div>
                    <div>STATUS: <strong>{!book.status ? 'Canceled' : book.status === 1 ? 'Admin Pending (Waiting for admin to confirm)' : book.status === 2 ? 'Operator Pending (Waiting for operator to confirm)' : 'Confirmed'}</strong></div>
                </div>
                <div className='flex flex-col gap-2 w-full p-5 border-b'>
                    <div>Duration: <strong>{book.duration} {book.duration > 1 ? 'Days' : 'Day'}</strong></div>
                    <div>Pickup Date: <strong>{book.pickup_date}</strong></div>
                    <div>Pickup Time: <strong>{book.pickup_time}</strong></div>
                    <div>Return Date: <strong>{book.return_date}</strong></div>
                    <div>Transaction Price: <strong>₱{book.total_price}</strong></div>
                    <div>Transaction Fee: <strong>₱{book.total_price * 0.15}</strong></div>
                    <div>Total Price: <strong>₱{book.total_price - book.total_price * 0.15}</strong></div>
                </div>
                <div className='flex gap-10 p-5 justify-around'>

                    <div className='flex flex-col gap-3'>
                        <h1>Customer Info</h1>
                        <div className='text-sm sm:text-base' >Name: <strong>{book.user_info.name}</strong></div>
                        <div className='text-sm sm:text-base' >Email: <strong>{book.user_info.email}</strong></div>
                        <div className='text-sm sm:text-base' >Mobile: <strong>{book.user_info.mobile}</strong></div>
                        <div className='text-sm sm:text-base' >Status: <strong>{book.user_info.status}</strong></div>
                        <div className='text-sm sm:text-base' >Profile:</div>
                        <Image
                            src={book.user_info.profile || '/default-profile.png'}
                            alt={book.user_info.name}
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1>Operator Info</h1>
                        <div className='text-sm sm:text-base' >Name: <strong>{book.operator_info.name}</strong></div>
                        <div className='text-sm sm:text-base' >Email: <strong>{book.operator_info.email}</strong></div>
                        <div className='text-sm sm:text-base' >Mobile: <strong>{book.operator_info.mobile}</strong></div>
                        <div className='text-sm sm:text-base' >Status: <strong>{book.operator_info.status}</strong></div>
                        <div className='text-sm sm:text-base' >Profile:</div>
                        <Image
                            src={book.operator_info.profile || '/default-profile.png'}
                            alt={book.operator_info.name}
                            width={100}
                            height={100}
                            className='rounded-full'
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default BookingModal