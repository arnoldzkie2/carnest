/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useAdminStore from '@/lib/state/adminStore'
import useGlobalStore from '@/lib/state/globalStore'
import { faEllipsis, faEye, faPenSquare, faSpinner, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const PendingOperator = () => {

    const { selectedID, operation, currentPage, itemsPerPage, setCurrentPage, openOperation, closeOperation, isLoading, setIsLoading } = useGlobalStore()

    const { operators, getAdminToken, getOperators, } = useAdminStore()

    const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [searchQuey, setSearchQuery] = useState('')

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const searchedUser = operators.filter(user => user.name.toUpperCase().includes(searchQuey.toUpperCase()))

    const filteredTable = searchedUser.slice(startIndex, endIndex);

    const totalPages = Math.ceil((operators.length || 0) / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const deleteOperator = async (e: any, ID: number) => {

        e.preventDefault()

        try {

            const admin = getAdminToken()

            setIsLoading(true)

            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin?id=${ID}`, {
                headers: {
                    Authorization: admin?.token
                }
            })

            if (data.ok) {
                setIsLoading(false)
                alert('Success')
            }

        } catch (error) {

            setIsLoading(false)

            console.log(error)

        }
    }

    useEffect(() => {

        getOperators()

    }, [])

    return (
        <div className='pt-32 pb-10 px-5 h-screen sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-full items-center'>
            <div className='flex items-center w-full md:w-4/5'>
                <input value={searchQuey} onChange={(e) => {
                    setCurrentPage(1)
                    setSearchQuery(e.target.value)
                }} type="text" placeholder='Search User (name)' className='py-2.5 px-4 w-full border outline-none' />
                <Link href={'/admin/operator/create'} className='bg-red-700 cursor-pointer hover:bg-red-500 text-white w-40 flex items-center justify-center py-2.5'>New Operator</Link>
            </div>
            <div className='flex flex-col w-full md:w-4/5 gap-5'>
                <div className='w-full overflow-x-auto pb-28'>
                    <table className="text-sm text-left text-gray-800 shadow-md w-full">
                        <thead className="text-xs uppercase bg-slate-100 border">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Mobile</th>
                                <th scope="col" className="px-6 py-3">Address</th>
                                <th scope="col" className="px-6 py-3">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable && filteredTable.length > 0 ?
                                filteredTable.map(operator => (
                                    <tr className="bg-white border hover:bg-slate-50" key={operator.id}>
                                        <td className='px-6 py-3'>
                                            <div className='h-5 w-36 flex items-center gap-3'>
                                                <Image src={operator.profile || '/default-profile.png'} width={20} height={20} alt='operator Profile' className='rounded-full' />
                                                {operator.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-36'>
                                                {operator.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-40'>
                                                {operator.mobile}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-52'>
                                                {operator.address}
                                            </div>
                                        </td>
                                        <td className='py-3 relative px-6'>
                                            <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg text-white py-2 px-10 self-center rounded-3xl`}>
                                                {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Create'}
                                            </button>
                                        </td>
                                    </tr>
                                )) :
                                skeleton.map(item => (
                                    <tr key={item}>
                                        <td className='py-3.5 px-6 flex items-center gap-3'>

                                            <div className='bg-slate-200 rounded-full animate-pulse w-5 h-5'></div>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-36 h-5'></div>
                                        </td>
                                        <td className='py-3.5 px-6'>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-36 h-5'></div>
                                        </td>
                                        <td className='py-3.5 px-6'>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-40 h-5'></div>
                                        </td>
                                        <td className='py-3.5 px-6'>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-52 h-5'></div>
                                        </td>
                                        <td className='py-3.5 px-6'>
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-28 h-5'></div>
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
        </div>
    )
}

export default PendingOperator