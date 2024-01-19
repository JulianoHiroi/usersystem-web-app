import api from './api'

export class UserService {
  public async login(email: string, password: string): Promise<string> {
    try {
      const response = await api.post('users/signin', {
        email,
        password,
      })
      const token: string = response.data
      return token
    } catch (error: any) {
      if (error.response.status === 401) {
        return 'InvalidCredentials'
      }
      return 'Error'
    }
  }
}
