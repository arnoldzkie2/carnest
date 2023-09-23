'use client'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminTable from '@/components/admin/AdminTable'
import CreateAdminModal from '@/components/admin/CreateAdminModal'
import UpdateAdminModal from '@/components/admin/UpdateAdminModal'
import useAdminStore from '@/lib/state/adminStore'
import React from 'react'

const Page = () => {

    const { adminModal, newAdmin } = useAdminStore()
    return (
        <>

            <AdminHeader />
            <AdminTable />
            {adminModal && <UpdateAdminModal />}
            {newAdmin && <CreateAdminModal />}
        </>
    )
}

export default Page