import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '../assets/logo-no-background.svg'
import { Montserrat } from 'next/font/google'
import { FaGithub } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import './globals.css'
const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <div className="sectionPrincipal">
      <div className="sm:h-5/6">
        <nav className="flex h-20 items-center justify-between bg-teal-500">
          <div className="sm:justigy-center ml-2 flex items-center justify-start sm:ml-10">
            <Image
              src={LogoImage}
              width={150}
              height={150}
              alt="Picture of the logo"
            />
          </div>
          <div className=" mr-2 flex justify-end space-x-5 sm:mr-10">
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
          <h1 className="mb-4  mt-10 flex w-full items-center justify-center text-center text-3xl font-bold">
            Bem vindo ao UserSystem
          </h1>
          <div className="flex items-center justify-center">
            <p
              className={
                ' sm:11/12 p-8 text-justify   indent-5 text-xl md:w-4/6 ' +
                montserrat.className
              }
            >
              O UserSystem é um sistema de login e registro de usuários
              desenvolvido com NextJS, TailwindCSS e Typescript. Projetado para
              abranger todo o processo de autenticação, desde o registro até o
              login, este sistema tem como propósito principal facilitar o
              aprendizado de novas tecnologias e compreender o fluxo de
              autenticação de usuários. Composto por três páginas principais -
              login, register e dashboard - oferece uma experiência intuitiva.
              Na página de login, os usuários inserem suas credenciais para
              acessar o sistema; na página de registro, criam suas contas; e na
              página de dashboard, após o login, visualizam projetos e realizam
              logout conforme necessário.
            </p>
          </div>
        </div>
      </div>
      <div className="flex h-full items-end">
        <footer className="bottom-0 flex min-h-20  w-full items-center justify-center space-x-8 bg-teal-500 sm:space-x-16 md:space-x-32">
          <Link
            href="https://www.instagram.com/julianohiroi/"
            target="_blank"
            className="flex items-center pl-10 text-2xl text-teal-900 sm:text-xl"
          >
            <FaInstagram />
            <p className="hidden sm:flex">JulianoHiroi</p>
          </Link>
          <p className="text-center  text-xl text-teal-900">
            &copy;2024 JulianoHiroi
          </p>
          <Link
            href="https://github.com/JulianoHiroi"
            target="_blank"
            className="flex items-center pr-10 text-2xl text-teal-900 sm:text-xl"
          >
            <FaGithub />
            <p className="hidden sm:flex">JulianoHiroi</p>
          </Link>
        </footer>
      </div>
    </div>
  )
}
