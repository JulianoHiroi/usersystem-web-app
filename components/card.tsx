import Lixeira from '../assets/lixeira.png'
import Image from 'next/image'
import { ProjectProps } from '../app/dashboard/page'
import '../styles/scrollbar.css'
type CardProps = {
  project: ProjectProps
  handleDeleteProject: (id: string) => void
}

export default function Card({ project, handleDeleteProject }: CardProps) {
  const handleOnClickDelete = () => {
    handleDeleteProject(project.id)
  }

  return (
    <div className="flex h-60 w-60 flex-col overflow-hidden rounded-lg bg-white p-5 shadow-lg lg:max-w-4xl">
      <h1 className="h-8 text-2xl font-bold">{project.name}</h1>
      <p className=" h-32 max-h-32 max-w-full  overflow-hidden text-wrap  break-words pr-8 hover:overflow-y-scroll ">
        {project.description}
      </p>
      <div className="flex w-full items-end justify-end">
        <button
          onClick={handleOnClickDelete}
          className="mt-3 w-fit rounded-md bg-red-600 p-2"
        >
          <Image src={Lixeira} width={20} height={20} alt="Lixeira" />
        </button>
      </div>
    </div>
  )
}
