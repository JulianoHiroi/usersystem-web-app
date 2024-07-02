import Image from 'next/image'
import LogoImage from '../assets/logo-no-background.svg'
import Link from 'next/link'
import LogoImageColor from '../assets/logo-blue.svg'
type LogoProps = {
  color?: boolean
}

export default function Logo({ color }: LogoProps) {
  return (
    <Link href="/" className="absolute left-10 top-10">
      <Image
        src={color ? LogoImageColor : LogoImage}
        width={150}
        height={150}
        alt="Picture of the logo"
      />
    </Link>
  )
}
