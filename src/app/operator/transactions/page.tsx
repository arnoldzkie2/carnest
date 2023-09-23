import OperatorFooter from '@/components/operator/OperatorFooter'
import OperatorHeader from '@/components/operator/OperatorHeader'
import OperatorTranscactions from '@/components/operator/OperatorTransactions'
import React from 'react'

const Page = () => {
  return (
      <>
      <OperatorHeader />
      <OperatorTranscactions />
      <OperatorFooter />
      </>
    )
}

export default Page