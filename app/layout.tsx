import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ClientOnly, Navbar } from './components'
import RegisterModal from './components/Modal/RegisterModal'
import { ToastProvider } from './providers'
import LoginModal from './components/Modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/Modal/RentModal'
import SearchModal from './components/Modal/SearchModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookMYProperty',
  description: 'A simple app to list and rent your property with a booking system',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
