'use client'

import Image from 'next/image'
import projectImg from '~/assets/images/project.png'
import { useTaskStorage } from '~/services/store/taskStore'
import { Avatar } from 'antd'

export default function TaskDetails({ params }: { params: { id: string } }) {
  const task = useTaskStorage((state) => state.tasks).find(
    (task) => task.id === params.id
  )
  return (
    <div className='box mx-auto mt-10'>
      <Image
        src={projectImg}
        alt='task title'
        priority
        width={400}
        height={300}
        className='size-full rounded-lg overflow-hidden'
      />
      <h1 className='mt-8 md:text-4xl md:mb-2'>{task?.title}</h1>
      <div className='flex gap-2'>
        <span className='bg-slate-500 font-medium text-white text-sm px-3 py-[2px] rounded-full'>
          {task?.status}
        </span>
        <span className='bg-cyan-500 font-medium text-white text-sm px-3 py-[2px] rounded-full'>
          {task?.deadline}
        </span>
      </div>
      <p className='text-slate-700 mt-4'>{task?.description}</p>

      <div className='mt-8 mb-20'>
        <h2 className='text-2xl font-me'>Assigned member</h2>
        <hr />
        <div className='my-4 flex items-center gap-2'>
          <Avatar>{task?.assignedTo.name.slice(0, 2)}</Avatar>
          <div>
            <h2 className='font-medium text-xl'>{task?.assignedTo.name}</h2>
            <p className='text-sm text-slate-500'>
              {task?.assignedTo.designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
