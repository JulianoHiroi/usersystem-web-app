'use client'

import Logo from '../../components/logo'
import Input from '../../components/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import userService from '../../services/UserService'

export default function RecoveryPassword() {
  const [emailRecovery, setEmailRecovery] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmailRecovery(value)
    setError(false)
  }
  const handleOnClickCancel = () => {
    router.push('/login')
  }
  const handleOnClickSearch = () => {
    userService
      .recoveryPassword(emailRecovery)
      .then(() => {
        router.push('/recovery-password/request-email')
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-[#163029] ">
      <div className=" flex  flex-col rounded-2xl bg-white p-10">
        <Logo />
        <h1 className="mb-4  text-3xl font-bold">Encontre sua conta</h1>
        <p className="mb-4 mb-5 text-sm text-gray-600">
          Insira o seu email para encontrar sua conta.
        </p>
        <div className="h-20">
          <Input
            handleOnChange={handleOnChange}
            name="emailRecovery"
            text="Email :"
            placeholder="Email"
            error={error}
            errorMsg="Email não encontrado"
          />
        </div>
        <div className="mt-3 flex items-end justify-end space-x-2">
          <button
            className="rounded-md bg-red-600 py-2 pl-3 pr-3 text-white"
            onClick={handleOnClickCancel}
          >
            Cancelar
          </button>
          <button
            className="rounded-md bg-[#163029] py-2 pl-3  pr-3 text-white"
            onClick={handleOnClickSearch}
          >
            Procurar
          </button>
        </div>
      </div>
    </div>
  )
}
