import { create } from 'zustand'
import axios from 'axios'
import { User } from './userStore'
import { Operator } from './operatorStore'

interface Car {
    car_brand: string
    car_name: string
    id: number
    fuel_type: string
    transmission: string
    car_seats: number
    car_type: string
    plate_number: string
    location: {
        address: string, map: {
            long: '',
            lat: ''
        }
    }
    images: string[]
    price: number
    year: string
    operator_id: number
    reserved: boolean
}

interface Booking {
    id: number
    operator_id: number
    user_id: number
    pickup_date: string
    pickup_time: string
    duration: number
    return_date: string
    total_price: number
    status: number
    pickup_location: string
    car_info: any
    user_info?: any
    operator_info?: any
}

export type { Car, Booking }

interface HomeStoreType {

    cars: Car[]
    isLoading: boolean
    getAllCars: () => Promise<void>
    setIsLoading: (status: boolean) => void
    selectedID: number
    operation: boolean
    openOperation: (ID: number) => void
    closeOperation: () => void
    currentPage: number
    itemsPerPage: number
    setCurrentPage: (page: number) => void
}

//create a global homeStore to use it anywhere

const useGlobalStore = create<HomeStoreType>((set) => ({
    isLoading: false,
    setIsLoading: (status: boolean) => set({ isLoading: status }),
    cars: [],
    getAllCars: async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars`)

            if (data.ok) {

                set({ cars: data.data })

            }

        } catch (error) {

            console.log(error);

            alert('Something went wrong')

        }
    },
    selectedID: 0,
    operation: false,
    openOperation: (ID: number) => set({ operation: true, selectedID: ID }),
    closeOperation: () => set({ operation: false, selectedID: 0 }),
    itemsPerPage: 10,
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page })
}))

export default useGlobalStore