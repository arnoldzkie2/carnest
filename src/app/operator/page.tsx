'use client'
import CreateAdminModal from '@/components/admin/CreateAdminModal'
import UpdateAdminModal from '@/components/admin/UpdateAdminModal'
import OperatorCars from '@/components/operator/OperatorCars'
import OperatorFooter from '@/components/operator/OperatorFooter'
import OperatorHeader from '@/components/operator/OperatorHeader'
import useAdminStore from '@/lib/state/adminStore'
import React from 'react'

const Page = () => {

  return (
    <>
      <OperatorHeader />
      <OperatorCars />
      <OperatorFooter />
    </>
  )
}

export default Page