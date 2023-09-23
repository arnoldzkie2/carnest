'use client'
import useGlobalStore from '@/lib/state/globalStore'
import useUserStore from '@/lib/state/userStore'
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'

const DepositModal = () => {

    const { toggleDeposit, getUser, user } = useUserStore()

    const [money, setMoney] = useState('')

    const { isLoading, setIsLoading } = useGlobalStore()

    const DepositMoney = async () => {

        try {

            if (user?.money) {

                const newBalance = Number(money) + user.money

                setIsLoading(true)

                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${user?.id}`, {
                    money: newBalance
                })

                if (data.ok) {

                    alert('Success')
                    setMoney('')
                    toggleDeposit()
                    getUser()

                }

            }

        } catch (error) {

            setIsLoading(false)
            setMoney('')
            toggleDeposit()
            console.log(error);

            alert('Something went wrong')

        }

    }

    return (

        <div className='fixed top-0 z-20 left-0 w-screen bg-black bg-opacity-40 h-screen grid place-items-center'>

            <div className='flex w-96 p-5 flex-col gap-5 bg-white shadow-lg rounded-md'>

                <input type="number" value={money} onChange={(e) => setMoney(e.target.value)} className='border outline-none px-3 py-1.5' placeholder='Amount' />
                <div className='flex w-full items-center gap-5'>
                    <button disabled={isLoading} onClick={DepositMoney} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg w-full self-start text-white py-2 px-10 rounded-3xl`}>
                        {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Deposit'}
                    </button>
                    <button onClick={toggleDeposit} className='px-10 py-2 border rounded-3xl w-full hover:bg-slate-100'>Close</button>
                </div>
            </div>

        </div>
    )
}

export default DepositModal