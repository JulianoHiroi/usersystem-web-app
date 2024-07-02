'use client'
import Image from 'next/image'
import Logo from '../../components/logo'
import Input from '../../components/input'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../hooks/auth'

import Link from 'next/link'
import ButtonLoading from '../../components/buttonLoading'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [Loading, setLoading] = useState(false)
  const { signin, signed } = useContext(AuthContext)
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
    setError(false)
  }
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await signin(email, password)

    if (response === 'error') {
      setError(true)
      setLoading(false)
    }
    if (response === 'success') {
      router.push('/dashboard')
    }
  }

  useEffect(() => {
    if (signed) {
      router.push('/dashboard')
    }
  }, [signed])

  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-[#163029] ">
      <Logo />
      <div className=" flex w-min flex-col rounded-2xl bg-white p-10">
        <h1 className="mb-4  text-3xl font-bold">Login</h1>
        <form className="flex flex-col" onSubmit={handleOnSubmit}>
          <Input
            text="Email"
            placeholder="Email"
            name="email"
            handleOnChange={handleOnChange}
            error={error}
          />
          <Input
            text="Senha"
            placeholder="Senha"
            name="password"
            type="password"
            handleOnChange={handleOnChange}
            error={error}
            className="mt-5"
          />

          <div className="mt-1 flex justify-between align-middle">
            <Link
              href="/recovery-password"
              className=" cursor-pointer  text-xs text-blue-600 "
            >
              Esqueceu a senha?
            </Link>{' '}
            <Link
              href="/register"
              className=" cursor-pointer  text-xs text-blue-600"
            >
              Cadastrar-se
            </Link>
          </div>

          <p className="h-12 pt-4 text-red-500">
            {error ? 'Email ou senha incorretos' : ''}
          </p>

          {Loading ? (
            <ButtonLoading />
          ) : (
            <button className="relative rounded-md bg-[#163029] py-2 text-white ">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
