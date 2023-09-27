/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import useGlobalStore from '@/lib/state/globalStore'
import useOperatorStore from '@/lib/state/operatorStore'
import { faEllipsis, faEye, faPenSquare, faSpinner, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const OperatorCars = () => {

    const { selectedID, operation, currentPage, itemsPerPage, setCurrentPage, openOperation, closeOperation, isLoading, setIsLoading } = useGlobalStore()

    const { cars, getCars, setCars, getOperatorToken } = useOperatorStore()

    const skeleton = [1, 2, 3, 4, 5]

    const [searchQuey, setSearchQuery] = useState('')

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const searchedCars = cars.filter(car => car.car_name.toUpperCase().includes(searchQuey.toUpperCase()))

    const filteredTable = searchedCars.slice(startIndex, endIndex);

    const totalPages = Math.ceil((cars.length || 0) / itemsPerPage);

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

    const deleteCar = async (e: any, ID: number) => {

        try {

            const operator = getOperatorToken()

                setIsLoading(true)

                const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/car?id=${ID}`, {
                    headers: {
                        Authorization: operator?.token
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

    }, [])

    return (
        <div className='py-24 px-5 h-screen sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col w-full justify-center items-center'>
            <div className='flex items-center w-full md:w-4/5'>
                <input value={searchQuey} onChange={(e) => {
                    setCurrentPage(1)
                    setSearchQuery(e.target.value)
                }} type="text" placeholder='Search Car (name)' className='py-2.5 px-4 w-full border outline-none' />
                <Link href={'/operator/newcar'} className='bg-red-700 hover:bg-red-500 text-white w-40 flex items-center justify-center py-2.5'>Add Car</Link>
            </div>
            <div className='flex flex-col w-full md:w-4/5 gap-5'>
                <div className='w-full overflow-x-auto pb-28'>
                    <table className="text-sm text-left text-gray-800 shadow-md w-full">
                        <thead className="text-xs uppercase bg-slate-100 border">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Brand</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTable && filteredTable.length > 0 ?
                                filteredTable.map(car => (
                                    <tr className="bg-white border hover:bg-slate-50" key={car.id}>
                                        <td className='px-6 py-3'>
                                            <div className='h-5 w-36'>
                                                {car.car_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-36'>
                                                {car.car_brand}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-32'>
                                                {car.car_type}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-40'>
                                                {car.price}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className='h-5 w-40'>
                                                {car.reserved ? 'Reserved' : 'Available'}
                                            </div>
                                        </td>
                                        <td className='py-3 relative px-6'>
                                            <FontAwesomeIcon icon={faEllipsis} className='h-5 w-10 cursor-pointer text-black' onClick={() => openOperation(car.id)} />
                                            <ul className={`${operation && selectedID === car.id ? 'block' : 'hidden'} absolute bg-white p-3 gap-1 z-20 w-24 shadow-lg border flex flex-col text-gray-600`}>
                                                <Link href={`/operator/cars/${car.id}`} className='flex mb-1 justify-between items-center cursor-pointer hover:text-green-500'>View <FontAwesomeIcon icon={faEye} /></Link>
                                                <Link href={`/operator/updatecar/${car.id}`} className='flex mb-1 justify-between items-center cursor-pointer hover:text-blue-500'>Update <FontAwesomeIcon icon={faPenSquare} /></Link>
                                                <button disabled={isLoading} onClick={(e: any) => deleteCar(e, car.id)} className='flex mb-1 justify-between items-center cursor-pointer hover:text-red-500'>{isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' /> : 'Delete'}{!isLoading && <FontAwesomeIcon icon={faTrashCan} />}</button>
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
        </div>
    )
}

export default OperatorCars