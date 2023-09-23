import AdminHeader from '@/components/admin/AdminHeader'
import TransactionTable from '@/components/admin/transactions/TransactionTable'
import React from 'react'

const Page = () => {
  return (
      <>
      <AdminHeader />
      <TransactionTable />
      </>
    )
}

export default Page