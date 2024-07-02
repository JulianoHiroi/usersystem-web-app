'use client'
import './slider.css'
import { FaGear } from 'react-icons/fa6'
import { HiOutlineLogout } from 'react-icons/hi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../hooks/auth'
import Card from '../../components/card'
import Image from 'next/image'
import SinalMais from '../../assets/sinalMais.png'
import projectService from '../../services/ProjectService'
import Overlay from '../../components/ovelay'
import FormsProject from '../../components/formsProject'
import Logo from '../../components/logo'
import { Loading } from '../../components/loading'
import ConfigUser from '../../components/configUser'
import { Montserrat } from 'next/font/google'
import { useRouter } from 'next/navigation'
const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })

export type ProjectProps = {
  name: string
  description: string
  id: string
  user: {
    role: string
    user: {
      id: string
      name: string
      email: string
    }
  }[]
}
type ProjectCreateProps = {
  name: string
  description: string
}
export default function Dashboard() {
  const router = useRouter()
  const { user, signout } = useContext(AuthContext)
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleOverlayCreateProject, setVisibleOverlayCreateProject] =
    useState(false)
  const [visibleOverlayUpdateUser, setVisibleOverlayUpdateUser] =
    useState(false)

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

  const handleVisible = (visible: boolean) => {
    setVisibleOverlayCreateProject(visible)
    setVisibleOverlayUpdateUser(visible)
  }
  const handleCreateProject = async (project: ProjectCreateProps) => {
    setVisibleOverlayCreateProject(false)
    await projectService.createProject(project)
    getProjects()
  }
  const handleDeleteProject = (id: string) => {
    projectService.deleteProject(id)
    getProjects()
  }
  const handleOpenOvelayProject = () => {
    setVisibleOverlayCreateProject(true)
  }
  const handleOpenOvelayUser = () => {
    setVisibleOverlayUpdateUser(true)
  }
  const handleOnClickSignout = () => {
    signout()
  }
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-200">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Logo color={true} />
          <div className="absolute right-10 top-10 flex space-x-3">
            <button
              className=" rounded-md bg-zinc-500 p-2"
              onClick={handleOpenOvelayUser}
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

          <div className="flex w-full flex-col items-center space-y-5">
            <h1 className={montserrat.className + ' mt-12 text-xl'}>
              Seus projetos
            </h1>
            <div className="flex h-60 w-11/12 justify-start overflow-hidden hover:overflow-auto ">
              <div className="flex space-x-3 ">
                <div
                  onClick={handleOpenOvelayProject}
                  className=" flex h-52 w-52 cursor-pointer items-center justify-center rounded-lg bg-[#163029] shadow-lg hover:shadow-md hover:shadow-zinc-400 lg:max-w-4xl"
                >
                  <Image
                    src={SinalMais}
                    width={100}
                    height={100}
                    alt="Imagem de sinal de mais"
                    className="colored-image opacity-90"
                  />
                </div>
                {projects
                  .filter((project) => {
                    return project.user.some((userProject) => {
                      return (
                        userProject.user.id === user?.id &&
                        userProject.role === 'owner'
                      )
                    })
                  })
                  .map((project) => {
                    return (
                      <div className="slideCard" key={project.id}>
                        <Card
                          project={project}
                          handleDeleteProject={handleDeleteProject}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <h1 className={montserrat.className + ' text-xl'}>
              Projetos compatilhados com você
            </h1>
            <div className="flex h-60 w-11/12 justify-start overflow-hidden hover:overflow-auto">
              <div className="flex space-x-3 ">
                {projects
                  .filter((project) => {
                    return project.user.some((userProject) => {
                      return (
                        userProject.user.id === user?.id &&
                        userProject.role === 'member'
                      )
                    })
                  })
                  .map((project) => {
                    return (
                      <Card
                        project={project}
                        key={project.id}
                        handleDeleteProject={handleDeleteProject}
                        invisibleDelete={true}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        </>
      )}
      {visibleOverlayCreateProject && (
        <Overlay handleVisible={handleVisible}>
          <FormsProject handleData={handleCreateProject} />
        </Overlay>
      )}
      {visibleOverlayUpdateUser && (
        <Overlay handleVisible={handleVisible}>
          <ConfigUser handleVisible={handleVisible} />
        </Overlay>
      )}
    </div>
  )
}
