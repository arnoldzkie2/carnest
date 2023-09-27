/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useAdminStore from '@/lib/state/adminStore'
import useGlobalStore from '@/lib/state/globalStore'
import { faCheck, faEllipsis, faEye, faPenSquare, faSpinner, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const TransactionTable = () => {

    const { selectedID, operation, currentPage, itemsPerPage, viewBooking, setCurrentPage, openOperation, closeOperation, isLoading, setIsLoading } = useGlobalStore()

    const { transactions, getAdminToken, getTransactions } = useAdminStore()

    const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const [pending, setPending] = useState('')

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const selectedTransaction = pending ? transactions.filter(book => book.status === Number(pending)) : transactions

    const filteredTable = selectedTransaction.slice(startIndex, endIndex);

    const totalPages = Math.ceil((transactions.length || 0) / itemsPerPage);

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

    const approveBooking = async (e: any, ID: number) => {

        e.preventDefault()

        try {

            const admin = getAdminToken()

            setIsLoading(true)

            const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking`, {
                status: 2
            }, {
                headers: {
                    Authorization: admin?.token
                },
                params: {
                    id: ID
                }
            })

            if (data.ok) {
                setIsLoading(false)
            }

        } catch (error) {
            setIsLoading(false)

            console.log(error);

        }

    }

    const cancelBooking = async (e: any, bookingID: number) => {

        e.preventDefault()

        try {

            const admin = getAdminToken()

            setIsLoading(true)

            const { data } = await axios.delete(`/${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking?id=${bookingID}`, {
                headers: {
                    Authorization: admin?.token
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

    useEffect(() => {

        getTransactions()

    }, [])

    return (
        <div className='pt-32 pb-10 px-5 h-screen sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-full items-center'>
            <div className='flex items-center w-full md:w-4/5'>
                <Link href={'/admin/operator/'} className='bg-red-700 cursor-pointer hover:bg-red-500 text-white w-40 flex items-center justify-center py-2.5'>Operator</Link>
                <select value={String(pending)} className='w-full px-3 py-3' onChange={(e) => setPending(e.target.value)}>
                    <option value="">All Transactions</option>
                    <option value="0">Status: Canceled</option>
                    <option value="1">Status: Pending</option>
                    <option value="2">Status: Operator Pending</option>
                    <option value="3">Status: Confirmed</option>
                </select>
                <Link href={'/admin/user/'} className='bg-red-700 cursor-pointer hover:bg-red-500 text-white w-40 flex items-center justify-center py-2.5'>User</Link>

            </div>
            <div className='flex flex-col w-full md:w-4/5 gap-5'>
                <div className='w-full overflow-x-auto pb-28'>
                    <table className="text-sm text-left text-gray-800 shadow-md w-full">
                        <thead className="text-xs uppercase bg-slate-100 border">
                            <tr>
                                <th scope="col" className="px-6 py-3">Pickup Date</th>
                                <th scope="col" className="px-6 py-3">Pickup Time</th>
                                <th scope="col" className="px-6 py-3">Return Date</th>
                                <th scope="col" className="px-6 py-3">Total Price</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable && filteredTable.length > 0 ?
                                filteredTable.map(transaction => (
                                    <tr className="bg-white border hover:bg-slate-50" key={transaction.id}>
                                        <td className='px-6 py-3'>
                                            <div className='h-5 w-36 flex items-center gap-3'>
                                                {transaction.pickup_date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-36'>
                                                {transaction.pickup_time}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-40'>
                                                {transaction.return_date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-52'>
                                                {transaction.total_price}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-52'>
                                                {transaction.status === 1 ? 'Pending' : transaction.status === 2 ? 'Operator Confirmation' : 'Success'}
                                            </div>
                                        </td>
                                        <td className='py-3 relative px-6'>
                                            <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer text-black' onClick={() => openOperation(transaction.id)} />
                                            <ul className={`${operation && selectedID === transaction.id ? 'block' : 'hidden'} absolute bg-white p-3 gap-1 z-20 w-24 shadow-lg border flex flex-col text-gray-600`}>
                                                {transaction.status === 1 && <div onClick={(e) => approveBooking(e, transaction.id)} className='cursor-pointer flex items-center justify-between hover:text-blue-600 text-left'>
                                                    Confirm   <FontAwesomeIcon icon={faCheck} />
                                                </div>}
                                                {!isLoading && < button onClick={() => viewBooking(transaction)} className='flex mb-1 justify-between items-center cursor-pointer hover:text-green-500'>View <FontAwesomeIcon icon={faEye} /></button>}
                                                <button disabled={isLoading} onClick={(e: any) => cancelBooking(e, transaction.id)} className='flex mb-1 justify-between items-center cursor-pointer hover:text-red-600'>{isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Cancel'} {!isLoading && <FontAwesomeIcon icon={faTrashCan} />}</button>
                                                <li className='flex mb-1 justify-between items-center cursor-pointer hover:text-black pt-2 border-t border-r-gray-700' onClick={closeOperation}>Close <FontAwesomeIcon icon={faXmark} /></li>
                                            </ul>
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
                                            <div className='bg-slate-200 rounded-3xl animate-pulse w-52 h-5'></div>
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
        </div >
    )
}

export default TransactionTable