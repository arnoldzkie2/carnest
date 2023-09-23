'use client'
import DepositModal from '@/components/user/DepositModal'
import Profile from '@/components/user/Profile'
import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import useUserStore from '@/lib/state/userStore'
import React from 'react'

const Page = () => {

  const { deposit } = useUserStore()

  console.log(deposit);
  
  return (
    <>
      <UserHeader />
      <Profile />
      <UserFooter />
      {deposit && <DepositModal />}
    </>
  )
}

export default Page