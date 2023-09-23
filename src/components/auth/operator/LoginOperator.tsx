/* eslint-disable react/no-unescaped-entities */
'use client'
import useGlobalStore from '@/lib/state/globalStore'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

const LoginOperator = () => {

    const [eye, setEye] = useState(false)

    const router = useRouter()

    const { isLoading, setIsLoading } = useGlobalStore()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const loginOperator = async (e: any) => {

        e.preventDefault()

        const { email, password } = formData

        if (!email || !password) return alert('Fill up the form')

        try {

            setIsLoading(true)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/operator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    operator: { email, password }
                }),
            });

            // send a request to login

            const data = await response.json();

            if (data.ok) {

                //if successfull yung response then I seset natin yung user sa localStorage

                setIsLoading(false)

                const operator = {
                    data: data.status.data.user,
                    token: response.headers.get('authorization'),
                };

                localStorage.setItem('operator', JSON.stringify(operator))

                router.push('/operator')

                //navigate to /operator/home

            }

            setIsLoading(false)

            alert('Invalid Credentials')

            // if fail it will alert this

        } catch (error) {

            console.log(error);

            alert('Something went wrong.')

        }
    }

    const handleChange = (e: any) => {

        const { name, value } = e.target

        setFormData(prevData => ({ ...prevData, [name]: value }))

        // simple handle change function for objects

    }

    return (
        <div className="flex-col h-screen justify-center lg:py-36 gap-7 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center">
            <h1 className='text-slate-700 text-center text-3xl lg:text-5xl xl:text-6xl md:text-4xl font-light lg:font-extralight'>Operator Login</h1>
            <h2 className='text-slate-600 text-center leading-6 md:leading-8 text-sm md:text-base'>Log in to Your Operator Account and Manage Your Car Fleet</h2>

            <form onSubmit={loginOperator} className='w-full flex flex-col gap-5 text-slate-600 sm:p-6 sm:border sm:w-[26rem] md:w-[28rem] md:p-10 xl:w-[30rem] xl:p-12 xl:gap-6'>
                <input onChange={handleChange} name='email' value={formData.email} type="text" className='w-full border py-1.5 px-3 outline-none' placeholder='Email' />
                <div className='w-full relative'>
                    <input onChange={handleChange} name='password' value={formData.password} type={eye ? 'text' : 'password'} className='w-full border py-1.5 px-3 outline-none' placeholder='Password' />
                    <FontAwesomeIcon onClick={() => setEye(prevState => !prevState)} icon={eye ? faEyeSlash : faEye} width={16} height={16} className='absolute top-3 right-3 hover:text-red-700 cursor-pointer' />
                </div>
                <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} w-full flex items-center justify-center h-12 text-xl rounded-3xl text-white`}>{
                    isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Sign In'
                }</button>
            </form>
            <div className='text-slate-600 flex items-center gap-3'>
                <span>Don't have account yet?</span>
                <Link href={'/signup/operator'} className='text-red-700 hover:text-red-500'>Sign Up</Link>
            </div>
            <Link href={'/login/user'} className='text-red-700 hover:text-red-500'>Login as User</Link>
        </div>
    )
}

export default LoginOperator