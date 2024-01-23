import { FormsUser } from './formsUser'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/auth'
import { errorFormsUserProps } from '../app/register/page'
import userService from '../services/UserService'
import { ChangePasswordBox } from './changePasswordBox'
import { useRouter } from 'next/navigation'

type dataProps = {
  id: string
  name: string
  email: string
  date_of_birth: Date
  gender: string
}
export default function ConfigUser({
  handleVisible,
}: {
  handleVisible: (visible: boolean) => void
}) {
  const [data, setData] = useState<dataProps>({} as dataProps)
  const router = useRouter()
  const { user, setAuthUser, signout } = useContext(AuthContext)
  useEffect(() => {
    if (user) {
      setData(user)
    }
  }, [user])

  const [errors, setErrors] = useState<errorFormsUserProps>({
    name: { value: false, msg: '' },
    email: { value: false, msg: '' },
    gender: { value: false, msg: '' },
    date_of_birth: { value: false, msg: '' },
    password: { value: false, msg: '' },
  })
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setData({ ...data, name: e.target.value })
      setErrors({ ...errors, name: { value: false, msg: '' } })
    }
    if (e.target.name === 'email') {
      setData({ ...data, email: e.target.value })
      setErrors({ ...errors, email: { value: false, msg: '' } })
    }
    if (e.target.name === 'verifyPassword') {
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

    // Função auxiliar para definir erros
    const setError = (field: string, value: boolean, msg?: string) => {
      setErrors({ ...errors, [field]: { value, msg: msg || '' } })
    }

    if (!data.name) {
      setError('name', true)
    } else if (!data.email) {
      setError('email', true, 'Email inválido')
    } else {
      const response = await userService.updateUser(data)
      if (response === 'userAlreadyExists') {
        setError('email', true, 'Email já cadastrado!')
      } else if (response === 'invalidEmail') {
        setError('email', true, 'Email inválido')
      } else if (response === 'error') {
        window.alert('Erro ao atualizar usuário!')
        handleVisible(false)
      } else {
        setAuthUser(data)
        window.alert('Usuário atualizado com sucesso!')
        handleVisible(false)
      }
    }
  }
  const handleOnClickDeleteUser = async () => {
    const response = window.confirm('Tem certeza que deseja deletar o usuário?')
    if (response) {
      const res = await userService.deleteUser()
      if (res === 'error') {
        window.alert('Erro ao deletar usuário!')
        router.push('/')
        return
      }
      signout()
    }
  }

  return (
    <div>
      {data.date_of_birth && (
        <div className=" relative  flex flex-col rounded-2xl bg-white p-10">
          <h1 className="mb-4  text-3xl font-bold">Configurações de Usuário</h1>
          <FormsUser
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            handleOnChangeSelect={handleOnChangeSelect}
            textButton="Atualizar"
            passwordInput={false}
            DateGenderInput={false}
            errors={errors}
            user={data}
          />
          <hr className="my-4 border-t-2 border-gray-300"></hr>

          <ChangePasswordBox />
          <hr className="my-4 border-t-2 border-gray-300"></hr>

          <div className="flex items-end justify-between">
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={handleOnClickDeleteUser}
            >
              Deletar usuário
            </button>
            <button
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              onClick={() => handleVisible(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
