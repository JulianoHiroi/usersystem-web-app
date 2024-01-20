'use client'
import Logo from '../../components/logo'
import Input from '../../components/input'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/auth'
import { useRouter } from 'next/navigation'
import Select from '../../components/select'
import Link from 'next/link'

type dataProps = {
  name: string
  email: string
  date_of_birth: Date
  gender: string
  password: string
}
type errorProps = {
  name: boolean
  email: { value: boolean; msg: string }
  date_of_birth: boolean
  gender: boolean
  password: { value: boolean; msg: string }
}
export default function Register() {
  const [data, setData] = useState<dataProps>({} as dataProps)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [errors, setErrors] = useState<errorProps>({
    name: false,
    email: { value: false, msg: '' },
    gender: false,
    date_of_birth: false,
    password: { value: false, msg: '' },
  })
  const router = useRouter()
  const { signup } = useContext(AuthContext)
  const options = [
    { name: 'Masculino', value: 'M' },
    { name: 'Feminino', value: 'F' },
  ]
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setData({ ...data, name: e.target.value })
      setErrors({ ...errors, name: false })
    }
    if (e.target.name === 'email') {
      setData({ ...data, email: e.target.value })
      setErrors({ ...errors, email: { value: false, msg: '' } })
    }
    if (e.target.name === 'password') {
      setData({ ...data, password: e.target.value })
      setErrors({ ...errors, password: { value: false, msg: '' } })
    }
    if (e.target.name === 'verifyPassword') {
      setVerifyPassword(e.target.value)
      setErrors({ ...errors, password: { value: false, msg: '' } })
    }
    if (e.target.name === 'date_of_birth') {
      setData({ ...data, date_of_birth: new Date(e.target.value) })
      setErrors({ ...errors, date_of_birth: false })
    }
  }

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, gender: e.target.value })
    setErrors({ ...errors, gender: false })
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Função auxiliar para definir erros
    const setError = (field: string, value: boolean, msg?: string) => {
      setErrors({ ...errors, [field]: { value, msg: msg || '' } })
    }

    if (!data.name) {
      setError('name', true)
    } else if (!data.email) {
      setError('email', true, 'Email inválido')
    } else if (!data.password) {
      setError('password', true, 'Senha inválida')
    } else if (!verifyPassword) {
      setError('password', true, 'Senha inválida')
    } else if (data.password !== verifyPassword) {
      setError('password', true, 'As senhas não coincidem')
    } else {
      const response = await signup(data)
      switch (response) {
        case 'Invalid password':
          setError('password', true, 'Senha inválida')
          break
        case 'Invalid email':
          setError('email', true, 'Email inválido')
          break
        case 'User already exists':
          setError('email', true, 'Email já cadastrado')
          break
        case 'Gender is required':
          setError('gender', true)
          break
        case 'Invalid date of birth':
          setError('date_of_birth', true)
          break
        default:
          router.push('/dashboard')
      }
    }
  }

  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-teal-500 ">
      <Logo />

      <div className=" relative  flex flex-col rounded-2xl bg-white p-10">
        <h1 className="mb-4  text-3xl font-bold">Cadastro</h1>
        <Link
          href="/login"
          className="absolute right-10 top-10 cursor-pointer  text-sm text-blue-600 "
        >
          Fazer login
        </Link>
        <form className="flex flex-col" onSubmit={handleOnSubmit}>
          <Input
            placeholder="Nome"
            name="name"
            handleOnChange={handleOnChange}
            error={errors.name}
            text="Nome completo"
            className="h-20"
            errorMsg="Nome inválido"
          />
          <div className=" flex justify-between space-x-5 ">
            <Select
              name="gender"
              id="genderSelect"
              text="Genêro : "
              handleOnChange={handleOnChangeSelect}
              options={options}
              error={errors.gender}
            />
            <Input
              type="date"
              name="date_of_birth"
              handleOnChange={handleOnChange}
              error={errors.date_of_birth}
              text="Data de nascimento"
              errorMsg="Data de nascimento inválida"
            />
          </div>
          <Input
            placeholder="Email"
            name="email"
            handleOnChange={handleOnChange}
            error={errors.email.value}
            text="Email"
            className="h-20"
            errorMsg={errors.email.msg || 'Email inválido'}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            handleOnChange={handleOnChange}
            error={errors.password.value}
            text="Senha"
            className="h-20"
          />
          <Input
            placeholder="Verify Password"
            name="verifyPassword"
            type="password"
            handleOnChange={handleOnChange}
            error={errors.password.value}
            text="Confirme a senha"
            errorMsg={errors.password.msg || 'Senha inválida'}
            className="h-20"
          />
          <button className="rounded-md bg-teal-600 py-2 text-white">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}
