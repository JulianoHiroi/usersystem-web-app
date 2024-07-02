import Lixeira from '../assets/lixeira.png'
import { FiShare2 } from 'react-icons/fi'
import Image from 'next/image'
import { ProjectProps } from '../app/dashboard/page'
import '../styles/scrollbar.css'
import { useState } from 'react'
type CardProps = {
  project: ProjectProps
  handleDeleteProject: (id: string) => void
  invisibleDelete?: boolean
}

export default function Card({
  project,
  handleDeleteProject,
  invisibleDelete,
}: CardProps) {
  const [visibleCard, setVisibleCard] = useState(true)
  const [copied, setCopied] = useState(false)
  const handleOnClickDelete = () => {
    handleDeleteProject(project.id)
    setVisibleCard(false)
  }
  const handleOnClickCopyShare = async () => {
    const projectURL = `${window.location.href}/${project.id}`
    await navigator.clipboard.writeText(projectURL)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return (
    <div
      className={
        (!visibleCard && 'hidden') +
        ' ' +
        'flex h-52 w-52 flex-col overflow-hidden rounded-lg bg-white p-5 shadow-lg lg:max-w-4xl'
      }
    >
      <h1 className="h-8 text-2xl font-bold">{project.name}</h1>
      <p className=" h-32 max-h-32 max-w-full  overflow-hidden text-wrap  break-words pr-8 hover:overflow-y-scroll ">
        {project.description}
      </p>
      <div className="flex w-full items-end justify-between">
        <button
          className={
            (invisibleDelete ? 'w-full' : '') +
            ' ' +
            'flex h-9 w-32  items-center justify-between space-x-2 rounded-md bg-[#163029] pl-2 pr-2'
          }
          onClick={handleOnClickCopyShare}
        >
          <p className="text-white">{copied ? 'Copiado' : 'Copiar link'}</p>
          <FiShare2 size={20} color="white" />
        </button>
        <button
          onClick={handleOnClickDelete}
          className={
            (invisibleDelete ? 'hidden' : '') +
            ' ' +
            'mt-3 w-fit rounded-md bg-red-600 p-2'
          }
        >
          <Image src={Lixeira} width={20} height={20} alt="Lixeira" />
        </button>
      </div>
    </div>
  )
}
