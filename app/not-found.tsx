'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const { replace } = useRouter()
  return (
    <div className='w-full h-screen px-4 flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-red-500 text-7xl md:text-9xl font-bold'>4O4</h1>
        <h1 className='text-cyan-500 font-bold'>
          Sorry, the page you are looking for is still being cooked!
        </h1>
        <div className='mt-4'>
          <button
            onClick={() => replace('/')}
            className='bg-emerald-500 text-white px-4 py-2 rounded'
          >
            Go safe
          </button>
        </div>
      </div>
    </div>
  )
}
