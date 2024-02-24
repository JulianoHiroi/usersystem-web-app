import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../hooks/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UserSystem',
  description: 'Sistema usuário com Next.js e Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
