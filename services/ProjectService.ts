import api from './api'

class ProjectService {
  async getProjects() {
    const response = await api.get('/users/projects')
    return response.data
  }
}
const projectService = new ProjectService()
export default projectService
