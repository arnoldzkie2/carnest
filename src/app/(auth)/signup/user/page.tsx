import SignupForm from '@/components/auth/user/SignupForm'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import React from 'react'

const Page = () => {
    return (
        <>
            <Header />
            <SignupForm />
            <Footer />
        </>
    )
}

export default Page