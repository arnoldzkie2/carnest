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
    coding_day: string
    plate_number: string
    location: {
        address: string
        map: {
            lat: number
            lng: number
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
    car_info: Car
    user_info: User
    operator_info: Operator
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
    selectedBooking: Booking | null
    viewBooking: (booking: Booking) => void
    closeViewBooking: () => void
}

//create a global homeStore to use it anywhere

const useGlobalStore = create<HomeStoreType>((set) => ({
    isLoading: false,
    setIsLoading: (status: boolean) => set({ isLoading: status }),
    cars: [],
    getAllCars: async () => {

        setTimeout(() => {

            set({
                cars:
                    [
                        {
                            "car_brand": "Toyota",
                            "car_name": "Camry",
                            "id": 1,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Sedan",
                            "plate_number": "ABC-123",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar2.webp"],
                            "price": 50.00,
                            "year": "2022",
                            "operator_id": 101,
                            "reserved": false
                        },
                        {
                            "car_brand": "Honda",
                            "car_name": "Civic",
                            "id": 2,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Sedan",
                            "plate_number": "XYZ-789",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar3.webp"],
                            "price": 45.00,
                            "year": "2021",
                            "operator_id": 102,
                            "reserved": true
                        },
                        {
                            "car_brand": "Ford",
                            "car_name": "Escape",
                            "id": 3,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "SUV",
                            "plate_number": "LMN-456",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar4.jpg"],
                            "price": 55.00,
                            "year": "2023",
                            "operator_id": 103,
                            "reserved": false
                        },
                        {
                            "car_brand": "Chevrolet",
                            "car_name": "Silverado",
                            "id": 4,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Truck",
                            "plate_number": "PQR-789",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 65.00,
                            "year": "2022",
                            "operator_id": 104,
                            "reserved": true
                        },
                        {
                            "car_brand": "Nissan",
                            "car_name": "Altima",
                            "id": 5,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Sedan",
                            "plate_number": "RST-101",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 48.00,
                            "year": "2021",
                            "operator_id": 105,
                            "reserved": false
                        },
                        {
                            "car_brand": "Tesla",
                            "car_name": "Model 3",
                            "id": 6,
                            "fuel_type": "Electric",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Electric",
                            "plate_number": "TES-001",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 70.00,
                            "year": "2022",
                            "operator_id": 106,
                            "reserved": true
                        },
                        {
                            "car_brand": "Jeep",
                            "car_name": "Wrangler",
                            "id": 7,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 4,
                            "car_type": "SUV",
                            "plate_number": "JEEP-007",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 60.00,
                            "year": "2023",
                            "operator_id": 107,
                            "reserved": false
                        },
                        {
                            "car_brand": "BMW",
                            "car_name": "X5",
                            "id": 8,
                            "fuel_type": "Diesel",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "SUV",
                            "plate_number": "BMW-X5",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 75.00,
                            "year": "2022",
                            "operator_id": 108,
                            "reserved": true
                        },
                        {
                            "car_brand": "Kia",
                            "car_name": "Sportage",
                            "id": 9,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "SUV",
                            "plate_number": "KIA-2023",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 53.00,
                            "year": "2023",
                            "operator_id": 109,
                            "reserved": false
                        },
                        {
                            "car_brand": "Hyundai",
                            "car_name": "Elantra",
                            "id": 10,
                            "fuel_type": "Gasoline",
                            "transmission": "Automatic",
                            "car_seats": 5,
                            "car_type": "Sedan",
                            "plate_number": "HYU-10",
                            "coding_day": "Friday",
                            "location": {
                                "address": "Quezon City, Philippines",
                                "map": {
                                    "lat": 0,
                                    "lng": 0
                                }
                            },
                            "images": ["/testcar.jpg"],
                            "price": 47.00,
                            "year": "2023",
                            "operator_id": 110,
                            "reserved": true
                        }
                    ]
            })


        }, 3000)
        // try {

        //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars`)

        //     if (data.ok) {

        //         set({ cars: data.data })

        //     }

        // } catch (error) {

        //     console.log(error);

        //     alert('Something went wrong')

        // }
    },
    selectedID: 0,
    operation: false,
    openOperation: (ID: number) => set({ operation: true, selectedID: ID }),
    closeOperation: () => set({ operation: false, selectedID: 0 }),
    itemsPerPage: 10,
    currentPage: 1,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    selectedBooking: null,
    viewBooking: (booking: Booking) => set({ selectedBooking: booking }),
    closeViewBooking: () => set({ selectedBooking: null })
}))


// {
//     id: 1,
//     operator_id: 1,
//     user_id: 2,
//     pickup_date: "2023-09-30",
//     pickup_time: "09:00 AM",
//     duration: 3,
//     return_date: "2023-09-30",
//     total_price: 150,
//     status: 1,
//     operator_info: {
//         id: 1,
//         name: "Operator Name",
//         status: "Active",
//         profile: "",
//         email: "operator@example.com",
//         money: 1000,
//         mobile: "123-456-7890",
//         address: "Operator Address",
//         image_id: "operator-image-1",
//     },
//     user_info: {
//         id: 1,
//         name: "User Name",
//         profile:"",
//         money: 500,
//         email: "user@example.com",
//         status: "Active",
//         address: "User Address",
//         mobile: "987-654-3210",
//         image_id: "user-image-1",
//     },
//     car_info: {
//         id: 1,
//         car_brand: "Car Brand",
//         car_name: "Car Model",
//         fuel_type: "Gasoline",
//         transmission: "Automatic",
//         car_seats: 5,
//         car_type: "Sedan",
//         plate_number: "ABC-123",
//         location: {
//             address: '',
//             map: {
//                 lat: 0,
//                 lng: 0
//             }
//         },
//         images: ["image1.jpg", "image2.jpg"],
//         price: 50,
//         year: "2022",
//         operator_id: 1,
//         reserved: false,
//     },
// },

export default useGlobalStore