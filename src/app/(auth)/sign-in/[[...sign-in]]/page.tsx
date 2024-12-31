import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 relative'>
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'>
          <h1 className='font-bold text-3xl text-[#2E2E47]'>Welcome Back</h1>
          <p className='text-base text-[#7E8CA0]'>
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className='flex items-center justify-center mt-8 pb-16'>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2Icon className='animate-spin text-muted-foreground' />
          </ClerkLoading>
        </div>
      </div>
      <div className='h-full max-h-screen sticky top-0 bg-blue-600 hidden lg:flex items-center justify-center'>
        <Image
          src={'/logo-white.svg'}
          alt='Logo Image'
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
