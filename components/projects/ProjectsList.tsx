'use client'

import { useGetAllProjects } from '~/helper/server/projects'
import { Card } from 'antd'

export default function ProjectsList() {
  const { data, fetchStatus, error } = useGetAllProjects()
  return (
    <div className='grid grid-cols-3 gap-8'>
      {data.map((item: TProject, idx: number) => (
        <Card title={item.title} key={idx}>
          <p className='text-indigo-500'>{item.description}</p>
        </Card>
      ))}
    </div>
  )
}