'use client'

import { useContext } from 'react'
import { AuthContext } from '../../hooks/auth'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const { verifySigned } = useContext(AuthContext)
  if (!verifySigned()) {
    router.push('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
