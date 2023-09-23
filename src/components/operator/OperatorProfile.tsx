/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useUserStore, { User } from '@/lib/state/userStore'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UploadButton } from '@/lib/utils/uploadthing'
import Link from 'next/link'
import useGlobalStore from '@/lib/state/globalStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import useOperatorStore, { Operator } from '@/lib/state/operatorStore'

const OperatorProfile = () => {


    const { operator, getOperator } = useOperatorStore()

    const { isLoading, setIsLoading } = useGlobalStore()

    const [formData, setFormData] = useState<Operator>({
        id: 0,
        image_id: '',
        name: '',
        profile: '',
        address: '',
        email: '',
        mobile: '',
        status: '',
        money: 0
    })

    const handleChange = (e: any) => {

        console.log(formData);

        const { name, value } = e.target

        setFormData(prevData => ({ ...prevData, [name]: value }))

    }

    useEffect(() => {

        if (operator?.name) {

            setFormData(operator)

        }

    }, [operator])

    const updateUser = async () => {

        console.log(formData);

        const { image_id, address, name, email, profile, mobile } = formData

        try {

            setIsLoading(true)

            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${operator?.id}`, {
                image_id, address, name, email, profile, mobile
            })

            if (data.ok) {

                setIsLoading(false)

                alert('Success')

                getOperator()

            }

        } catch (error) {

            setIsLoading(false)

            console.log(error);

        }

    }



    return (

        <div className='flex flex-col gap-10 lg:gap-20 text-slate-600 w-full md:flex-row py-24 lg:py-36 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>

            <div className='flex flex-col md:gap-10 items-center md:items-start w-full'>
                <div className='flex flex-col gap-5 items-center'>
                    <div className='flex flex-col gap-5 items-center w-full md:flex-row md:items-center md:border-b-2 md:pb-5'>
                        <h1 className='text-2xl md:order-2 font-medium text-slate-700'>{operator?.name}</h1>
                        <Image
                            src={formData?.profile ? formData?.profile : '/default-profile.png'}
                            width={150} height={150}
                            alt={`${formData?.name} Profile`}
                            className='rounded-full max-h-[150px] md:order-1 object-cover max-w-[150px] md:max-w-[50px] md:max-h-[50px]'
                        />
                    </div>
                    <div className='flex flex-col gap-3 w-full items-center md:items-start'>
                        <h1 className='text-xl text-red-700 border-b pb-2 w-full'>Profile</h1>
                        <UploadButton
                            endpoint="userProfile"
                            onClientUploadComplete={(res) => {

                                if (res) {

                                    setFormData(prevData => ({ ...prevData, profile: res[0].url }))
                                }
                                alert("Upload Completed")
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.

                                alert('Something went wrong')
                            }}
                            appearance={{
                                button: "bg-red-700 px-6 py-1.5 rounded-3xl",
                                allowedContent: "hidden"
                            }}
                        />
                    </div>
                </div>
                <ul className='flex-col hidden gap-3 md:flex items-start w-1/2'>
                    <h1 className='text-xl text-red-700 border-b pb-2 w-full'>ID Image</h1>
                    {formData.image_id ? <Image
                        width={300}
                        height={300}
                        src={formData.image_id}
                        alt='Image ID'
                        className='w-5/6 md:w-[250px]'
                    /> : <div>Upload ID Image</div>}
                    <UploadButton
                        endpoint="userProfile"
                        onClientUploadComplete={(res) => {

                            if (res) {

                                setFormData(prevData => ({ ...prevData, image_id: res[0].url }))
                            }
                            alert("Upload Completed")
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.

                            alert('Something went wrong')
                        }}
                        appearance={{
                            button: "bg-red-700 px-6 py-1.5 rounded-3xl",
                            allowedContent: "hidden"
                        }}
                    />
                </ul>
                {operator?.status === 'pending' ? <div className='hidden md:flex'>Your Account is Pending</div> : <ul className='flex-col gap-2 md:flex hidden w-1/2'>
                    <h1 className='text-xl text-red-700 border-b pb-2'>Rentals</h1>
                    <Link href={'/operator/transactions'} className='hover:text-red-700'>
                        My Bookings
                    </Link>
                    <Link href={'/operator'} className='hover:text-red-700'>
                        My Cars
                    </Link>
                </ul>}
            </div>

            <div className='w-full flex flex-col gap-5'>
                <h1 className='text-gray-700 text-xl'>Personal Information</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Full Name</label>
                    <input onChange={handleChange} id='name' name='name' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Full Name' value={formData.name} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} id='email' name='email' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Email' value={formData.email} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="address">Address</label>
                    <input onChange={handleChange} id='address' name='address' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Address' value={formData?.address || ''} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={handleChange} id='mobile' name='mobile' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Phone Number' value={formData?.mobile || ''} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="money">Balance</label>
                    <input onChange={handleChange} readOnly id='money' name='money' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={`₱ ${formData?.money}` || ''} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="status">Status</label>
                    <input readOnly id='status' type="text" className='py-2 px-3 border outline-none rounded-md w-full' placeholder='Total Balance' value={formData?.status} />
                </div>

                <ul className='md:hidden flex-col gap-3 flex items-start w-full'>
                    <h1 className='text-xl text-red-700 border-b pb-2 w-full'>ID Image</h1>
                    {formData.image_id ? <Image
                        width={300}
                        height={300}
                        src={formData.image_id}
                        alt='Image ID'
                        className='w-5/6'
                    /> : <div>Upload ID Image</div>}
                    <UploadButton
                        endpoint="userProfile"
                        onClientUploadComplete={(res) => {

                            if (res) {

                                setFormData(prevData => ({ ...prevData, image_id: res[0].url }))
                            }
                            alert("Upload Completed")
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.

                            alert('Something went wrong')
                        }}
                        appearance={{
                            button: "bg-red-700 px-6 py-1.5 rounded-3xl",
                            allowedContent: "hidden"
                        }}
                    />
                </ul>

                <button disabled={isLoading} onClick={updateUser} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg self-start text-white py-2 px-10 rounded-3xl`}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Save'}
                </button>
            </div>

            {operator?.status === 'pending' ? <div className='md:hidden'>Your Account is Pending</div> : <ul className='flex flex-col gap-2 md:hidden'>
                <h1 className='text-xl text-red-700 border-b pb-2'>Rentals</h1>
                <Link href={'/operator/transactions'} className='hover:text-red-700'>
                    My Bookings
                </Link>
                <Link href={'/operator'} className='hover:text-red-700'>
                    My Cars
                </Link>
            </ul>}

        </div>

    )
}

export default OperatorProfile