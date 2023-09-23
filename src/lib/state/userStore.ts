import axios from 'axios'
import { create } from 'zustand'
import { Booking } from './globalStore'

interface User {
    name: string
    money: number
    email: string
    status: string
    profile: string | null
    address: string | null
    mobile: string | null
    id: number
    image_id: string | null
}

interface UserStoreType {

    user: User | null
    getUser: () => Promise<void>
    getToken: () => {
        token: string;
        userID: string;
    } | undefined
    logoutUser: () => void
    deposit: boolean
    toggleDeposit: () => void
}

export type { User }

const useUserStore = create<UserStoreType>((set, get) => ({
    user: {
        id: 1,
        name: 'Arnold Nillas',
        money: 50132,
        email: 'arnoldzkie22@gmail.com',
        status: 'verified',
        profile: '',
        address: 'Philippines test',
        mobile: '123456789',
        image_id: '/ID.jpg'
    },
    getUser: async () => {

        try {

            const { getToken } = get()

            const user = getToken()

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${user?.userID}`)

            if (data.ok) {

                set({ user: data.data })

            }

        } catch (error) {

            console.log(error)

            alert('Something went wrong')

        }

    },
    getToken: () => {

        const user = localStorage.getItem('user')

        if (user) {

            const currentUser: {
                token: string
                userID: string
            } = JSON.parse(user)

            return currentUser

        } else {

            // window.location.href = '/login/user'

        }


    },
    logoutUser: () => {

        localStorage.clear()
        window.location.href = '/login/user'

    },
    deposit: false,
    toggleDeposit: () => set(state => ({ deposit: !state.deposit }))
}))

export default useUserStore