'use client'
import Logo from '../../components/logo'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormsUser } from '../../components/formsUser'

type dataProps = {
  name: string
  email: string
  date_of_birth: Date
  gender: string
  password: string
}
export type errorFormsUserProps = {
  name: { value: boolean; msg: string }
  email: { value: boolean; msg: string }
  date_of_birth: { value: boolean; msg: string }
  gender: { value: boolean; msg: string }
  password: { value: boolean; msg: string }
}
export default function Register() {
  const [data, setData] = useState<dataProps>({} as dataProps)
  const [verifyPassword, setVerifyPassword] = useState('')
  const [errors, setErrors] = useState<errorFormsUserProps>({
    name: { value: false, msg: '' },
    email: { value: false, msg: '' },
    gender: { value: false, msg: '' },
    date_of_birth: { value: false, msg: '' },
    password: { value: false, msg: '' },
  })
  const [Loading, setLoading] = useState(false)

  const router = useRouter()
  const { signup } = useContext(AuthContext)
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setData({ ...data, name: e.target.value })
      setErrors({ ...errors, name: { value: false, msg: '' } })
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
      setErrors({ ...errors, date_of_birth: { value: false, msg: '' } })
    }
  }

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({ ...data, gender: e.target.value })
    setErrors({ ...errors, gender: { value: false, msg: '' } })
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Função auxiliar para definir erros
    const setError = (field: string, value: boolean, msg?: string) => {
      setErrors({ ...errors, [field]: { value, msg: msg || '' } })
      setLoading(false)
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
          setError('gender', true, "O campo 'Gênero' é obrigatório")
          break
        case 'Invalid date of birth':
          setError('date_of_birth', true, 'Data de nascimento inválida')
          break
        default:
          router.push('/dashboard')
      }
    }
  }

  return (
    <div className=" align-center flex  h-screen items-center justify-center bg-[#163029] ">
      <div className="hidden md:flex">
        <Logo />
      </div>

      <div className=" relative  flex flex-col rounded-2xl bg-white p-10">
        <h1 className="mb-4  text-3xl font-bold">Cadastro</h1>
        <Link
          href="/login"
          className="absolute right-10 top-10 cursor-pointer  text-sm text-blue-600 "
        >
          Fazer login
        </Link>
        <FormsUser
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          handleOnChangeSelect={handleOnChangeSelect}
          textButton="Cadastrar"
          passwordInput={true}
          DateGenderInput={true}
          Loading={Loading}
          errors={errors}
        />
      </div>
    </div>
  )
}
