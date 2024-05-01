'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { DeleteTwoTone } from '@ant-design/icons'
import projectImg from '~/assets/images/project.png'
import AssignMemberButton from '~/components/projects/AssignMemberButton'
import CreateTaskButton from '~/components/tasks/CreateTaskButton'
import { usePopulateTasks } from '~/helper/client/populateData'
import { useGetAssetsData } from '~/helper/server/projects'
import { useProjectStorage } from '~/services/store/projectStore'
import { useTaskStorage } from '~/services/store/taskStore'
import { Avatar, Tooltip } from 'antd'

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const { projects: projectData, removeTaskFromProject } = useProjectStorage(
    (state) => state
  )
  const removeTask = useTaskStorage((state) => state.removeTask)
  const data = useMemo(() => {
    return projectData.find((project) => project.id === Number(params.id))
  }, [projectData, params.id])
  const tasks = usePopulateTasks(Number(params.id), data?.taskIds as string[])
  const { data: assets } = useGetAssetsData()

  const handleRemoveTask = (taskId: string) => {
    removeTask(taskId)
    removeTaskFromProject(Number(params.id), taskId)
  }
  return (
    <div className='box mx-auto mt-10'>
      <Image
        src={projectImg}
        alt={data?.title as string}
        priority
        width={400}
        height={300}
        className='size-full rounded-lg overflow-hidden'
      />
      <h1 className='mt-8 md:text-4xl md:mb-2'>{data?.title}</h1>
      <span className='bg-cyan-500 font-medium text-white text-sm px-3 py-[2px] rounded-full'>
        {data?.deadline}
      </span>
      <p className='text-slate-700 mt-4'>{data?.description}</p>

      <div className='mt-8'>
        <div className='flex items-center justify-between py-2'>
          <h2 className='text-2xl font-me'>Members</h2>
          <AssignMemberButton projectId={data?.id as number} />
        </div>
        <hr />
        <div className={`grid ${data?.members.length ? 'sm:grid-cols-2' : ''}`}>
          {data?.memberIds.length ? (
            data?.members.map((member, idx) => (
              <div key={idx} className='my-4 flex items-center gap-2'>
                <Avatar>{member.name.slice(0, 2)}</Avatar>
                <div>
                  <h2 className='font-medium text-xl'>{member.name}</h2>
                  <p className='text-sm text-slate-500'>{member.designation}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-danger my-8 text-xl font-medium'>
              No member is cooking here!
            </div>
          )}
        </div>
      </div>
      <div className='my-8'>
        <div className='flex items-center justify-between py-2'>
          <h2 className='text-2xl font-me'>Tasks</h2>
          <CreateTaskButton
            allProjects={assets?.projects}
            members={assets?.members}
            projectId={data?.id as number}
          />
        </div>
        <hr />
        <div className='grid gap-2 mt-4'>
          {tasks.length ? (
            tasks.map((task, idx) => (
              <div className='flex items-center gap-2'>
                <div
                  key={idx}
                  className='flex-1 bg-slate-100 px-4 py-2 rounded-lg'
                >
                  <h2>{task.title}</h2>
                </div>
                <Tooltip color='red' title='Delete this task'>
                  <DeleteTwoTone
                    twoToneColor='red'
                    className='text-xl'
                    onClick={() => handleRemoveTask(task.id)}
                  />
                </Tooltip>
              </div>
            ))
          ) : (
            <div className='text-center text-danger my-8 text-xl font-medium'>
              No task found yet!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
