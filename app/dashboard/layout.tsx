'use client'

import { useContext } from 'react'
import { AuthContext } from '../../hooks/auth'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { signed } = useContext(AuthContext)
  if (!signed) {
    router.push('/')
  }

  return <section>{children}</section>
}
