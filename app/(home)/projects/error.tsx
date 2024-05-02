'use client'

import { useRouter } from 'next/navigation'

export default function Error() {
  const { back } = useRouter()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-red-500 font-bold'>Sorry, no project found.</h1>
        <div className='mt-4'>
          <button
            onClick={() => back()}
            className='bg-slate-500 text-white px-4 py-2 rounded'
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
