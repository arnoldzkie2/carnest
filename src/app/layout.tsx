'use client'
import useGlobalStore from '@/lib/state/globalStore'
import '../lib/styles/globals.css'
import { Inter } from 'next/font/google'
import BookingModal from '@/components/BookingModal'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { selectedBooking } = useGlobalStore()

  return (
    <html lang="en">
      <head>
        <title>Carnest</title>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        {children}
        {selectedBooking && <BookingModal />}
      </body>
    </html>
  )
}
