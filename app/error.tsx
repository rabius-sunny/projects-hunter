'use client'

import { useRouter } from 'next/navigation'

export default function Error() {
  const { replace } = useRouter()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-red-500 font-bold'>Sorry, something went wrong</h1>
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
