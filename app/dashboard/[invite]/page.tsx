'use client'

import { useContext } from 'react'
import projectService from '../../../services/ProjectService'
import { AuthContext } from '../../../hooks/auth'
import { useRouter } from 'next/navigation'

export default function InviteProject({
  params,
}: {
  params: { invite: string }
}) {
  const { signed } = useContext(AuthContext)
  const router = useRouter()

  if (!signed) {
    window.alert('Você precisa se autentificar primeiro!')
    router.push('/login')
  }

  const handleOnClick = async () => {
    const projectId = params.invite
    const response = await projectService.joinProject(projectId)
    if (response === 'sucess') {
      router.push('/dashboard')
    }
    if (response === 'userAlreadyInProject') {
      router.push('/dashboard')
      window.alert('Você já está participando deste projeto')
    }
    if (response === 'error') {
      window.alert('Ocorreu um erro ao aceitar o convite')
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-[#163029] ">
      <div className="flex w-80 flex-col rounded-2xl bg-white p-10">
        <h1 className="mb-4  text-3xl font-bold">Aceitar convite</h1>
        <p className="mb-4">
          Você foi convidado para participar de um projeto, clique no botão
          abaixo para aceitar o convite
        </p>
        <button
          className="rounded-md bg-[#163029] p-2 text-white"
          onClick={handleOnClick}
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
