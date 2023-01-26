import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid'

export default function Header({ title }: { title: string }) {
  const { pathname } = useRouter()
  const { data: session } = useSession()
  return (
    <header className=''>
      <h1 className='text-center text-3xl font-extrabold leading-9 tracking-tight'>
        {pathname === '/' ? (
          <span>{title}</span>
        ) : (
          <Link href='/' className='hover:text-cb-pink'>
            {title}
          </Link>
        )}
      </h1>
      <div className='flex justify-end space-x-4 px-4'>
        {session ? (
          <>
            <span>@{session.user?.name}</span>
            <button
              type='button'
              onClick={() => {
                signOut().catch(err => console.log(err))
              }}
            >
              <ArrowLeftOnRectangleIcon className='h-6 w-6' />
            </button>
          </>
        ) : (
          <button
            type='button'
            onClick={() => {
              signIn('discord').catch(err => console.log(err))
            }}
          >
            <ArrowRightOnRectangleIcon className='h-6 w-6' />
          </button>
        )}
        <a
          href='https://github.com/b4conjuice/marvel'
          target='_blank'
          rel='noopener noreferrer'
        >
          <svg
            // https://lucide.dev/icon/github
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
            <path d='M9 18c-4.51 2-5-2-7-2'></path>
          </svg>
        </a>
      </div>
    </header>
  )
}
