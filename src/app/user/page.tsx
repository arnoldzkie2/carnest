import Cars from '@/components/home/Cars'
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import React from 'react'

const Page = () => {
  return (
    <>
      <UserHeader />
      <div className='pt-20'>
        <Cars />
      </div>
      <UserFooter />
    </>
  )
}

export default Page