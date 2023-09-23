import LoginForm from '@/components/auth/user/LoginForm'
import Footer from '@/components/home/Footer'
import Header from '@/components/home/Header'
import React from 'react'

const Page = () => {
    return (
        <>
            <Header />

            <LoginForm />

            <Footer />
        </>
    )
}

export default Page