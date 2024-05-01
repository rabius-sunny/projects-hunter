import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <Link className='text-xl text-indigo-500 font-medium' href='/projects'>
        Go to projects
      </Link>
    </div>
  )
}
