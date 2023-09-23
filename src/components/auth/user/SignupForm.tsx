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

const SignupForm = () => {

    const [eye, setEye] = useState(false)

    const router = useRouter()

    const { isLoading, setIsLoading } = useGlobalStore()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const registerUser = async (e: any) => {

        e.preventDefault()

        try {

            const { name, email, password, confirm_password } = formData

            if (!name || !email || !password || !confirm_password) return alert('Fill up the form')
            if (name.length < 3) return alert('Name is to short')
            if (email.length < 3) return alert('Email is to short')
            if (password.length < 3) return alert('Password is to short')
            if (password !== confirm_password) return alert('Password did not matched')

            setIsLoading(true)

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/signup`, {

                user: { name, email, password }

            })

            if (data.status.code === 200) {

                setIsLoading(false)

                router.push('/login/user')

            }

        } catch (error) {

            console.log(error);

            alert('Something went wrong')

        }
    }


    const handleChange = (e: any) => {

        const { name, value } = e.target

        setFormData(prevData => ({ ...prevData, [name]: value }))

        // simple handle change function for objects

    }

    return (
        <div className="flex-col h-screen justify-center lg:py-36 gap-7 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex items-center">
            <h1 className='text-slate-700 text-center text-3xl lg:text-5xl xl:text-6xl md:text-4xl font-light lg:font-extralight'>Join CarNest: Get Started Today</h1>
            <h2 className='text-slate-600 text-center leading-6 md:leading-8 text-sm md:text-base'>Sign Up and Start Your Journey Towards Easy and Affordable Car Rentals</h2>

            <form onSubmit={registerUser} className='w-full flex flex-col gap-5 text-slate-600 sm:p-6 sm:border sm:w-[26rem] md:w-[28rem] md:p-10 xl:w-[30rem] xl:p-12 xl:gap-6'>
                <input onChange={handleChange} name='name' value={formData.name} type="text" className='w-full border py-1.5 px-3 outline-none' placeholder='Full Name' />
                <input onChange={handleChange} name='email' value={formData.email} type="text" className='w-full border py-1.5 px-3 outline-none' placeholder='Email' />
                <div className='w-full relative flex items-center gap-5'>
                    <input onChange={handleChange} name='password' value={formData.password} type={eye ? 'text' : 'password'} className='w-full border py-1.5 px-3 outline-none' placeholder='Password' />
                    <input onChange={handleChange} name='confirm_password' value={formData.confirm_password} type={eye ? 'text' : 'password'} className='w-full border py-1.5 px-3 outline-none' placeholder='Confirm Password' />
                    <FontAwesomeIcon onClick={() => setEye(prevState => !prevState)} icon={eye ? faEyeSlash : faEye} width={16} height={16} className='absolute top-3 right-3 hover:text-red-700 cursor-pointer' />
                </div>
                <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} w-full flex items-center justify-center h-12 text-xl rounded-3xl text-white`}>{
                    isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Sign Up'
                }</button>
            </form>
            <div className='text-slate-600 flex items-center gap-3'>
                <span>Already Have an account?</span>
                <Link href={'/login/user'} className='text-red-700 hover:text-red-500'>Login</Link>
            </div>
            <Link href={'/login/operator'} className='text-red-700 hover:text-red-500'>Login as Operator</Link>
        </div>
    )
}

export default SignupForm