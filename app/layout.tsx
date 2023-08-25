import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { ClientOnly, Navbar } from './components'
import RegisterModal from './components/Modal/RegisterModal'
import { ToastProvider } from './providers'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookMYProperty',
  description: 'A simple app to list and rent your property with a booking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
