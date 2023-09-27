import axios from 'axios';
import { create } from 'zustand'
import { Car } from './globalStore';

interface Operator {
    id: number;
    name: string;
    money: number;
    email: string;
    status: string;
    profile: string;
    mobile: string
    image_id: string
    address: string;
}

export type { Operator }

interface OperatorStoreType {
    getOperatorToken: () => {
        token: string;
        userID: string;
    } | undefined
    operator: Operator
    logoutOperator: () => void
    getOperator: () => Promise<void>
    cars: Car[]
    getCars: () => Promise<void>
    setCars: (cars: Car[]) => void
}


const useOperatorStore = create<OperatorStoreType>((set, get) => ({
    operator: {
        id: 1,
        name: 'Arnold Nillas Operator',
        money: 50132,
        mobile: '09053579474',
        email: 'arnoldzkie22@gmail.com',
        status: 'verified',
        profile: '',
        image_id: '/ID.jpg',
        address: 'Philippines test',
    },
    cars: [],
    getOperator: async () => {

        try {

            const { getOperatorToken } = get()

            const operator = getOperatorToken()

            if (operator) {

                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/operator`, {
                    headers: {
                        Authorization: operator?.token
                    }
                })

                if (data.ok) {

                    set({ operator: data.data })

                }

            }

            // alert('Sign in First.')

            // window.location.href = '/login/operator'


        } catch (error) {

            console.log(error);

            // alert('Something went wrong')

        }

    },
    getOperatorToken: () => {

        const operator = localStorage.getItem('operator')

        if (operator) {

            const currentOperator: {
                token: string
                userID: string
            } = JSON.parse(operator)

            return currentOperator

        } else {

            // window.location.href = '/login/operator'

        }


    },
    getCars: async () => {

        try {

            const { getOperatorToken } = get()

            const operator = getOperatorToken()

            if (operator) {

                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/operator`, {
                    headers: {
                        Authorization: operator?.token
                    }
                })

                if (data.ok) {

                    set({ cars: data.data })

                }

            }

            // alert('Sign in First.')

            // window.location.href = '/login/operator'

        } catch (error) {

            console.log(error);

        }
    },
    logoutOperator: () => {

        localStorage.clear()
        window.location.href = '/login/operator'

    },
    setCars: (cars: Car[]) => set({ cars: cars })
}))

export default useOperatorStore