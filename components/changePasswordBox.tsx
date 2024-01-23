import { useContext, useState } from 'react'
import Input from './input'
import { useRouter } from 'next/navigation'
import userService from '../services/UserService'
import { AuthContext } from '../hooks/auth'

export function ChangePasswordBox() {
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const { token } = useContext(AuthContext)
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
    if (token === undefined || !token) {
      router.push('/login')
    }
    const response = await userService.changePassword(token!, password)

    if (response === 'sucess') {
      window.alert('Senha alterada com sucesso')
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
    <div>
      <form onSubmit={handleOnSubmit}>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          handleOnChange={handleOnChange}
          error={error.value}
          text="Senha"
          className="h-20"
        />
        <Input
          placeholder="Verify Password"
          name="verifyPassword"
          type="password"
          handleOnChange={handleOnChange}
          error={error.value}
          text="Confirme a senha"
          errorMsg={error.msg || 'Senha inválida'}
          className="h-20"
        />
        <div className="flex w-full items-end justify-end">
          <button
            className="rounded-md border-2 border-solid border-red-600  py-2 pl-3 pr-3
          text-red-600"
            type="submit"
          >
            Mudar a senha
          </button>
        </div>
      </form>
    </div>
  )
}
