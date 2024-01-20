import api from './api'
type ProjectProps = {
  name: string
  description: string
}
class ProjectService {
  async getProjects() {
    const response = await api.get('/users/projects')
    return response.data
  }

  async createProject(project: ProjectProps) {
    const response = await api.post('projects', project)
    return response.data
  }

  async deleteProject(id: string) {
    const response = await api.delete(`projects/${id}`)
    return response.data
  }
}
const projectService = new ProjectService()
export default projectService
