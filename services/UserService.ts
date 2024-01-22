import api from './api'

class UserService {
  async getUser(email: string) {
    const response = await api.get(`/users/email/${email}`)
    return response.data
  }

  async recoveryPassword(email: string) {
    await api.post(`/users/recoverypassword`, {
      email,
    })
  }

  async changePassword(token: string, password: string) {
    const response = await api
      .patch(`/users/changepassword`, {
        token,
        password,
      })
      .then((res) => {
        return 'sucess'
      })
      .catch((res) => {
        if (res.response.data.message === 'Invalid password') {
          return 'invalidPassword'
        }
        return 'error'
      })
    return response
  }
}
const userService = new UserService()
export default userService
