import Link from 'next/link'
import Image from 'next/image'
import LogoImage from '../assets/logo-no-background.svg'
import { Lora } from 'next/font/google'
import { FaGithub } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import './globals.css'
const loraRegular = Lora({ weight: '400', subsets: ['latin'] })
const loraSemiBold = Lora({ weight: '600', subsets: ['latin'] })

export default function Home() {
  return (
    <div className="sectionPrincipal bg-[#163029]">
      <div className="h-5/6">
        <nav className="flex h-20 items-center justify-between ">
          <div className="sm:justigy-center ml-2 flex items-center justify-start sm:ml-10">
            <Image
              src={LogoImage}
              width={150}
              height={150}
              alt="Picture of the logo"
              className="fill-black"
            />
          </div>
          <div className=" mr-2 flex justify-end space-x-5 sm:mr-10">
            <Link
              href={'./login'}
              className="text-xl font-bold text-white hover:text-[#8c9c98]"
            >
              <p className={loraSemiBold.className}>Login</p>
            </Link>
            <Link
              href={'./register'}
              className="text-xl font-bold text-white hover:text-[#8c9c98]"
            >
              <p className={loraSemiBold.className}>Cadastro</p>
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex h-full items-center">
        <h1
          className={
            'mb-4  mt-10 flex w-full items-center justify-center text-center text-2xl md:text-7xl ' +
            loraSemiBold.className
          }
        >
          Bem vindo ao UserSystem
        </h1>
      </div>
      <div className="flex h-full items-end">
        <footer className="bottom-0 flex min-h-20  w-full items-center justify-center space-x-8  sm:space-x-16 md:space-x-32">
          <Link
            href="https://www.instagram.com/julianohiroi/"
            target="_blank"
            className="flex items-center gap-1 pl-10 text-2xl text-[#dae4e1] sm:text-xl"
          >
            <FaInstagram />
            <p className={'hidden sm:flex ' + loraRegular.className}>
              JulianoHiroi
            </p>
          </Link>
          <p
            className={
              'text-center  text-xl text-[#dae4e1] ' + loraRegular.className
            }
          >
            &copy; 2024 JulianoHiroi
          </p>
          <Link
            href="https://github.com/JulianoHiroi"
            target="_blank"
            className="flex items-center gap-1 pr-10 text-2xl text-[#dae4e1] sm:text-xl"
          >
            <FaGithub />
            <p className={'hidden sm:flex  ' + loraRegular.className}>
              JulianoHiroi
            </p>
          </Link>
        </footer>
      </div>
    </div>
  )
}
