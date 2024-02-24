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
      <div className='sm:h-5/6'>
        <nav className="flex h-20 items-center justify-between bg-teal-500">
          <div className="ml-2 sm:ml-10 flex items-center justify-start sm:justigy-center">
            <Image
              src={LogoImage}
              width={150}
              height={150}
              alt="Picture of the logo"
            />
          </div>
          <div className=" mr-2 sm:mr-10 flex justify-end space-x-5">
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
                ' sm:11/12 md:w-4/6 p-8   text-justify indent-5 text-xl ' +
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
      </div>
      <div className='h-full flex items-end'>
        <footer className="bottom-0 flex min-h-20  w-full items-center justify-center space-x-8 sm:space-x-16 md:space-x-32 bg-teal-500">
          <Link
            href="https://www.instagram.com/julianohiroi/"
            target="_blank"
            className="text-2xl sm:text-xl flex items-center pl-10 text-teal-900"
          >
            <FaInstagram />
            <p className='hidden sm:flex'>JulianoHiroi</p>
          </Link>
          <p className="text-xl  text-teal-900 text-center">&copy;2024 JulianoHiroi</p>
          <Link
            href="https://github.com/JulianoHiroi"
            target="_blank"
            className="text-2xl sm:text-xl flex items-center pr-10 text-teal-900"
          >
            <FaGithub />
            <p className='hidden sm:flex'>JulianoHiroi</p>
          </Link>
        </footer>
      </div>
    </div>
  )
}
