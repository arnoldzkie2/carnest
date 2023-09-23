import UserFooter from '@/components/user/UserFooter'
import UserHeader from '@/components/user/UserHeader'
import React from 'react'

interface Props {
    params: {
        carID: string
    }
}

const Page = ({ params }: Props) => {

    const { carID } = params

    return (

            <>
            <UserHeader />
            <UserFooter />
            </>
    )
}

export default Page