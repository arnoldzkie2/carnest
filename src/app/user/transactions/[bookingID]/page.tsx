/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import { Booking } from '@/lib/state/globalStore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Props {
    params: {
        bookingID: string
    }
}

const Page = ({ params }: Props) => {

    const [bookingInfo, setBookingInfo] = useState<Booking>({
        id: 1,
        operator_id: 1,
        user_id: 1,
        pickup_date: '09-19-2023',
        pickup_time: '15:00',
        duration: 1,
        return_date: '09-20-2023',
        total_price: 50,
        status: 1,
        picup_location: 'Looc',
        car_info: '',
        user_info: '',
        operator_info: ''
    })

    const getBookingInfo = async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking?id=${params.bookingID}`)

            if (data.ok) {

                setBookingInfo(data.data)

            }

        } catch (error) {

            console.log(error);

        }
    }

    useEffect(() => {

        getBookingInfo()

    }, [])

    return (
        <>
            <UserHeader />
            <div className='py-24 flex flex-col px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>
                ID: {params.bookingID}

            </div>
            <UserFooter />
        </>
    )
}

export default Page