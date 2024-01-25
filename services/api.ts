import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:4000/api/',
  baseURL: 'http://138.197.114.241/api/',
})

export default api
