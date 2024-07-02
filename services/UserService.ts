import api from './api'

type UserUpdateProps = {
  id: string
  name: string
  email: string
  gender: string
  date_of_birth: Date
}
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

  async updateUser(user: UserUpdateProps) {
    const response = await api
      .patch(`/users/${user.id}`, {
        name: user.name,
        email: user.email,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        if (res.response.data.message === 'Invalid email') {
          return 'invalidEmail'
        } else if (res.response.data.message === 'User already exists') {
          return 'userAlreadyExists'
        } else {
          return 'error'
        }
      })
    return response
  }

  async deleteUser() {
    const response = await api
      .delete(`/users/`)
      .then((res) => {
        return 'sucess'
      })
      .catch(() => {
        return 'error'
      })
    return response
  }
}
const userService = new UserService()
export default userService
