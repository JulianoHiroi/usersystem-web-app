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
    console.log(project)
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
    <div className="h-96 w-96 rounded-md bg-white">
      <form onSubmit={handleOnSubmit}>
        <h1>Cadastro de Projeto</h1>
        <Input
          handleOnChange={handleOnChange}
          name={'name'}
          text="Nome do Projeto : "
          placeholder="Nome do Projeto"
        />
        <div>
          <h2>Descrição do Projeto : </h2>
          <textarea
            name="description"
            id="descriptionProjects"
            cols={30}
            rows={10}
            className="min-h-32 w-full rounded-md border-none bg-gray-300 bg-opacity-10 text-sm focus:shadow-inner"
            placeholder="Descrição do Projeto"
            onChange={handleOnChangeTextArea}
          ></textarea>
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  )
}
