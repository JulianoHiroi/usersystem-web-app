'use client'

import Logo from '../../../components/logo'
import Input from '../../../components/input'
import { useState } from 'react'
import userService from '../../../services/UserService'
import { useRouter } from 'next/navigation'
export default function RecoveryPasswordToken({
  params,
}: {
  params: { token: string }
}) {
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [error, setError] = useState({ value: false, msg: '' })
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    if (e.target.name === 'verifyPassword') {
      setVerifyPassword(e.target.value)
    }
    setError({ value: false, msg: '' })
  }
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== verifyPassword) {
      setError({ value: true, msg: 'As senhas não são iguais' })
      return
    }
    const response = await userService.changePassword(params.token, password)

    if (response === 'sucess') {
      router.push('success')
      return
    }
    if (response === 'invalidPassword') {
      setError({
        value: true,
        msg: 'A senha inválida',
      })
      return
    }
    if (response === 'error') {
      window.alert('Ocorreu um erro ao alterar a senha')
    }
  }
  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-[#163029] ">
      <Logo />
      <div className=" relative  flex flex-col rounded-2xl bg-white p-10">
        <h1 className="mb-4  text-3xl font-bold">Mudar a senha</h1>
        <form onSubmit={handleOnSubmit}>
          <Input
            placeholder="Senha"
            name="password"
            handleOnChange={handleOnChange}
            error={error.value}
            text="Senha nova :"
            className="h-20"
            type="password"
          />
          <div className="h-24">
            <Input
              placeholder="Senha"
              name="verifyPassword"
              handleOnChange={handleOnChange}
              error={error.value}
              text="Verficar senha :"
              className="h-20"
              errorMsg={error.msg}
              type="password"
            />
          </div>

          <div className="flex items-end justify-end">
            <button
              className="rounded-md bg-[#163029] py-2 pl-3 pr-3 text-white"
              type="submit"
            >
              Alterar senha
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
