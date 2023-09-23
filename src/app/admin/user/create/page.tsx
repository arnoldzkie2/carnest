'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import useAdminStore from '@/lib/state/adminStore'
import useGlobalStore from '@/lib/state/globalStore'
import { UploadButton } from '@/lib/utils/uploadthing'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {

  const router = useRouter()

  const { isLoading, setIsLoading } = useGlobalStore()

  const { getAdminToken } = useAdminStore()

  const [formData, setFormData] = useState({
    name: '',
    money: 0,
    email: '',
    password: '',
    status: 'pending',
    address: '',
    mobile: '',
    profile: ''
  })

  const handleChange = (e: any) => {

    const { name, value } = e.target

    setFormData(prevData => ({ ...prevData, [name]: value }))

  }

  const createUser = async () => {

    try {

      const admin = getAdminToken()

      setIsLoading(true)
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, formData, {
        headers: {
          Authorization: admin?.token
        }
      })

      if (data.ok) {
        setIsLoading(false)
        router.push('/admin/user')
      }

    } catch (error) {

      setIsLoading(false)

      console.log(error);

    }
  }

  return (
    <>
      <AdminHeader />
      <div className='py-28 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-44 flex flex-col items-center gap-5'>
        <h1 className='text-2xl text-slate-800 w-full text-center'>Create User</h1>
        <form className='flex flex-col gap-5 w-full md:w-1/2 md:border md:p-10 md:shadow-lg' onSubmit={createUser}>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Full Name</label>
            <input required value={formData.name} onChange={handleChange} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Full Name' name='name' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Email</label>
            <input required onChange={handleChange} value={formData.email} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Email' name='email' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Password</label>
            <input required onChange={handleChange} value={formData.password} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Password' name='password' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Balance</label>
            <input required onChange={handleChange} value={formData.money} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Money' name='money' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Address</label>
            <input required onChange={handleChange} value={formData.address} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Address' name='address' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Status</label>
            <select name="status" className='outline-none border px-3 py-1.5' onChange={handleChange} value={formData.status}>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
            </select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Phone Number</label>
            <input required onChange={handleChange} value={formData.mobile} type="text" className='py-1.5 px-3 w-full border outline-none' placeholder='Phone Number' name='mobile' />
          </div>
          <div className='w-full flex gap-5 py-3'>
            <div>Profile Image</div>
            <UploadButton
              endpoint="userProfile"
              onClientUploadComplete={(res) => {

                setIsLoading(false)

                if (res) {

                  setFormData(prevData => ({ ...prevData, profile: res[0].url }))

                }

                alert("Upload Completed")
              }}
              onUploadBegin={() => {
                setIsLoading(true)
              }}
              onUploadError={(error: Error) => {

                alert('Something went wrong')
              }}
              appearance={{
                button: "bg-red-700 px-6 py-1.5 rounded-3xl w-full",
              }}
            />
          </div>

          <div className='flex items-center gap-5 justify-end w-full'>
            <Link href={'/admin/user'} className='px-10 py-2 rounded-3xl border bg-white hover:bg-slate-100'>Cancel</Link>
            <button disabled={isLoading} className={`${isLoading ? 'bg-red-500' : 'bg-red-700 hover:bg-red-500'} text-lg text-white py-2 px-10 self-center rounded-3xl`}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} className='animate-spin' width={16} height={16} /> : 'Create'}
            </button>
          </div>        </form>
      </div>

    </>
  )
}

export default Page