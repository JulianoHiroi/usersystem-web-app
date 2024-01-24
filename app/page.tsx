import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '../assets/logo-no-background.svg'
import { Montserrat } from 'next/font/google'
import { FaGithub } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex  h-24 w-full items-center justify-between bg-teal-500">
        <div className="ml-10 flex items-center justify-center">
          <Image
            src={LogoImage}
            width={150}
            height={150}
            alt="Picture of the logo"
          />
        </div>
        <div className="mr-10 flex justify-end space-x-5">
          <Link
            href={'./login'}
            className="text-xl font-bold text-white hover:text-teal-900"
          >
            Login
          </Link>
          <Link
            href={'./register'}
            className="text-xl font-bold text-white hover:text-teal-900"
          >
            Register
          </Link>
        </div>
      </nav>
      <div>
        <h1 className="mb-4  mt-10 flex w-full items-center justify-center text-3xl font-bold">
          Bem vindo ao UserSystem
        </h1>
        <div className="flex items-center justify-center">
          <p
            className={
              'w-4/6 bg-gray-100 p-8   text-justify indent-5 text-xl shadow-md ' +
              montserrat.className
            }
          >
            O UserSystem é um sistema de login e registro de usuários
            desenvolvido com NextJS, TailwindCSS e Typescript. Projetado para
            abranger todo o processo de autenticação, desde o registro até o
            login, este sistema tem como propósito principal facilitar o
            aprendizado de novas tecnologias e compreender o fluxo de
            autenticação de usuários. Composto por três páginas principais -
            login, register e dashboard - oferece uma experiência intuitiva. Na
            página de login, os usuários inserem suas credenciais para acessar o
            sistema; na página de registro, criam suas contas; e na página de
            dashboard, após o login, visualizam projetos e realizam logout
            conforme necessário.
          </p>
        </div>
      </div>
      <footer className="absolute bottom-0 flex h-28 w-full items-center justify-center space-x-32 bg-teal-500">
        <Link
          href="https://www.instagram.com/julianohiroi/"
          target="_blank"
          className="text-md flex items-center text-teal-900"
        >
          <FaInstagram />
          JulianoHiroi
        </Link>
        <p className="text-md text-teal-900">&copy;2024 JulianoHiroi</p>
        <Link
          href="https://github.com/JulianoHiroi"
          target="_blank"
          className="text-md flex items-center text-teal-900"
        >
          <FaGithub />
          JulianoHiroi
        </Link>
      </footer>
    </div>
  )
}
