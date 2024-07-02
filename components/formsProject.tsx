import { useState } from 'react'
import Input from './input'

type projectProps = {
  name: string
  description: string
}
type formsProjectProps = {
  handleData: (project: projectProps) => void
}
export default function FormsProject({ handleData }: formsProjectProps) {
  const [project, setProject] = useState({
    name: '',
    description: '',
  })
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleData(project)
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }
  const handleOnChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex h-fit w-96 rounded-md bg-white p-5">
      <form onSubmit={handleOnSubmit} className="h-full w-full">
        <h1 className="mb-4 text-2xl">Cadastro de Projeto</h1>
        <Input
          handleOnChange={handleOnChange}
          name={'name'}
          text="Nome do Projeto : "
          placeholder="Nome do Projeto"
          className="mb-4 "
        />
        <div>
          <h2>Descrição do Projeto : </h2>
          <textarea
            name="description"
            id="descriptionProjects"
            cols={30}
            rows={10}
            className="mb-3 h-10 min-h-44 w-full rounded-md border border-gray-400  bg-gray-300 bg-opacity-10  p-2 focus:shadow-inner"
            placeholder="Descrição do Projeto"
            onChange={handleOnChangeTextArea}
          ></textarea>
        </div>
        <div className="flex w-full items-center justify-end pr-5">
          <button
            type="submit"
            className="w-16  rounded-md bg-[#163029] py-2 text-white"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  )
}
