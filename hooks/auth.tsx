'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import api from '../services/api'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  gender: string
  date_of_birth: Date
}

type signupProps = {
  name: string
  email: string
  date_of_birth: Date
  gender: string
  password: string
}
interface AuthContextData {
  user: User | undefined
  token: string | undefined
  signed: boolean
  signin: (email: string, password: string) => Promise<string | undefined>
  signup: (data: signupProps) => Promise<string>
  signout: () => void
  setAuthUser: (user: User) => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string>()
  const [signed, setSigned] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    loadingStorageData()
  }, [])

  const loadingStorageData = async () => {
    const storagedUser = localStorage.getItem('@Nos-Web-App:user')
    const storagedToken = localStorage.getItem('@Nos-Web-App:token')
    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))
      setToken(storagedToken)
      //Faz verificação se o token é válido
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`
      api.get('/users/verify').then(() => {
        setSigned(true)
      }).catch(() => {
        setSigned(false)
      })
    } else {
      setSigned(false)
    }
  }
  const setAuthUser = (user: User) => {
    setUser(user)
    localStorage.setItem('@Nos-Web-App:user', JSON.stringify(user))
  }
  const signin = async (email: string, password: string) => {
    const response = await api
      .post('/users/signin', {
        email,
        password,
      })
      .then((response) => {
        const { token, user } = response.data
        localStorage.setItem('@Nos-Web-App:token', token)
        localStorage.setItem('@Nos-Web-App:user', JSON.stringify(user))
        api.defaults.headers.Authorization = `Bearer ${token}`

        setUser(user)
        setToken(token)
        setSigned(true)
        return 'success'
      })
      .catch(() => {
        return 'error'
      })
    return response
  }
  const signup = async (data: signupProps): Promise<string> => {
    const response: string = await api
      .post('/users/signup', {
        ...data,
      })
      .then((response) => {
        localStorage.setItem('@Nos-Web-App:token', response.data.token)
        localStorage.setItem(
          '@Nos-Web-App:user',
          JSON.stringify(response.data.user),
        )
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`
        setSigned(true)
        return 'sucess'
      })
      .catch((error) => {
        return error.response.data.message
      })
    return response
  }
  const signout = () => {
    router.push('/')
    localStorage.clear()
    setUser(undefined)
    setToken(undefined)
    setSigned(false)
    api.defaults.headers.Authorization = `Bearer`
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signed,
        signin,
        signup,
        signout,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
