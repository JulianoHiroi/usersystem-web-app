'use client'
import { FaGear } from 'react-icons/fa6'
import { HiOutlineLogout } from 'react-icons/hi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../hooks/auth'
import Card from '../../components/card'
import Image from 'next/image'
import SinalMais from '../../assets/sinalMais.png'
import ConfigIcon from '../../assets/engrenagem.png'
import projectService from '../../services/ProjectService'
import Overlay from '../../components/ovelay'
import FormsProject from '../../components/formsProject'
import Logo from '../../components/logo'
import { Loading } from '../../components/loading'

export type ProjectProps = {
  name: string
  description: string
  id: string
}
type ProjectCreateProps = {
  name: string
  description: string
}
export default function Dashboard() {
  const { user, signout } = useContext(AuthContext)
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleOverlay, setVisibleOverlay] = useState(false)

  const handleVisible = (visible: boolean) => {
    setVisibleOverlay(visible)
  }
  const handleCreateProject = async (project: ProjectCreateProps) => {
    setVisibleOverlay(false)
    await projectService.createProject(project)
    getProjects()
  }
  const handleDeleteProject = (id: string) => {
    projectService.deleteProject(id)
    getProjects()
  }
  const getProjects = async () => {
    await projectService
      .getProjects()
      .then((response) => {
        setProjects(response)
        setLoading(false)
      })
      .catch(() => {
        setLoading(true)
      })
  }
  useEffect(() => {
    if (user) {
      getProjects()
    } else {
      setLoading(true)
    }
  }, [user])
  const handleOnCreateProject = () => {
    setVisibleOverlay(true)
  }
  const handleOnClickSignout = () => {
    signout()
  }
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-200">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Logo color={true} />
          <div className="absolute right-10 top-10 flex space-x-3">
            <button
              className=" rounded-md bg-zinc-500 p-2"
              onClick={handleOnCreateProject}
            >
              <FaGear className="h-10 w-10" color="black" opacity={0.75} />
            </button>
            <button
              className=" rounded-md bg-red-600 p-2"
              onClick={handleOnClickSignout}
            >
              <HiOutlineLogout
                className="h-10 w-10"
                color="black"
                opacity={0.75}
              />
            </button>
          </div>

          <div className=" grid grid-flow-col space-x-2 ">
            <div
              onClick={handleOnCreateProject}
              className="flex h-60 w-60 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-teal-500 shadow-lg hover:shadow-md hover:shadow-zinc-400 lg:max-w-4xl "
            >
              <Image
                src={SinalMais}
                width={100}
                height={100}
                alt="Imagem de sinal de mais"
                className="opacity-90"
              />
            </div>
            {projects.map((project) => {
              return (
                <Card
                  project={project}
                  key={project.id}
                  handleDeleteProject={handleDeleteProject}
                />
              )
            })}
          </div>
        </div>
      )}
      {visibleOverlay && (
        <Overlay handleVisible={handleVisible}>
          <FormsProject handleData={handleCreateProject} />
        </Overlay>
      )}
    </div>
  )
}
