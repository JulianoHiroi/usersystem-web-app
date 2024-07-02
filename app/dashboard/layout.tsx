'use client'

import { useContext, useEffect } from 'react'
import { AuthContext } from '../../hooks/auth'
import { useRouter } from 'next/navigation'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { signed } = useContext(AuthContext)
  useEffect(() => {
    if (!signed) {
      router.push('/login')
    }
  }, [signed])

  return <section>{children}</section>
}
