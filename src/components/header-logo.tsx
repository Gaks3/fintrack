import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <Link href={'/'}>
      <div className='items-center hidden lg:flex'>
        <Image
          src={'/logo-white.svg'}
          alt='Logo Image'
          width={28}
          height={28}
        />
        <p className='font-bold text-white text-2xl ml-2.5'>FinTrack</p>
      </div>
    </Link>
  )
}
