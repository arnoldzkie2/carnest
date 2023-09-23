import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import UserTransactions from '@/components/user/UserTransactions'
import React from 'react'

const Page = () => {
  return (
    <>
    <UserHeader />
    <UserTransactions />
    <UserFooter />
    </>
    )
}

export default Page