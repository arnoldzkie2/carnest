import axios from "axios";
import { create } from "zustand";
import { User } from "./userStore";
import { Operator } from "./operatorStore";
import { Booking } from "./globalStore";

interface Admin {
    id: number
    email: string
    name: string
    created_at: string
}

interface AdminType {
    admin: Admin
    getAdminToken: () => {
        token: string;
        userID: string;
    } | undefined
    getAdmin: () => Promise<void>
    allAdmin: Admin[]
    getAllAdmin: () => Promise<void>
    adminModal: boolean
    adminData: Admin | null
    openAdminModal: (admin: Admin) => void
    closeAdminModal: () => void
    newAdmin: boolean
    toggleNewAdmin: () => void
    users: User[]
    operators: Operator[]
    transactions: Booking[]
    getUsers: () => Promise<void>
    getTransactions: () => Promise<void>
    getOperators: () => Promise<void>
}

const useAdminStore = create<AdminType>((set, get) => ({

    admin: {
        id: 0,
        email: 'arnoldzkie22@gmail.com',
        name: 'Arnold Admin',
        created_at: '2023-08-05'
    },
    allAdmin: [
        {
            id: 1,
            email: "admin1@example.com",
            name: "Admin 1",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 2,
            email: "admin2@example.com",
            name: "Admin 2",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 3,
            email: "admin3@example.com",
            name: "Admin 3",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 4,
            email: "admin4@example.com",
            name: "Admin 4",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 5,
            email: "admin5@example.com",
            name: "Admin 5",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 6,
            email: "admin6@example.com",
            name: "Admin 6",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 7,
            email: "admin7@example.com",
            name: "Admin 7",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 8,
            email: "admin8@example.com",
            name: "Admin 8",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 9,
            email: "admin9@example.com",
            name: "Admin 9",
            created_at: "2023-09-20T12:00:00Z",
        },
        {
            id: 10,
            email: "admin10@example.com",
            name: "Admin 10",
            created_at: "2023-09-20T12:00:00Z",
        },
    ],
    getAllAdmin: async () => {

        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin`)

            if (data.ok) {

                set({ allAdmin: data.data })

            }

        } catch (error) {

            console.log(error);

        }

    },
    getAdmin: async () => {

        try {

            const { getAdminToken } = get()

            const admin = getAdminToken()

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin`, {
                headers: {
                    Authorization: admin?.token
                }
            })

            if (data.ok) {

                set({ admin: data.data })

            }

        } catch (error) {

            console.log(error);

        }

    },
    getAdminToken: () => {

        const admin = localStorage.getItem('admin')

        if (admin) {

            const currentAdmin: {
                token: string
                userID: string
            } = JSON.parse(admin)

            return currentAdmin

        } else {

            // window.location.href = '/login/operator'

        }

    },
    adminModal: false,
    adminData: null,
    newAdmin: false,
    toggleNewAdmin: () => set(state => ({ newAdmin: !state.newAdmin })),
    openAdminModal: (admin: Admin) => set({ adminModal: true, adminData: admin }),
    closeAdminModal: () => set({ adminModal: false, adminData: null }),
    users: [],
    getUsers: async () => {

        setTimeout(() => {

            set({users: [
                {
                  "id": 1,
                  "name": "John Doe",
                  "profile": "/default-profile.png",
                  "money": 50000,
                  "email": "john.doe@example.com",
                  "status": "Active",
                  "address": "123 Main St, City, Country",
                  "mobile": "+1234567890",
                  "image_id": "1"
                },
                {
                  "id": 2,
                  "name": "Jane Smith",
                  "profile": "/default-profile.png",
                  "money": 60000,
                  "email": "jane.smith@example.com",
                  "status": "Active",
                  "address": "456 Elm St, City, Country",
                  "mobile": "+9876543210",
                  "image_id": "2"
                },
                {
                  "id": 3,
                  "name": "David Johnson",
                  "profile": "/default-profile.png",
                  "money": 45000,
                  "email": "david.johnson@example.com",
                  "status": "Inactive",
                  "address": "789 Oak St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "3"
                },
                {
                  "id": 4,
                  "name": "Sarah Brown",
                  "profile": "/default-profile.png",
                  "money": 70000,
                  "email": "sarah.brown@example.com",
                  "status": "Active",
                  "address": "101 Pine St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "4"
                },
                {
                  "id": 5,
                  "name": "Michael Lee",
                  "profile": "/default-profile.png",
                  "money": 55000,
                  "email": "michael.lee@example.com",
                  "status": "Active",
                  "address": "222 Birch St, City, Country",
                  "mobile": "+3344556677",
                  "image_id": "5"
                },
                {
                  "id": 6,
                  "name": "Emily Wilson",
                  "profile": "/default-profile.png",
                  "money": 60000,
                  "email": "emily.wilson@example.com",
                  "status": "Active",
                  "address": "333 Maple St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "6"
                },
                {
                  "id": 7,
                  "name": "Robert Davis",
                  "profile": "/default-profile.png",
                  "money": 48000,
                  "email": "robert.davis@example.com",
                  "status": "Active",
                  "address": "444 Cedar St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "7"
                },
                {
                  "id": 8,
                  "name": "Linda Miller",
                  "profile": "/default-profile.png",
                  "money": 42000,
                  "email": "linda.miller@example.com",
                  "status": "Inactive",
                  "address": "555 Spruce St, City, Country",
                  "mobile": "+3344556677",
                  "image_id": "8"
                },
                {
                  "id": 9,
                  "name": "James Anderson",
                  "profile": "/default-profile.png",
                  "money": 75000,
                  "email": "james.anderson@example.com",
                  "status": "Active",
                  "address": "666 Fir St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "9"
                },
                {
                  "id": 10,
                  "name": "Susan White",
                  "profile": "/default-profile.png",
                  "money": 52000,
                  "email": "susan.white@example.com",
                  "status": "Active",
                  "address": "777 Redwood St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "10"
                }
              ]
              })
        }, 3000)

        // try {

        //     const { getAdminToken } = get()

        //     const admin = getAdminToken()

        //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
        //         headers: {
        //             Authorization: admin?.token
        //         }
        //     })

        //     if (data.ok) {

        //         set({ users: data.data })

        //     }

        // } catch (error) {

        //     console.log(error);

        // }
    },

    operators: [],
    getOperators: async () => {

        setTimeout(() => {

            set({operators: [
                {
                  "id": 1,
                  "name": "John Doe",
                  "profile": "/default-profile.png",
                  "money": 50000,
                  "email": "john.doe@example.com",
                  "status": "Active",
                  "address": "123 Main St, City, Country",
                  "mobile": "+1234567890",
                  "image_id": "1"
                },
                {
                  "id": 2,
                  "name": "Jane Smith",
                  "profile": "/default-profile.png",
                  "money": 60000,
                  "email": "jane.smith@example.com",
                  "status": "Active",
                  "address": "456 Elm St, City, Country",
                  "mobile": "+9876543210",
                  "image_id": "2"
                },
                {
                  "id": 3,
                  "name": "David Johnson",
                  "profile": "/default-profile.png",
                  "money": 45000,
                  "email": "david.johnson@example.com",
                  "status": "Inactive",
                  "address": "789 Oak St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "3"
                },
                {
                  "id": 4,
                  "name": "Sarah Brown",
                  "profile": "/default-profile.png",
                  "money": 70000,
                  "email": "sarah.brown@example.com",
                  "status": "Active",
                  "address": "101 Pine St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "4"
                },
                {
                  "id": 5,
                  "name": "Michael Lee",
                  "profile": "/default-profile.png",
                  "money": 55000,
                  "email": "michael.lee@example.com",
                  "status": "Active",
                  "address": "222 Birch St, City, Country",
                  "mobile": "+3344556677",
                  "image_id": "5"
                },
                {
                  "id": 6,
                  "name": "Emily Wilson",
                  "profile": "/default-profile.png",
                  "money": 60000,
                  "email": "emily.wilson@example.com",
                  "status": "Active",
                  "address": "333 Maple St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "6"
                },
                {
                  "id": 7,
                  "name": "Robert Davis",
                  "profile": "/default-profile.png",
                  "money": 48000,
                  "email": "robert.davis@example.com",
                  "status": "Active",
                  "address": "444 Cedar St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "7"
                },
                {
                  "id": 8,
                  "name": "Linda Miller",
                  "profile": "/default-profile.png",
                  "money": 42000,
                  "email": "linda.miller@example.com",
                  "status": "Inactive",
                  "address": "555 Spruce St, City, Country",
                  "mobile": "+3344556677",
                  "image_id": "8"
                },
                {
                  "id": 9,
                  "name": "James Anderson",
                  "profile": "/default-profile.png",
                  "money": 75000,
                  "email": "james.anderson@example.com",
                  "status": "Active",
                  "address": "666 Fir St, City, Country",
                  "mobile": "+1122334455",
                  "image_id": "9"
                },
                {
                  "id": 10,
                  "name": "Susan White",
                  "profile": "/default-profile.png",
                  "money": 52000,
                  "email": "susan.white@example.com",
                  "status": "Active",
                  "address": "777 Redwood St, City, Country",
                  "mobile": "+9988776655",
                  "image_id": "10"
                }
              ]
              })
        }, 3000)

        // try {

        //     const { getAdminToken } = get()

        //     const admin = getAdminToken()

        //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/operator`, {
        //         headers: {
        //             Authorization: admin?.token
        //         }
        //     })

        //     if (data.ok) {

        //         set({ operators: data.data })

        //     }

        // } catch (error) {

        //     console.log(error);

        // }
    },
    transactions: [],
    getTransactions: async () => {

        try {

            const { getAdminToken } = get()

            const admin = getAdminToken()

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/booking`, {
                headers: {
                    Authorization: admin?.token
                }
            })

            if (data.ok) {

                set({ transactions: data.data })

            }

        } catch (error) {

            console.log(error);

        }

    }

}))

export default useAdminStore