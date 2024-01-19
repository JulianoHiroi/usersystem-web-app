'use client'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../hooks/auth'
import Card from '../../components/card'
import Image from 'next/image'
import SinalMais from '../../assets/sinalMais.png'
import projectService from '../../services/ProjectService'
import Overlay from '../../components/ovelay'
import FormsProject from '../../components/formsProject'

type ProjectProps = {
  name: string
  description: string
}

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [visibleOverlay, setVisibleOverlay] = useState(false)

  const handleVisible = (visible: boolean) => {
    setVisibleOverlay(visible)
  }
  const handleCreateProject = (project: ProjectProps) => {
    console.log(project)
    setVisibleOverlay(false)
  }

  useEffect(() => {
    if (user) {
      projectService.getProjects().then((res) => {
        setProjects(res)
      })
    }
  }, [user])
  const handleOnClick = () => {
    setVisibleOverlay(true)
  }
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-200">
      {visibleOverlay && (
        <Overlay handleVisible={handleVisible}>
          <FormsProject handleData={handleCreateProject} />
        </Overlay>
      )}
      <div className=" grid grid-flow-col space-x-2 ">
        <div
          onClick={handleOnClick}
          className="flex h-52 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-zinc-400 shadow-lg hover:shadow-md hover:shadow-zinc-400 lg:max-w-4xl "
        >
          <Image
            src={SinalMais}
            width={100}
            height={100}
            alt="Imagem de sinal de mais"
            className="opacity-25"
          />
        </div>
        {projects.map((project) => {
          return <Card title={project.name} key={1} />
        })}
      </div>
    </div>
  )
}
