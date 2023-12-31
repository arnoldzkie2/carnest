import Cars from '@/components/home/Cars'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import Main from '@/components/home/Main'
import React from 'react'

const Page = () => {
  return (
      <>
        <Header />
        <Main />
        <Cars />
        <Footer />
      </>
    )
}

export default Page