import Image from 'next/image'
import Logo from '../../assets/logo-no-background.svg'
export default function Login() {
  return (
    <div className=" align-center  flex h-screen items-center justify-center bg-teal-500 ">
      <Image
        src={Logo}
        width={150}
        height={150}
        alt="Picture of the logo"
        className="absolute left-10 top-10"
      />
      <div className=" flex w-1/3 rounded-2xl bg-white p-32">
        <div className="m-auto">
          <h1 className="mb-4 text-3xl font-bold">Login</h1>
          <form className="flex flex-col">
            <label className="mb-2">Email</label>
            <input className="mb-4" type="email" />
            <label className="mb-2">Password</label>
            <input className="mb-4" type="password" />
            <button className="rounded-md bg-teal-600 py-2 text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
