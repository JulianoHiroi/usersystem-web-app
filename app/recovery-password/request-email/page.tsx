'use client'
import { useRouter } from 'next/navigation'

export default function InitiateResquestEmail() {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/login')
  }

  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-[#163029] ">
      <div className=" relative flex flex-col rounded-2xl bg-white p-10">
        <p className="w-max-50 mb-5 text-wrap text-xl font-bold">
          Um email para a recuperação de senha foi enviado com sucesso!
        </p>

        <div className="flex h-12 items-end justify-end">
          <button
            className="w-20 rounded-md bg-[#163029] py-2 text-white "
            onClick={handleOnClick}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}
