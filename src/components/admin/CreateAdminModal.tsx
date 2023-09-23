/* eslint-disable react-hooks/exhaustive-deps */
import useAdminStore from '@/lib/state/adminStore'
import useGlobalStore from '@/lib/state/globalStore'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CreateAdminModal = () => {

    const { getAdminToken, getAllAdmin, toggleNewAdmin } = useAdminStore()

    const { isLoading, setIsLoading } = useGlobalStore()

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const createAdmin = async (e: any) => {

        e.preventDefault()

        try {

            const admin = getAdminToken()

            setIsLoading(true)

            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin`, {
                name: formData?.name,
                email: formData?.email
            }, {
                headers: {
                    Authorization: admin?.token
                }
            })

            if (data.ok) {

                setIsLoading(false)
                alert('Success')
                getAllAdmin()

            }

        } catch (error) {

            setIsLoading(false)
            toggleNewAdmin()
            console.log(error);

        }

    }

    return (
        <div className='fixed top-0 z-40 left-0 w-screen h-screen bg-black bg-opacity-30 grid place-items-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44'>
            <form className='relative p-10 flex flex-col gap-5 w-96 bg-white' onSubmit={createAdmin}>
                <FontAwesomeIcon onClick={toggleNewAdmin} icon={faXmark} className='absolute right-4 top-4 cursor-pointer' width={16} height={16} />
                <h1 className='w-full text-center text-slate-800 font-black text-xl'>Create Admin</h1>
                <input required type="text" className='outline-none border px-3 py-1.5' placeholder='Name' value={formData?.name} onChange={(e) => setFormData(prevData => ({ ...prevData, name: e.target.value }))} />
                <input required type="text" className='outline-none border px-3 py-1.5' placeholder='Email' value={formData?.email} onChange={(e) => setFormData(prevData => ({ ...prevData, email: e.target.value }))} />
                <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg self-start text-white py-2 px-10 rounded-3xl`}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default CreateAdminModal